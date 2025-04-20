import React, { useState, useEffect, memo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

// Define a type for the dynamic skills format
interface DynamicSkills {
  [category: string]: string[];
}

interface SkillsFormProps {
    data: DynamicSkills;
    updateData: (data: DynamicSkills) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const SkillsForm: React.FC<SkillsFormProps> = memo(({
    data,
    updateData,
    sectionLabel,
    sectionDescription
}) => {
    // Local state for skills
    const [skills, setSkills] = useState<DynamicSkills>(data);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Debounce the skills data
    const debouncedSkills = useDebounce(skills, 1000);
    
    // Update parent component when debounced data changes
    useEffect(() => {
        if (JSON.stringify(debouncedSkills) !== JSON.stringify(data)) {
            updateData(debouncedSkills);
        }
    }, [debouncedSkills, data, updateData]);
    
    // Format array as comma-separated string for text input
    const formatSkillsInput = (skillsArray: string[] = []) => {
        return skillsArray.join(', ');
    };

    // Handle input changes for a skill category
    const handleSkillsChange = (category: string, value: string) => {
        // Split by commas, trim whitespace, and filter empty items
        const skillArray = value
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);
        
        setSkills(prev => ({
            ...prev,
            [category]: skillArray
        }));
    };
    
    // Add a new category
    const addCategory = () => {
        const newCategoryName = prompt("Enter new category name");
        if (newCategoryName && newCategoryName.trim()) {
            setSkills(prev => ({
                ...prev,
                [newCategoryName.trim()]: []
            }));
        }
    };
    
    // Remove a category
    const removeCategory = (category: string) => {
        if (confirm(`Are you sure you want to delete the ${category} category?`)) {
            const newSkills = { ...skills };
            delete newSkills[category];
            setSkills(newSkills);
        }
    };
    
    // Generate skills using the API
    const generateSkills = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Get the current resume content from the LaTeX viewer
            // This grabs the text content from the pre element inside the PDFViewer component
            const preElement = document.querySelector('.bg-gray-50.dark\\:bg-gray-900 pre');
            const resumeContent = preElement?.textContent || '';
            
            // Use the correct endpoint path and request structure
            const response = await fetch("http://localhost:8000/extract-skills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resume_text: resumeContent  // Match the parameter name expected by backend
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Skills extraction failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            // The backend returns categories in a nested structure
            const skillCategories = result.categories || {};
            
            // Update skills with the extracted data
            setSkills(skillCategories);
            
        } catch (error) {
            console.error('Failed to extract skills:', error);
            setError('Failed to extract skills from resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <h3 className="text-lg font-medium mb-2">{sectionLabel}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
            
            {/* AI Generate button - moved to top for better visibility */}
            <button
                type="button"
                onClick={generateSkills}
                disabled={isLoading}
                className={`mb-4 w-full py-3 flex justify-center items-center rounded-md ${
                    isLoading 
                        ? 'bg-purple-100 text-purple-400 cursor-not-allowed dark:bg-purple-900/20 dark:text-purple-400' 
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50'
                } transition-colors`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="font-medium">Analyzing your resume...</span>
                    </>
                ) : (
                    <>
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                        </svg>
                        <span className="font-medium">AI Generate Skills from Resume</span>
                    </>
                )}
            </button>
            
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-5">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md dark:bg-red-900/20 dark:border-red-700 dark:text-red-400">
                        {error}
                    </div>
                )}
                
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Your Technical Skills</h4>
                    <button
                        type="button"
                        onClick={addCategory}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Category
                    </button>
                </div>
                
                <div className="space-y-4">
                    {Object.keys(skills).length === 0 ? (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            No skills categories added yet. Click "AI Generate Skills" to automatically extract skills from your resume or add categories manually.
                        </div>
                    ) : (
                        Object.entries(skills).map(([category, skillsList]) => (
                            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="font-medium text-gray-700 dark:text-gray-300">{category}</h5>
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category)}
                                        className="text-red-500 hover:text-red-700 text-sm dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        <span className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Remove
                                        </span>
                                    </button>
                                </div>
                                <div>
                                    <label className="sr-only">Skills for {category}</label>
                                    <input
                                        type="text"
                                        value={formatSkillsInput(skillsList)}
                                        onChange={(e) => handleSkillsChange(category, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder={`Add ${category.toLowerCase()} skills, separated by commas`}
                                    />
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Enter skills separated by commas (e.g., "TypeScript, React, Node.js")
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Tip
                </h4>
                <p className="text-blue-700 dark:text-blue-200 text-sm">
                    Group similar skills under appropriate categories for better organization. List your most proficient skills first to highlight your strengths to recruiters and ATS systems.
                </p>
            </div>
        </div>
    );
});

SkillsForm.displayName = 'SkillsForm';

export default SkillsForm;