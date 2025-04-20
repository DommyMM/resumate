'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Resume, PersonalInfo, Education, Experience, Project, Skills } from '@/types/resume';

// Import components
import PDFViewer from '@/components/builder/PDFViewer';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';
import EducationForm from '@/components/builder/Education';
import WorkExperienceForm from '@/components/builder/WorkExperience';
import ProjectsForm from '@/components/builder/Projects';

// Import the LaTeX generator
import { generateLaTeX } from '@/types/resume';

// Resume section definitions
const sections = [
    { 
        id: 'personal', 
        label: 'Personal Information',
        description: 'Start with your basic contact information'
    },
    { 
        id: 'education', 
        label: 'Education',
        description: 'Your academic background and qualifications'
    },
    { 
        id: 'experience', 
        label: 'Work Experience',
        description: 'List your work history, starting with the most recent position'
    },
    { 
        id: 'projects', 
        label: 'Projects',
        description: 'Highlight significant projects that showcase your abilities'
    },
    { 
        id: 'skills', 
        label: 'Technical Skills',
        description: 'Technical and professional skills relevant to your field'
    },
    { 
        id: 'commendations', 
        label: 'Commendations',
        description: 'Awards, recognitions, and professional achievements'
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

    
    // Update section data - simplified without redundant feedback API call
    const updateSectionData = useCallback(async (section: string, data: any) => {
        // Check if data actually changed to prevent unnecessary updates
        const currentData = resume[section as keyof Resume];
        if (JSON.stringify(currentData) === JSON.stringify(data)) {
            return; // Skip update if data hasn't changed
        }
        
        // Brief processing indicator
        setIsProcessing(true);
        
        // Update the resume state
        setResume(prev => ({
            ...prev,
            [section]: data,
        }));

        // Clear any general feedback when switching sections
        if (section !== 'experience') {
            setFeedback('');
        }
        
        // End processing state after short delay
        setTimeout(() => {
            setIsProcessing(false);
        }, 100);
    }, [resume]);

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

    const updateEducation = useCallback((data: Education[]) => {
        updateSectionData('education', data);
    }, [updateSectionData]);

    const updateExperience = useCallback((data: Experience[]) => {
        updateSectionData('experience', data);
    }, [updateSectionData]);

    const updateProjects = useCallback((data: Project[]) => {
        updateSectionData('projects', data);
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
                
            case 'education':
                return (
                    <EducationForm
                        data={resume.education}
                        updateData={updateEducation}
                        sectionLabel={currentSection.label}
                        sectionDescription={currentSection.description}
                    />
                );
                
            case 'experience':
                return (
                    <WorkExperienceForm
                        data={resume.experience}
                        updateData={updateExperience}
                        sectionLabel={currentSection.label}
                        sectionDescription={currentSection.description}
                    />
                );

            case 'projects':
                return (
                    <ProjectsForm
                        data={resume.projects}
                        updateData={updateProjects}
                        sectionLabel={currentSection.label}
                        sectionDescription={currentSection.description}
                    />
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