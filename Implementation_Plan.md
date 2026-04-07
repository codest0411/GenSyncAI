# GenSyncAI Implementation Plan

GenSyncAI is now architected with a high-performance stack: **Next.js 15 (App Router)** for the frontend, **n8n** for orchestration, **OpenAI** for intelligence, and **LaTeX** for professional-grade PDF generation.

## 🏗️ 1. Infrastructure (Docker)
The system runs on two primary containers:
- **`gensyncai_n8n`**: Handles the workflow, API triggers, and logic.
- **`gensyncai_latex`**: Provides a dedicated environment for `pdflatex` compilation.

> [!IMPORTANT]
> Ensure Docker is running. The LaTeX image is large (~3GB) and may take several minutes to download.

## 🎨 2. Frontend (Next.js)
The frontend is a premium, glassmorphic dashboard located in the `/frontend` directory.
- **Vibrant Aesthetics**: Custom gradients and dark mode support.
- **Animations**: Powered by `framer-motion` for smooth transitions.
- **File Handling**: Integrated `react-dropzone` for resume uploads.

## 🧠 3. n8n Workflow Configuration
Once `docker-compose up -d` finishes, navigate to `http://localhost:5678`.

### Node-by-Node Setup:
1. **Webhook**: 
   - Method: `POST`
   - Path: `generate-resume`
   - Data property: `resume` (Binary)

2. **OpenAI**:
   - Model: `gpt-4-turbo` or latest.
   - Resource: `Chat`
   - Prompt: Paste content from [master_prompt.txt](file:///d:/projects/Gensyncai/master_prompt.txt).

3. **Function (LaTeX Generator)**:
   - Use the JavaScript snippet to map JSON to LaTeX syntax.

4. **Execute Command**:
   - Command: `pdflatex -interaction=nonstopmode resume.tex`
   - Working Directory: `/workspace`

## 🚀 4. How to Run
1. **Start Backend**: 
   ```bash
   docker-compose up -d
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
3. **Connect**: Set the `fetch` URL in `frontend/src/app/page.tsx` to your n8n public/local webhook URL.
