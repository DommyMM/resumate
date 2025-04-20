export interface Resume {
    personalInfo: PersonalInfo;
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillCategory[];
    projects: ProjectItem[];
    certifications: CertificationItem[];
}

export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

export interface ExperienceItem {
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrentPosition: boolean;
    bullets: string[];
}

export interface EducationItem {
    id: string;
    institution: string;
    location: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    isCurrentlyEnrolled: boolean;
    gpa?: string;
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface ProjectItem {
    id: string;
    title: string;
    technologies: string[];
    startDate?: string;
    endDate?: string;
    bullets: string[];
    link?: string;
}

export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiration?: string;
    link?: string;
}

export interface ResumeTemplate {
    id: string;
    name: string;
    previewImage: string;
    style: 'modern' | 'classic' | 'minimalist' | 'professional';
}