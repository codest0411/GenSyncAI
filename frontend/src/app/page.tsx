"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InputSection } from "@/components/InputSection";
import { PreviewSection } from "@/components/PreviewSection";
import { motion } from "framer-motion";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async (jd: string, file: File | null) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("jd", jd);
      formData.append("resume", file);

      // THE FIXED URL:
      const WEBHOOK_URL = "http://127.0.0.1:5678/webhook-test/3bf51421-2f49-4426-999c-eaa17ef767d2";

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Optimization failed");

      // Handle binary response (PDF)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      setResult({
        score: 92,
        keywordsFound: "Matched",
        pdfUrl: url,
      });

    } catch (error) {
      console.error("Optimization failed:", error);
      alert("Failed to connect to backend. Ensure n8n is running and webhook is active.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-200">
      <Navbar />
      
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <header className="mb-12 border-b border-zinc-100 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-medium tracking-tight text-zinc-950"
          >
            Optimize your resume for ATS.
          </motion.h1>
          <p className="mt-3 text-lg text-zinc-500">
            A simple tool to align your experience with job requirements using AI.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <section>
            <InputSection onProcess={handleProcess} />
          </section>

          <section className="lg:sticky lg:top-32 h-fit">
            <PreviewSection result={result} />
          </section>
        </div>
      </main>
    </div>
  );
}
