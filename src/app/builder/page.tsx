'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Resume, PersonalInfo, Education, Experience, Project, Skills } from '@/types/resume';

// Import components
import PDFViewer from '@/components/builder/PDFViewer';
import FeedbackPanel from '@/components/builder/FeedbackPanel';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';

// Import the LaTeX generator
import { generateLaTeX } from '@/types/resume';

// Mock API response for AI feedback
const mockAIFeedback = {
    personal: "Consider adding a professional email address that includes your name for better recognition.",
    summary: "Your summary could be more impactful. Try highlighting specific achievements with metrics rather than general statements.",
    experience: "Use more action verbs and quantify your accomplishments. For example, 'Increased sales by 20%' is stronger than 'Responsible for sales'.",
    education: "Include relevant coursework or academic achievements that align with your target position.",
    skills: "Organize your skills by proficiency level and ensure they're relevant to the job you're applying for.",
    projects: "For each project, highlight the problem solved, technology used, and the outcome or impact.",
    certifications: "Include the year obtained and mention if the certification is still active."
};

// Resume section definitions
const sections = [
    { 
        id: 'personal', 
        label: 'Personal Information',
        description: 'Start with your basic contact information'
    },
    { 
        id: 'summary', 
        label: 'Professional Summary',
        description: 'A brief overview of your professional background and goals'
    },
    { 
        id: 'experience', 
        label: 'Work Experience',
        description: 'List your work history, starting with the most recent position'
    },
    { 
        id: 'education', 
        label: 'Education',
        description: 'Your academic background and qualifications'
    },
    { 
        id: 'skills', 
        label: 'Skills',
        description: 'Technical and professional skills relevant to your field'
    },
    { 
        id: 'projects', 
        label: 'Projects',
        description: 'Highlight significant projects that showcase your abilities'
    },
    { 
        id: 'certifications', 
        label: 'Certifications',
        description: 'Professional certifications and credentials'
    },
];

