export interface PersonalInfo {
    name: string;
    phone: string;
    email: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

export interface Education {
    institution: string;
    location: string;
    degree: string;
    dates: string;
}

export interface Experience {
    id?: string;
    position: string;
    company: string;
    location: string;
    startDate?: string;
    endDate?: string;
    dates?: string;
    isCurrentPosition?: boolean;
    bullets: string[];
}

export interface Project {
    id?: string;
    name: string;
    technologies: string;
    dates: string;
    url?: string;
    bullets: string[];
}

export interface Skills {
    languages: string[];
    frameworks: string[];
    devTools: string[];
    libraries: string[];
}

export interface Resume {
    personalInfo: PersonalInfo;
    summary?: string;
    experience: Experience[];
    education: Education[];
    skills: Skills;
    projects: Project[];
    certifications?: any[];
}

function escapeLaTeXChars(text: string): string {
  if (!text) return '';
  return text
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/&/g, '\\&');
}

export function generateLaTeX(data: Resume): string {
  // Template header and preamble
    let latex = `
    \\documentclass[letterpaper,11pt]{article}

    \\usepackage{latexsym}
    \\usepackage[empty]{fullpage}
    \\usepackage{titlesec}
    \\usepackage{marvosym}
    \\usepackage[usenames,dvipsnames]{color}
    \\usepackage{verbatim}
    \\usepackage{enumitem}
    \\usepackage[hidelinks]{hyperref}
    \\usepackage{fancyhdr}
    \\usepackage[english]{babel}
    \\usepackage{tabularx}
    \\input{glyphtounicode}

    \\pagestyle{fancy}
    \\fancyhf{} % clear all header and footer fields
    \\fancyfoot{}
    \\renewcommand{\\headrulewidth}{0pt}
    \\renewcommand{\\footrulewidth}{0pt}

    % Adjust margins
    \\addtolength{\\oddsidemargin}{-0.5in}
    \\addtolength{\\evensidemargin}{-0.5in}
    \\addtolength{\\textwidth}{1in}
    \\addtolength{\\topmargin}{-.5in}
    \\addtolength{\\textheight}{1.0in}

    \\urlstyle{same}

    \\raggedbottom
    \\raggedright
    \\setlength{\\tabcolsep}{0in}

    % Sections formatting
    \\titleformat{\\section}{
    \\vspace{-4pt}\\scshape\\raggedright\\large
    }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

    % Fix for bullet points in nested lists
    \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

    % Ensure that generate pdf is machine readable/ATS parsable
    \\pdfgentounicode=1

    %-------------------------
    % Custom commands
    \\newcommand{\\resumeItem}[1]{
    \\item\\small{
        {#1 \\vspace{-2pt}}
    }
    }

    % Add missing subitem command
    \\newcommand{\\resumeSubItem}[1]{
    \\resumeItem{#1}
    }

    % Add missing subsubheading command
    \\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
       \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubheading}[4]{
    \\vspace{-2pt}\\item
        \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{#1} & #2 \\\\
        \\textit{\\small#3} & \\textit{\\small #4} \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeProjectHeading}[2]{
        \\item
        \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
        \\small#1 & #2 \\\\
        \\end{tabular*}\\vspace{-7pt}
    }

    \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
    \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
    \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
    \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

    \\begin{document}
    `;

    // Personal info section
    const { name, phone, email, linkedin, github } = data.personalInfo;
    latex += `
    \\begin{center}
        \\textbf{\\Huge \\scshape ${escapeLaTeXChars(name || 'Full Name')}} \\\\ \\vspace{1pt}
        \\small ${escapeLaTeXChars(phone || 'Phone')} $|$ \\href{mailto:${email || 'email@example.com'}}{\\underline{${escapeLaTeXChars(email || 'email@example.com')}}}`;
        
    if (linkedin) {
        latex += ` $|$ \\href{https://linkedin.com/in/${linkedin}}{\\underline{linkedin.com/in/${escapeLaTeXChars(linkedin)}}}`;
    }
    
    if (github) {
        latex += ` $|$ \\href{https://github.com/${github}}{\\underline{github.com/${escapeLaTeXChars(github)}}}`;
    }
    
    latex += `
    \\end{center}

    `;

    // Education section
    latex += `
    %-----------EDUCATION-----------
    \\section{Education}
    \\resumeSubHeadingListStart`;

    data.education.forEach(edu => {
        latex += `
        \\resumeSubheading
        {${escapeLaTeXChars(edu.institution)}}{${escapeLaTeXChars(edu.location)}}
        {${escapeLaTeXChars(edu.degree)}}{${escapeLaTeXChars(edu.dates)}}`;
    });
    
    latex += `
    \\resumeSubHeadingListEnd

    `;

    // Experience section
    latex += `
    %-----------EXPERIENCE-----------
    \\section{Experience}
    \\resumeSubHeadingListStart`;

    data.experience.forEach(exp => {
        const dates = exp.dates || `${escapeLaTeXChars(exp.startDate || '')} -- ${escapeLaTeXChars(exp.endDate || 'Present')}`;
        latex += `
        \\resumeSubheading
        {${escapeLaTeXChars(exp.position)}}{${dates}}
        {${escapeLaTeXChars(exp.company)}}{${escapeLaTeXChars(exp.location)}}
        \\resumeItemListStart`;
        
        exp.bullets.forEach(bullet => {
        latex += `
            \\resumeItem{${escapeLaTeXChars(bullet)}}`;
        });
        
        latex += `
        \\resumeItemListEnd`;
    });
    
    latex += `
    \\resumeSubHeadingListEnd

    `;

    // Projects section
    latex += `
    %-----------PROJECTS-----------
    \\section{Projects}
    \\resumeSubHeadingListStart`;

    data.projects.forEach(project => {
        latex += `
        \\resumeProjectHeading
            {\\textbf{${escapeLaTeXChars(project.name)}} $|$ \\emph{${escapeLaTeXChars(project.technologies)}}}{${escapeLaTeXChars(project.dates)}}
            \\resumeItemListStart`;
        
        project.bullets.forEach(bullet => {
        latex += `
                \\resumeItem{${escapeLaTeXChars(bullet)}}`;
        });
        
        latex += `
            \\resumeItemListEnd`;
    });
    
    latex += `
    \\resumeSubHeadingListEnd

    `;

    // Skills section
    latex += `
    %-----------TECHNICAL SKILLS-----------
    \\section{Technical Skills}
    \\begin{itemize}[leftmargin=0.15in, label={}]
        \\small{\\item{
        \\textbf{Languages}{: ${data.skills.languages.map(escapeLaTeXChars).join(', ')}} \\\\
        \\textbf{Frameworks}{: ${data.skills.frameworks.map(escapeLaTeXChars).join(', ')}} \\\\
        \\textbf{Developer Tools}{: ${data.skills.devTools.map(escapeLaTeXChars).join(', ')}} \\\\
        \\textbf{Libraries}{: ${data.skills.libraries.map(escapeLaTeXChars).join(', ')}}
        }}
    \\end{itemize}

    `;

    // End document
    latex += `
    \\end{document}
    `;

    return latex;
}