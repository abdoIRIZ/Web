import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { StoredFile } from '../types/file';

export interface WebmToMp4Progress {
  ratio: number;
  message: string;
}

let ffmpegInstance: FFmpeg | null = null;
let isLoaded = false;
let loadPromise: Promise<FFmpeg> | null = null;

/**
 * Initializes and caches the client-side FFmpeg WebAssembly instance on demand.
 * Uses reliable public CDNs for the core binary chunks without bloating initial app bundle.
 */
export async function getFFmpeg(onStatus?: (msg: string) => void): Promise<FFmpeg> {
  if (ffmpegInstance && isLoaded) {
    return ffmpegInstance;
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    onStatus?.('Loading video conversion engine...');
    const ffmpeg = new FFmpeg();

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      ffmpegInstance = ffmpeg;
      isLoaded = true;
      return ffmpeg;
    } catch (err: any) {
      // Fallback CDN if primary mirror is unreachable
      try {
        const fallbackBaseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm';
        await ffmpeg.load({
          coreURL: await toBlobURL(`${fallbackBaseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${fallbackBaseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        ffmpegInstance = ffmpeg;
        isLoaded = true;
        return ffmpeg;
      } catch (fallbackErr: any) {
        throw new Error(
          'Failed to load in-browser video engine. Please check your internet connection and try again.'
        );
      }
    }
  })();

  return loadPromise;
}

/**
 * Converts a WebM video into a genuine, standards-compliant MP4 file (H.264 video + AAC audio)
 * entirely inside the browser using WebAssembly.
 * 
 * Works 100% locally on the user's device with zero cloud uploads.
 */
export async function convertWebmToMp4(
  file: StoredFile | File,
  onProgress?: (progress: WebmToMp4Progress) => void
): Promise<{ blob: Blob; filename: string }> {
  if (!file) throw new Error('No file selected.');
  if (file.size === 0) throw new Error('Selected WebM file is empty.');

  // Validate format extension or mime type
  const isWebm = file.name.toLowerCase().endsWith('.webm') || (file.type && file.type.includes('webm'));
  if (!isWebm) {
    throw new Error('Please select a valid WebM video file (.webm).');
  }

  // Check reasonable file size limit for browser WASM linear memory
  if (file.size > 250 * 1024 * 1024) {
    throw new Error(
      `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds browser WebAssembly memory limit (250 MB). Please choose a smaller video.`
    );
  }

  const baseName = file.name.replace(/\.[^/.]+$/, '') || 'converted-video';
  const outputFilename = `${baseName}.mp4`;

  // 1. Load engine
  const ffmpeg = await getFFmpeg((msg) => {
    onProgress?.({ ratio: 0.1, message: msg });
  });

  const timestamp = Date.now();
  const inputName = `input_${timestamp}.webm`;
  const outputName = `output_${timestamp}.mp4`;

  // 2. Attach progress tracking
  const progressHandler = ({ progress }: { progress: number; time: number }) => {
    // progress is 0.0 to 1.0
    const ratio = Math.max(0.2, Math.min(0.95, 0.2 + progress * 0.75));
    const percent = Math.round(ratio * 100);
    onProgress?.({
      ratio,
      message: `Encoding video frames (${percent}%)...`
    });
  };

  ffmpeg.on('progress', progressHandler);

  try {
    onProgress?.({ ratio: 0.15, message: 'Reading WebM video file into memory...' });
    const buffer = 'buffer' in file ? file.buffer.slice(0) : await file.arrayBuffer();
    await ffmpeg.writeFile(inputName, new Uint8Array(buffer));

    onProgress?.({ ratio: 0.25, message: 'Transcoding WebM to H.264/AAC MP4...' });

    // Execute real FFmpeg transcode:
    // -c:v libx264 : Genuine H.264 AVC video stream
    // -preset ultrafast : Best performance for in-browser CPU execution
    // -crf 26 : High visual quality with balanced file size
    // -pix_fmt yuv420p : Universal pixel format required by QuickTime, iOS Safari, Android, and Windows
    // -c:a aac : Standard MPEG-4 AAC audio stream
    // -b:a 128k : Standard audio bitrate
    // -movflags +faststart : Places moov atom at beginning for immediate playback
    await ffmpeg.exec([
      '-i', inputName,
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '26',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      outputName
    ]);

    onProgress?.({ ratio: 0.96, message: 'Finalizing MP4 file container...' });

    const data = await ffmpeg.readFile(outputName);
    const mp4Blob = new Blob([data], { type: 'video/mp4' });

    if (mp4Blob.size === 0) {
      throw new Error(
        'Generated MP4 file is empty. The input WebM file may contain corrupted tracks or an unsupported codec.'
      );
    }

    onProgress?.({ ratio: 1.0, message: 'Conversion complete!' });

    return {
      blob: mp4Blob,
      filename: outputFilename,
    };
  } finally {
    // Cleanup temporary virtual files
    ffmpeg.off('progress', progressHandler);
    try { await ffmpeg.deleteFile(inputName); } catch (e) {}
    try { await ffmpeg.deleteFile(outputName); } catch (e) {}
  }
}
