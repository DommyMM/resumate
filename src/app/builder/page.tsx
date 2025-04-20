'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Resume, PersonalInfo, ExperienceItem, EducationItem, ProjectItem, SkillCategory, CertificationItem } from '@/types/resume';

// Import components
import PDFViewer from '@/components/builder/PDFViewer';
import FeedbackPanel from '@/components/builder/FeedbackPanel';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';
import SummaryForm from '@/components/builder/SummaryForm';

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
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    
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
        skills: [],
        projects: [],
        certifications: [],
    });

    // Load template from URL params if provided
    useEffect(() => {
        const template = searchParams.get('template');
        if (template) {
        setSelectedTemplate(template);
        }
    }, [searchParams]);

    // Update section data and generate AI feedback
    const updateSectionData = async (section: string, data: any) => {
        // Update the resume state
        setResume(prev => ({
        ...prev,
        [section]: data,
        }));

        // Mock API call to backend with loading state
        setIsProcessing(true);
        
        // Simulate API call delay
        setTimeout(() => {
        // Set feedback from mock response
        setFeedback(mockAIFeedback[section as keyof typeof mockAIFeedback]);
        setIsProcessing(false);
        
        // Regenerate PDF preview
        generatePDFPreview();
        }, 1000);
    };

    // Generate PDF preview 
    const generatePDFPreview = () => {
        // In a real implementation, this would call the backend to generate a PDF
        // For now, we'll use a sample PDF
        console.log('Generating PDF preview with resume data:', resume);
        
        // Using a sample PDF for demonstration purposes
        // In a real implementation, this would be an API call to generate a PDF
        setPdfUrl('/sample-resume.pdf');
    };

    // Generate PDF preview
    const generatePdfPreview = async () => {
        setIsProcessing(true);
        
        try {
            // For development, use sample PDF
            setPdfUrl('/sample-resume.pdf');
            
            // In production, call your API
            // const response = await fetch('/api/generate-pdf', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ 
            //     resume,
            //     template: selectedTemplate 
            //   })
            // });
            //
            // if (!response.ok) {
            //   throw new Error('Failed to generate PDF');
            // }
            //
            // const data = await response.json();
            // setPdfUrl(data.pdfUrl);
            
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Add this line to your useEffect to generate PDF when resume changes
    // useEffect(() => {
    //   if (Object.keys(resume.personalInfo).some(key => resume.personalInfo[key])) {
    //     generatePdfPreview();
    //   }
    // }, [resume, selectedTemplate]);

    // Handle next step navigation
    const handleNext = () => {
        if (currentStep < sections.length - 1) {
        setCurrentStep(currentStep + 1);
        }
    };

    // Handle previous step navigation
    const handlePrevious = () => {
        if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        }
    };

    // Generate and download final PDF
    const downloadPDF = () => {
        if (pdfUrl) {
        // Create a temporary link to download the PDF
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${resume.personalInfo.name || 'resume'}.pdf`;
        link.click();
        } else {
        alert('Please generate a PDF first.');
        }
    };

    // Render current section form
    const renderCurrentSectionForm = () => {
        const currentSection = sections[currentStep];
        
        switch (currentSection.id) {
        case 'personal':
            return (
            <PersonalInfoForm 
                data={resume.personalInfo}
                updateData={(data) => updateSectionData('personalInfo', data)}
                sectionLabel={currentSection.label}
                sectionDescription={currentSection.description}
            />
            );
            
        case 'summary':
            return (
            <SummaryForm
                data={resume.summary}
                updateData={(data) => updateSectionData('summary', data)}
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
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position/Title</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Software Engineer"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Acme Corp"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="San Francisco, CA"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employment Period</label>
                    <div className="flex items-center gap-2">
                        <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Jan 2020"
                        />
                        <span>to</span>
                        <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Present"
                        />
                    </div>
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Responsibilities & Achievements</label>
                    <textarea
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder="• Developed a new feature that increased user engagement by 20%
    • Led a team of 3 developers to deliver project ahead of schedule
    • Optimized database queries resulting in 30% performance improvement"
                    />
                </div>
                
                <div className="flex justify-end">
                    <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                        // Sample data for demonstration
                        const newExp: ExperienceItem = {
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
            
        // Similar patterns would be implemented for education, skills, projects, and certifications
        // For brevity, using a simple placeholder for these sections
        
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
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <Link href="/" className="flex items-center gap-2">
                <div className="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold text-base">R</div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">ResumeBuilder</h1>
                </Link>
                
                <div className="flex items-center gap-4">
                <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">Template:</span>
                    <select 
                    className="p-1.5 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                    <option value="classic">Classic Academic</option>
                    <option value="modern">Modern Professional</option>
                    <option value="executive">Executive</option>
                    </select>
                </div>
                
                <button 
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
                    disabled={isProcessing || !pdfUrl}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                </button>
                </div>
            </div>
            </div>
        </header>
        
        {/* Progress Bar */}
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
                <PDFViewer pdfUrl={pdfUrl} isProcessing={isProcessing} />
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    PDF preview automatically updates as you add information
                    </p>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}