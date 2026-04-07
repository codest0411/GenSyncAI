"use client";

import { Activity, FileText, Layout } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-8 bg-white border-b border-zinc-100">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-950 text-white">
          <Layout className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-zinc-950">GenSync AI</span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {[
          { icon: Activity, label: "Analysis" },
          { icon: FileText, label: "History" },
        ].map((item, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950 cursor-pointer transition-colors"
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-all">
          Upgrade
        </button>
      </div>
    </nav>
  );
};
