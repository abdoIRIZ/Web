import React from 'react';
import { CompressImageTool } from '../../src/tools/CompressImageTool';

export const metadata = {
  title: "Compress Image - Reduce Size No Quality Loss | Tindry",
  description: "Compress images online free. Reduce size with no quality loss. 100% private, no uploads, files stay in browser.",
  alternates: { canonical: "https://www.tindry.com/compress-image" }
};

export default function CompressImagePage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <CompressImageTool />
      <div className="mt-8 text-center text-xs text-neutral-500">
        <p>100% private, offline image compression in your browser with no quality loss.</p>
      </div>
    </div>
  );
}