export default function BuilderPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [latexContent, setLatexContent] = useState<string>('');
    
    // Initialize resume with empty data
    const [resume, setResume] = useState<Resume>({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            github: '',
            website: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: {
            languages: [],
            frameworks: [],
            devTools: [],
            libraries: []
        },
        projects: [],
        certifications: [],
    });

    // Memoize LaTeX generation to prevent unnecessary regenerations
    const generatedLatex = useMemo(() => {
        try {
            return generateLaTeX(resume);
        } catch (error) {
            console.error('Error generating LaTeX:', error);
            return '';
        }
    }, [resume]);

    // Generate initial LaTeX when component mounts
    useEffect(() => {
        // Only set LaTeX content if it's different to avoid unnecessary rerenders
        if (latexContent !== generatedLatex) {
            setLatexContent(generatedLatex);
            
            // For now, we're not generating a PDF
            // Just keep the placeholder URL if needed for component structure
            setPdfUrl('/sample-resume.pdf');
        }
    }, [generatedLatex, latexContent]);

    
    // Update section data and generate AI feedback - now memoized with useCallback
    const updateSectionData = useCallback(async (section: string, data: any) => {
        // Check if data actually changed to prevent unnecessary updates
        const currentData = resume[section as keyof Resume];
        if (JSON.stringify(currentData) === JSON.stringify(data)) {
            return; // Skip update if data hasn't changed
        }
        
        // Set processing state
        setIsProcessing(true);
        
        // Update the resume state
        setResume(prev => ({
            ...prev,
            [section]: data,
        }));
    
        // Get feedback immediately - no need for additional waiting
        // This would be an actual API call in production
        setFeedback(mockAIFeedback[section as keyof typeof mockAIFeedback]);
        
        // Give a small delay so the user sees the feedback
        // We can remove this in production when using real API calls
        setTimeout(() => {
            setIsProcessing(false);
        }, 500);
    }, [resume, mockAIFeedback]);

    // Handle generate LaTeX - simplified since we now use useMemo for LaTeX generation
    const handleGenerateLatex = useCallback(() => {
        setIsProcessing(true);
        
        setTimeout(() => {
            setLatexContent(generatedLatex);
            setPdfUrl('/sample-resume.pdf');
            setIsProcessing(false);
        }, 100);
    }, [generatedLatex]);

    // Handle next step navigation
    const handleNext = useCallback(() => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep]);

    // Handle previous step navigation
    const handlePrevious = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    // Generate and download final PDF
    const downloadPDF = useCallback(() => {
        if (pdfUrl) {
            // Create a temporary link to download the PDF
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${resume.personalInfo.name || 'resume'}.pdf`;
            link.click();
        } else {
            alert('Please generate a PDF first.');
        }
    }, [pdfUrl, resume.personalInfo.name]);

    // Memoize section-specific update functions
    const updatePersonalInfo = useCallback((data: PersonalInfo) => {
        updateSectionData('personalInfo', data);
    }, [updateSectionData]);

    const updateSummary = useCallback((data: string) => {
        updateSectionData('summary', data);
    }, [updateSectionData]);

    // Render current section form
    const renderCurrentSectionForm = () => {
        const currentSection = sections[currentStep];
        
        switch (currentSection.id) {
            case 'personal':
                return (
                    <PersonalInfoForm 
                        data={resume.personalInfo}
                        updateData={updatePersonalInfo}
                        sectionLabel={currentSection.label}
                        sectionDescription={currentSection.description}
                    />
                );
                
            case 'experience':
                return (
                    <div>
                        <h3 className="text-lg font-medium mb-4">{currentSection.label}</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">{currentSection.description}</p>
                        
                        {/* Sample experience entry form */}
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {/* Form fields */}
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    onClick={() => {
                                        // Sample data for demonstration
                                        const newExp: Experience = {
                                            id: Date.now().toString(),
                                            position: "Software Engineer",
                                            company: "Acme Corp",
                                            location: "San Francisco, CA",
                                            startDate: "Jan 2020",
                                            endDate: "Present",
                                            isCurrentPosition: true,
                                            bullets: [
                                                "Developed a new feature that increased user engagement by 20%",
                                                "Led a team of 3 developers to deliver project ahead of schedule",
                                                "Optimized database queries resulting in 30% performance improvement"
                                            ]
                                        };
                                        updateSectionData('experience', [...resume.experience, newExp]);
                                    }}
                                >
                                    Add Experience
                                </button>
                            </div>
                        </div>
                        
                        {/* List existing experience entries */}
                        {resume.experience.length > 0 && (
                            <div className="mt-6">
                                <h4 className="font-medium mb-2">Added Experience:</h4>
                                <div className="space-y-3">
                                    {resume.experience.map((exp) => (
                                        <div key={exp.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                            <div className="flex justify-between">
                                                <div className="font-medium">{exp.position} at {exp.company}</div>
                                                <div className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</div>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {exp.bullets.length} achievements listed
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
                
            // For brevity, simple placeholder for other sections
            default:
                return (
                    <div>
                        <h3 className="text-lg font-medium mb-4">{currentSection.label}</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">{currentSection.description}</p>
                        
                        <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-md text-center">
                            <p className="text-gray-500 dark:text-gray-400">Form for {currentSection.label} would be implemented here</p>
                            <button 
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => updateSectionData(currentSection.id, [])}
                            >
                                Update {currentSection.label}
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header with absolute positioned logo and centered progress bar */}
            <header className="bg-white dark:bg-gray-800 shadow relative">
                {/* Logo - Absolutely positioned to the left */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold text-base">R</div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">ResumeBuilder</h1>
                    </Link>
                </div>
                
                {/* Centered progress bar content */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Step {currentStep + 1} of {sections.length}: {sections[currentStep].label}
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {Math.round(((currentStep + 1) / sections.length) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                            style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            </header>
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Panel - Form */}
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                {renderCurrentSectionForm()}
                                
                                {/* Feedback Panel */}
                                <FeedbackPanel 
                                    feedback={feedback} 
                                    isVisible={!!feedback} 
                                />
                                
                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-8">
                                    <button
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        onClick={handlePrevious}
                                        disabled={currentStep === 0 || isProcessing}
                                    >
                                        Previous
                                    </button>
                                    
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                        onClick={handleNext}
                                        disabled={currentStep === sections.length - 1 || isProcessing}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Panel - PDF Preview */}
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <PDFViewer 
                                pdfUrl={pdfUrl} 
                                latexContent={latexContent}
                                isProcessing={isProcessing} 
                            />
                            
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    LaTeX code updates when you update your information
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}