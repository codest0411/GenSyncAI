// This code goes into the n8n "Code" node (Function node)
// Set language to JavaScript

const data = $json; // This assumes the previous node is OpenAI and output is the JSON object

const escapeLatex = (str) => {
    if (!str) return "";
    return str
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\$/g, '\\$')
        .replace(/\&/g, '\\&')
        .replace(/\#/g, '\\#')
        .replace(/\_/g, '\\_')
        .replace(/\%/g, '\\%')
        .replace(/\~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
};

const latex = `
\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.75in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\pagestyle{empty}
\\setlist[itemize]{leftmargin=*, nosep, topsep=2pt}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{${escapeLatex(data.name)}}} \\\\
    \\vspace{2pt}
    \\small ${escapeLatex(data.contact)}
\\end{center}

\\section*{Professional Summary}
${escapeLatex(data.summary)}

\\section*{Skills}
\\textbf{Technical Skills:} ${data.skills.map(s => escapeLatex(s)).join(", ")}

\\section*{Experience}
${data.experience.map(exp => `
\\textbf{${escapeLatex(exp.role)}} $|$ \\textit{${escapeLatex(exp.company)}} \\\\
\\begin{itemize}
    ${exp.points.map(p => `\\item ${escapeLatex(p)}`).join("\n    ")}
\\end{itemize}
\\vspace{6pt}
`).join("")}

\\section*{Projects}
\\begin{itemize}
    ${data.projects.map(proj => `\\item ${escapeLatex(proj)}`).join("\n    ")}
\\end{itemize}

\\section*{Education}
${escapeLatex(data.education)}

\\end{document}
`;

return { latex };
