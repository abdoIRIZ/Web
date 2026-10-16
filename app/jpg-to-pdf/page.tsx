import React from 'react';
import { JpgToPdfTool } from '../../src/tools/JpgToPdfTool';

export const metadata = {
  title: "JPG to PDF Converter - Free & Offline | Tindry",
  description: "Convert JPG to PDF free. Turn images to PDF online, no upload, 100% private, offline converter.",
  alternates: { canonical: "https://www.tindry.com/jpg-to-pdf" }
};

export default function JpgToPdfPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <JpgToPdfTool />
      <div className="mt-10 p-4 text-center text-xs text-gray-500 max-w-2xl mx-auto">
        🔒 100% Private: Files never leave your browser. No uploads. No waiting.
      </div>
    </div>
  );
}
