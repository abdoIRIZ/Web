import React from 'react';
import { TOOL_EDITORIAL_DATA, ToolEditorialContent } from '../data/toolEditorialData';
import { ShieldCheck, HelpCircle, Sparkles, FileText, Info } from 'lucide-react';

interface ToolEditorialSectionProps {
  toolId: string;
}

export const ToolEditorialSection: React.FC<ToolEditorialSectionProps> = ({ toolId }) => {
  const data: ToolEditorialContent | undefined = TOOL_EDITORIAL_DATA[toolId];

  if (!data) return null;

  // JSON-LD structured data for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="pt-10 mt-10 border-t border-neutral-200 space-y-10 text-neutral-700">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Grid of 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. How to use? */}
        <article className="space-y-3 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-black tracking-tight">
              {data.howToUse.heading}
            </h2>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {data.howToUse.text}
          </p>
        </article>

        {/* 2. What is this tool? */}
        <article className="space-y-3 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center flex-shrink-0">
              <Info className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-black tracking-tight">
              {data.whatIsThisTool.heading}
            </h2>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {data.whatIsThisTool.text}
          </p>
        </article>

        {/* 3. Why use Tindry? */}
        <article className="space-y-3 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-black tracking-tight">
              {data.whyUseTindry.heading}
            </h2>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {data.whyUseTindry.text}
          </p>
        </article>

        {/* 4. Privacy & Security */}
        <article className="space-y-3 bg-neutral-50/50 p-6 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-black text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-black tracking-tight">
              {data.privacyAndSecurity.heading}
            </h2>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {data.privacyAndSecurity.text}
          </p>
        </article>
      </div>

      {/* 5. FAQ Section */}
      <article className="space-y-5 pt-4">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
          <HelpCircle className="w-4 h-4 text-black" />
          <h2 className="text-base font-bold text-black tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {data.faq.items.map((item, idx) => (
            <details
              key={idx}
              className="group border border-neutral-200 rounded-lg p-4 bg-white transition-colors open:bg-neutral-50/40"
            >
              <summary className="font-semibold text-xs text-black cursor-pointer list-none flex items-center justify-between select-none">
                <span>{item.question}</span>
                <span className="text-neutral-400 group-open:rotate-180 transition-transform ml-2">
                  &darr;
                </span>
              </summary>
              <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2.5">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </article>
    </section>
  );
};
