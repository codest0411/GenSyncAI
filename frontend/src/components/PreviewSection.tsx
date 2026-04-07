"use client";

import { Download, ShieldCheck, Trophy, Target, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

const MetricCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-white p-4 shadow-sm">
    <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-50 text-zinc-500">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-tight text-zinc-400">{label}</span>
      <span className="text-sm font-semibold text-zinc-900">{value}</span>
    </div>
  </div>
);

export const PreviewSection = ({ result }: { result: any }) => {
  if (!result) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/30 p-12 text-center text-zinc-400">
        <Target className="h-8 w-8 mb-4 opacity-20" />
        <p className="text-sm font-medium">Upload your resume to see optimization results.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      {/* Score Header */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-10 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Resume Score</div>
        <div className="text-6xl font-light text-zinc-950">{result.score}<span className="text-2xl text-zinc-300">/100</span></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard icon={ShieldCheck} label="ATS Status" value="Optimized" />
        <MetricCard icon={Zap} label="Keyword Match" value="High" />
      </div>

      {/* Download Action */}
      <div className="mt-4 flex flex-col gap-4">
        <h4 className="text-xs font-semibold text-zinc-950">Your optimized resume is ready.</h4>
        <a 
          href={result.pdfUrl}
          download="Optimized_Resume.pdf"
          className="flex items-center justify-center gap-2 rounded-lg bg-zinc-950 p-4 text-sm font-semibold text-white hover:bg-zinc-800 transition-all active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
        <div className="flex items-start gap-2 rounded-md bg-zinc-50 p-3 text-[11px] text-zinc-500">
          <FileText className="h-3 w-3 mt-0.5 shrink-0" />
          <span>This file is generated in professional LaTeX format, which is the most reliable format for ATS systems globally.</span>
        </div>
      </div>
    </motion.div>
  );
};
