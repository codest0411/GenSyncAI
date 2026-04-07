"use client";

import { Download, FileDown, ShieldCheck, Trophy, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const MetricCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="flex flex-col gap-1 rounded-2xl bg-white/5 p-4 border border-white/5">
    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color} bg-opacity-20`}>
      <Icon className={`h-4 w-4 ${color.replace('bg-', 'text-')}`} />
    </div>
    <span className="text-xs font-medium text-white/40 mt-2 uppercase">{label}</span>
    <span className="text-xl font-bold text-white">{value}</span>
  </div>
);

export const PreviewSection = ({ result }: { result: any }) => {
  if (!result) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/2 p-12 text-center">
        <div className="relative mb-6 h-24 w-24">
          <div className="absolute inset-0 animate-glow rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white/5">
            <Target className="h-10 w-10 text-white/20" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white/40">Analysis Pending</h3>
        <p className="mt-2 max-w-[240px] text-sm text-white/20">
          Upload your resume and provide a JD to start the optimization process.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8"
    >
      {/* Score Header */}
      <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl premium-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-white/20 blur-3xl" />
        <div className="text-sm font-bold uppercase tracking-widest text-white/60 mb-2">ATS Score</div>
        <div className="text-7xl font-black text-white">{result.score}%</div>
        <p className="text-white/80 mt-2 font-medium">Highly Optimized 🚀</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard icon={ShieldCheck} label="ATS Compliance" value="100%" color="bg-green-500" />
        <MetricCard icon={Trophy} label="Rank" value="Top 5%" color="bg-yellow-500" />
        <MetricCard icon={Zap} label="Keywords matched" value={result.keywordsFound} color="bg-blue-500" />
        <MetricCard icon={FileDown} label="Format" value="LaTeX PDF" color="bg-purple-500" />
      </div>

      {/* Download Action */}
      <div className="flex flex-col gap-3">
        <button 
          onClick={() => window.open(result.pdfUrl, '_blank')}
          className="flex items-center justify-center gap-3 rounded-2xl bg-white p-5 font-bold text-black hover:bg-white/90 transition-all active:scale-95"
        >
          <Download className="h-5 w-5" />
          Download Optimized PDF
        </button>
        <p className="text-center text-xs text-white/40 italic">
          Standard LaTeX format ensures maximum parser readability.
        </p>
      </div>
    </motion.div>
  );
};
