import { Resume, PersonalInfo, ExperienceItem, EducationItem, SkillCategory, ProjectItem, CertificationItem } from '@/types/resume';

/**
 * Generates LaTeX content from template with resume data
 */
export function generateLatexFromTemplate(template: string, resumeData: Resume): string {
    const { personalInfo, summary, education, experience, skills, projects, certifications } = resumeData;
    
    let latex = template;
    
    // Process personal information
    latex = latex.replace(/{{name}}/g, escapeLatex(personalInfo.name || ''));
    latex = latex.replace(/{{email}}/g, escapeLatex(personalInfo.email || ''));
    latex = latex.replace(/{{phone}}/g, escapeLatex(personalInfo.phone || ''));
    latex = latex.replace(/{{location}}/g, escapeLatex(personalInfo.location || ''));
    
    // Process LinkedIn (with conditional)
    if (personalInfo.linkedin) {
        latex = latex.replace(/{{#linkedin}}([\s\S]*?){{\/linkedin}}/g, '$1');
        latex = latex.replace(/{{linkedin}}/g, escapeLatex(personalInfo.linkedin));
    } else {
        latex = latex.replace(/{{#linkedin}}([\s\S]*?){{\/linkedin}}/g, '');
    }
    
    // Process GitHub (with conditional)
    if (personalInfo.github) {
        latex = latex.replace(/{{#github}}([\s\S]*?){{\/github}}/g, '$1');
        latex = latex.replace(/{{github}}/g, escapeLatex(personalInfo.github));
    } else {
        latex = latex.replace(/{{#github}}([\s\S]*?){{\/github}}/g, '');
    }
    
    // Process website (with conditional)
    if (personalInfo.website) {
        latex = latex.replace(/{{#website}}([\s\S]*?){{\/website}}/g, '$1');
        latex = latex.replace(/{{website}}/g, escapeLatex(personalInfo.website));
    } else {
        latex = latex.replace(/{{#website}}([\s\S]*?){{\/website}}/g, '');
    }
    
    // Process summary (with conditional)
    if (summary) {
        latex = latex.replace(/{{#summary}}([\s\S]*?){{\/summary}}/g, '$1');
        latex = latex.replace(/{{summary}}/g, escapeLatex(summary));
    } else {
        latex = latex.replace(/{{#summary}}([\s\S]*?){{\/summary}}/g, '');
    }
    
    // Process education
    if (education.length > 0) {
        latex = latex.replace(/{{#education\.length}}([\s\S]*?){{\/education\.length}}/g, '$1');
        
        let educationContent = '';
        education.forEach(edu => {
        let eduSection = template.match(/{{#education}}([\s\S]*?){{\/education}}/)?.[1] || '';
        
        eduSection = eduSection.replace(/{{institution}}/g, escapeLatex(edu.institution));
        eduSection = eduSection.replace(/{{location}}/g, escapeLatex(edu.location));
        eduSection = eduSection.replace(/{{degree}}/g, escapeLatex(edu.degree));
        eduSection = eduSection.replace(/{{startDate}}/g, escapeLatex(edu.startDate));
        eduSection = eduSection.replace(/{{endDate}}/g, escapeLatex(edu.endDate));
        
        // Process field of study
        if (edu.fieldOfStudy) {
            eduSection = eduSection.replace(/{{#fieldOfStudy}}([\s\S]*?){{\/fieldOfStudy}}/g, '$1');
            eduSection = eduSection.replace(/{{fieldOfStudy}}/g, escapeLatex(edu.fieldOfStudy));
        } else {
            eduSection = eduSection.replace(/{{#fieldOfStudy}}([\s\S]*?){{\/fieldOfStudy}}/g, '');
        }
        
        // Process GPA
        if (edu.gpa) {
            eduSection = eduSection.replace(/{{#gpa}}([\s\S]*?){{\/gpa}}/g, '$1');
            eduSection = eduSection.replace(/{{gpa}}/g, escapeLatex(edu.gpa));
        } else {
            eduSection = eduSection.replace(/{{#gpa}}([\s\S]*?){{\/gpa}}/g, '');
        }
        
        // Process current enrollment
        if (edu.isCurrentlyEnrolled) {
            eduSection = eduSection.replace(/{{#isCurrentlyEnrolled}}([\s\S]*?){{\/isCurrentlyEnrolled}}/g, '$1');
        } else {
            eduSection = eduSection.replace(/{{#isCurrentlyEnrolled}}([\s\S]*?){{\/isCurrentlyEnrolled}}/g, '');
        }
        
        eduSection = eduSection.replace(/{{^isCurrentlyEnrolled}}([\s\S]*?){{\/isCurrentlyEnrolled}}/g, 
            edu.isCurrentlyEnrolled ? '' : '$1');
        
        educationContent += eduSection;
        });
        
        latex = latex.replace(/{{#education}}([\s\S]*?){{\/education}}/g, educationContent);
    } else {
        latex = latex.replace(/{{#education\.length}}([\s\S]*?){{\/education\.length}}/g, '');
    }
    
    // Process experience (similar pattern for other sections)
    if (experience.length > 0) {
        latex = latex.replace(/{{#experience\.length}}([\s\S]*?){{\/experience\.length}}/g, '$1');
        
        let experienceContent = '';
        experience.forEach(exp => {
        let expSection = template.match(/{{#experience}}([\s\S]*?){{\/experience}}/)?.[1] || '';
        
        expSection = expSection.replace(/{{position}}/g, escapeLatex(exp.position));
        expSection = expSection.replace(/{{company}}/g, escapeLatex(exp.company));
        expSection = expSection.replace(/{{location}}/g, escapeLatex(exp.location));
        expSection = expSection.replace(/{{startDate}}/g, escapeLatex(exp.startDate));
        expSection = expSection.replace(/{{endDate}}/g, escapeLatex(exp.endDate));
        
        // Process current position
        if (exp.isCurrentPosition) {
            expSection = expSection.replace(/{{#isCurrentPosition}}([\s\S]*?){{\/isCurrentPosition}}/g, '$1');
        } else {
            expSection = expSection.replace(/{{#isCurrentPosition}}([\s\S]*?){{\/isCurrentPosition}}/g, '');
        }
        
        expSection = expSection.replace(/{{^isCurrentPosition}}([\s\S]*?){{\/isCurrentPosition}}/g, 
            exp.isCurrentPosition ? '' : '$1');
        
        // Process bullets
        if (exp.bullets && exp.bullets.length > 0) {
            expSection = expSection.replace(/{{#bullets\.length}}([\s\S]*?){{\/bullets\.length}}/g, '$1');
            
            let bulletsContent = '';
            exp.bullets.forEach(bullet => {
            let bulletSection = template.match(/{{#bullets}}([\s\S]*?){{\/bullets}}/)?.[1] || '';
            bulletSection = bulletSection.replace(/{{\.}}/g, escapeLatex(bullet));
            bulletsContent += bulletSection;
            });
            
            expSection = expSection.replace(/{{#bullets}}([\s\S]*?){{\/bullets}}/g, bulletsContent);
        } else {
            expSection = expSection.replace(/{{#bullets\.length}}([\s\S]*?){{\/bullets\.length}}/g, '');
        }
        
        experienceContent += expSection;
        });
        
        latex = latex.replace(/{{#experience}}([\s\S]*?){{\/experience}}/g, experienceContent);
    } else {
        latex = latex.replace(/{{#experience\.length}}([\s\S]*?){{\/experience\.length}}/g, '');
    }
    
    // Process projects
    // ... similar pattern for projects
    
    // Process skills
    // ... similar pattern for skills
    
    // Process certifications
    // ... similar pattern for certifications
    
    return latex;
}

/**
 * Escapes special LaTeX characters
 */
function escapeLatex(text: string): string {
    if (!text) return '';
    
    return text
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/~/g, '\\~{}')
        .replace(/\^/g, '\\^{}')
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}');
}

/**
 * Extracts domain name from URL for display
 */
function extractDomain(url: string): string {
    try {
        // Remove protocol and www if present
        return url.replace(/(https?:\/\/)?(www\.)?/i, '');
    } catch (e) {
        return url;
    }
}