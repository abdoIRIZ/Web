import React from 'react';
import { PdfToJpgTool } from '../../src/tools/PdfToJpgTool';

export const metadata = {
  title: "PDF to JPG Converter - Extract Images Free | Tindry",
  description: "Convert PDF to JPG free. Extract images from PDF online, no upload, private & offline.",
  alternates: { canonical: "https://www.tindry.com/pdf-to-jpg" }
};

export default function PdfToJpgPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PdfToJpgTool />
      <div className="mt-10 p-4 text-center text-xs text-gray-500 max-w-2xl mx-auto">
        🔒 100% Private: Files never leave your browser. No uploads. No waiting.
      </div>
    </div>
  );
}
