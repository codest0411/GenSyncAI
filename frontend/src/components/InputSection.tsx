"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const InputSection = ({ onProcess }: { onProcess: (jd: string, file: File | null) => void }) => {
  const [jd, setJd] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  });

  const handleOptimize = async () => {
    if (!jd || !file) return;
    setIsProcessing(true);
    await onProcess(jd, file);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Job Description Input */}
      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Target Job Description
        </label>
        <div className="glass group rounded-2xl p-1 transition-all focus-within:ring-1 ring-blue-500/50">
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            className="h-40 w-full resize-none rounded-xl bg-transparent p-4 text-white/90 outline-none placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Resume Upload */}
      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Current Resume
        </label>
        <div
          {...getRootProps()}
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300",
            isDragActive ? "border-blue-500 bg-blue-500/10" : "border-white/10 hover:border-white/20 bg-white/5"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            {file ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-semibold text-white">{file.name}</p>
                  <p className="text-xs text-white/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-2 text-xs font-medium text-red-400 hover:underline"
                >
                  Remove file
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white/40">
                  <Upload className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-white/80">Drop your resume here</p>
                  <p className="text-sm text-white/40">PDF or DOCX (Max 5MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        disabled={!jd || !file || isProcessing}
        onClick={handleOptimize}
        className={cn(
          "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-5 text-lg font-bold transition-all",
          (!jd || !file || isProcessing) ? "opacity-50 grayscale cursor-not-allowed" : "premium-gradient hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Synchronizing...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-6 w-6" />
            <span>Optimize Resume</span>
          </>
        )}
      </button>
    </div>
  );
};
