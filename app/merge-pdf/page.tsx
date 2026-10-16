import React from 'react';
import { MergePdfTool } from '../../src/tools/MergePdfTool';

export const metadata = {
  title: "Merge PDF - Combine PDF Files Easily Free | Tindry",
  description: "Free Merge PDF tool. Combine multiple PDF files easily. 100% private, no file upload, offline processing.",
  alternates: { canonical: "https://www.tindry.com/merge-pdf" }
};

export default function MergePdfPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <MergePdfTool />
      <div className="mt-8 text-center text-xs text-neutral-500">
        <p>100% private, offline PDF merging. Your documents stay safe on your device.</p>
      </div>
    </div>
  );
}
