import React from 'react';
import { HomeView } from '../src/views/HomeView';

export const metadata = {
  title: "Tindry: Your Daily Tools, Fast & 100% Secure | No Uploads",
  description: "Tindry daily tools: MP4 to MP3, Merge PDF, Compress Image, Screen Record, WebM to MP4. 100% private, files never leave your device. Fast, free, and offline.",
  alternates: { canonical: "https://www.tindry.com" }
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <HomeView onSelectTool={() => {}} />
      <div className="mt-12 text-center text-xs text-neutral-500">
        <p>100% private online file tools. Fast, secure, and offline processing with zero cloud uploads.</p>
      </div>
    </div>
  );
}
