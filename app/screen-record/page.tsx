import React from 'react';

export const metadata = {
  title: "Screen Record - Directly in Your Browser | Tindry",
  description: "Free screen recorder directly in browser. No download needed. 100% private, offline, secure screen recording.",
  alternates: { canonical: "https://www.tindry.com/screen-record" }
};

export default function ScreenRecordPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="border border-neutral-200 rounded-xl p-8 bg-white text-center shadow-sm">
        <h1 className="text-2xl font-bold mb-3 text-black">Private Screen Recorder</h1>
        <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto">
          Record your screen, window, or tab directly in your browser with complete privacy. No watermark, no signup, zero cloud uploads.
        </p>
        <a
          href="/record.html"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
        >
          Launch Screen Recorder
        </a>
      </div>
      <div className="mt-8 text-center text-xs text-neutral-500">
        <p>100% private, offline screen recording. No downloads required, recordings never leave your device.</p>
      </div>
    </div>
  );
}
