"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, CheckCircle2, Loader2, FileUp } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex flex-col gap-10">
      {/* Job Description Input */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Step 1: Paste Job Description
        </label>
        <div className="rounded-lg border border-zinc-200 bg-white p-1 transition-all focus-within:border-zinc-950">
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="What role are you applying for?"
            className="h-44 w-full resize-none bg-transparent p-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-300"
          />
        </div>
      </div>

      {/* Resume Upload */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Step 2: Upload Your Resume
        </label>
        <div
          {...getRootProps()}
          className={`relative cursor-pointer overflow-hidden rounded-lg border border-dashed transition-all duration-200 ${
            isDragActive ? "border-zinc-950 bg-zinc-50" : "border-zinc-200 hover:border-zinc-400 bg-zinc-50/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            {file ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-zinc-950" />
                <div className="text-sm font-medium text-zinc-900">{file.name}</div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="text-xs text-zinc-400 hover:text-zinc-950 underline underline-offset-4"
                >
                  Change file
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-zinc-100 shadow-sm">
                  <Upload className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="text-sm text-zinc-500">
                  <span className="font-semibold text-zinc-950">Click to upload</span> or drag and drop
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
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-semibold transition-all ${
          (!jd || !file || isProcessing) 
          ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" 
          : "bg-zinc-950 text-white hover:bg-zinc-800"
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FileUp className="h-4 w-4" />
            <span>Generate Optimized Resume</span>
          </>
        )}
      </button>
    </div>
  );
};
