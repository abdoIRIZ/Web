import React, { useState } from 'react';
import { Video, AlertCircle } from 'lucide-react';
import { FileUploader } from '../components/FileUploader';
import { ProcessingState } from '../components/ProcessingState';
import { ResultCard } from '../components/ResultCard';
import { convertWebmToMp4, WebmToMp4Progress } from '../lib/webmToMp4';
import { formatBytes } from '../lib/utils';
import { StoredFile } from '../types/file';

export const WebmToMp4Tool: React.FC = () => {
  const [file, setFile] = useState<StoredFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<WebmToMp4Progress | null>(null);
  const [result, setResult] = useState<{ blob: Blob; filename: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    if (files.length > 0) {
      const selected = files[0];
      const isWebm = selected.name.toLowerCase().endsWith('.webm') || selected.type.includes('webm');
      if (!isWebm) {
        setError('Please select a valid WebM video file (.webm).');
        return;
      }
      try {
        const buffer = await selected.arrayBuffer();
        setFile({
          buffer,
          name: selected.name,
          type: selected.type || 'video/webm',
          size: selected.size,
        });
        setError(null);
        setResult(null);
      } catch (err: any) {
        setError('Failed to read video file into memory: ' + (err?.message || 'unknown error'));
      }
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setProgress({ ratio: 0.05, message: 'Initializing conversion engine...' });

    try {
      const output = await convertWebmToMp4(file, (p) => {
        setProgress(p);
      });

      const url = URL.createObjectURL(output.blob);
      setResult({
        blob: output.blob,
        filename: output.filename,
        url,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to convert WebM to MP4.');
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleReset = () => {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    setFile(null);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Tool Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
          WebM to MP4 Converter
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Convert WebM videos into standard, playable MP4 files with universal device compatibility.
        </p>
      </div>

      {isProcessing && (
        <ProcessingState
          title="Converting WebM to MP4..."
          message={progress?.message || 'Transcoding video stream...'}
          percent={progress && progress.ratio > 0 ? progress.ratio * 100 : undefined}
        />
      )}

      {!isProcessing && result && (
        <ResultCard
          filename={result.filename}
          filesize={result.blob.size}
          downloadUrl={result.url}
          onReset={handleReset}
          actionLabel="Download MP4"
          detailsText="H.264 / AAC Video"
        />
      )}

      {!isProcessing && !result && (
        <div className="space-y-6">
          {!file ? (
            <FileUploader
              acceptedFormats={['.webm']}
              multiple={false}
              maxSizeMB={250}
              onFilesSelected={handleFilesSelected}
              title="Drop your WebM video here"
              subtitle="or choose a .webm recording from your device (up to 250 MB)"
            />
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
              {/* File details */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 bg-neutral-50/50">
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded border border-neutral-200 bg-white flex items-center justify-center flex-shrink-0">
                    <Video className="w-4 h-4 text-black" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-black truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {formatBytes(file.size)} &middot; WebM format
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-neutral-500 hover:text-black font-medium px-2 py-1"
                >
                  Remove
                </button>
              </div>

              {/* Action button */}
              <button
                type="button"
                onClick={handleConvert}
                className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white font-medium text-xs tracking-wide rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Convert to MP4</span>
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-lg border border-neutral-300 bg-neutral-50 text-black text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-black mt-0.5" />
          <div>
            <p className="font-semibold text-black">Conversion Notice</p>
            <p className="text-neutral-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Helpful On-Page Content & Guide */}
      <section className="pt-6 border-t border-neutral-200 space-y-4 text-xs text-neutral-600">
        <h2 className="text-sm font-bold text-black">How to convert WebM to MP4 online</h2>
        <ol className="list-decimal list-inside space-y-1.5 text-neutral-600 pl-1">
          <li>Select or drop your WebM recording or video file into the converter box above.</li>
          <li>Click <strong className="text-black font-semibold">Convert to MP4</strong> to begin local video transcoding.</li>
          <li>Our engine encodes the video into standard H.264 video and AAC audio with universal player compatibility.</li>
          <li>Download your finalized MP4 file directly to your computer, tablet, or phone.</li>
        </ol>
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Transcoding is executed 100% locally in your browser using client-side WebAssembly. Your videos are never uploaded to any remote server, ensuring complete privacy for your screen recordings and video files.
        </p>
      </section>
    </div>
  );
};

export default WebmToMp4Tool;
