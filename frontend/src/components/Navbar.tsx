"use client";

import { Sparkles, Activity, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-8 glass decoration-white/10">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-xl premium-gradient p-px">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black">
                <Sparkles className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
        </div>
        <span className="text-xl font-bold tracking-tight">GenSync<span className="text-blue-500">AI</span></span>
      </div>

      <div className="hidden items-center gap-10 md:flex">
        {[
          { icon: Activity, label: "ATS Analysis" },
          { icon: FileText, label: "Optimizer" },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white cursor-pointer transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium hover:bg-white/10 transition-all">
          Launch App
        </button>
      </div>
    </nav>
  );
};
