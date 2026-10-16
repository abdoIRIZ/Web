import React from 'react';
import { WebmToMp4Tool } from '../../src/tools/WebmToMp4Tool';

export const metadata = {
  title: "WebM to MP4 Converter - Fast Video Conversion | Tindry",
  description: "Convert WebM to MP4 free. Fast video conversion in browser. No uploads, 100% offline and private.",
  alternates: { canonical: "https://www.tindry.com/webm-to-mp4" }
};

export default function WebmToMp4Page() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <WebmToMp4Tool />
      <div className="mt-8 text-center text-xs text-neutral-500">
        <p>100% private WebM to MP4 video conversion. Fast and offline, files never leave your browser.</p>
      </div>
    </div>
  );
}
