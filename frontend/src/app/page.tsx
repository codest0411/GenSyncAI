"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InputSection } from "@/components/InputSection";
import { PreviewSection } from "@/components/PreviewSection";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  const handleProcess = async (jd: string, file: File | null) => {
    // Logic to call n8n Webhook
    // Prepare FormData
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("jd", jd);
      formData.append("resume", file);

      // Replace with your n8n production URL
      // const response = await fetch("http://localhost:5678/webhook/generate-resume", {
      //   method: "POST",
      //   body: formData,
      // });
      
      // Mocking for demonstration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setResult({
        score: 94,
        keywordsFound: "24/28",
        pdfUrl: "#", // This would be the path to the generated PDF
      });

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#f472b6"],
      });

    } catch (error) {
      console.error("Optimization failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-8 pt-32 pb-20">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tight"
          >
            Bridge the Gap. <br />
            <span className="text-blue-500 italic">Sync Your Success.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-white/50"
          >
            GenSyncAI leverages advanced LLMs to align your career narrative with industry 
            requirements, ensuring you pass every ATS hurdle with a professional LaTeX resume.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Input */}
          <section>
            <InputSection onProcess={handleProcess} />
          </section>

          {/* Right: Preview/Analysis */}
          <section className="lg:sticky lg:top-32 h-fit">
            <PreviewSection result={result} />
          </section>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="fixed bottom-0 right-0 -z-10 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
    </div>
  );
}
