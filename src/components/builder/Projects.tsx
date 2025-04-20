import React, { useState, useEffect, memo } from 'react';
import { Project } from '@/types/resume';
import { useDebounce } from '@/hooks/useDebounce';

interface ProjectsFormProps {
    data: Project[];
    updateData: (data: Project[]) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const ProjectsForm: React.FC<ProjectsFormProps> = memo(({
    data,
    updateData,
    sectionLabel,
    sectionDescription
}) => {
    // Local state for project entries
    const [projectEntries, setProjectEntries] = useState<Project[]>(data);
    
    // State for showing the optimization loading spinner
    const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
    
    // State for feedback from optimization
    const [optimizationFeedback, setOptimizationFeedback] = useState<string>('');
    
    // New entry form state with bulletText instead of bullets array
    const [newEntry, setNewEntry] = useState<Project & { bulletText?: string }>({
        id: '',
        name: '',
        technologies: '',
        url: '',
        dates: '',
        bullets: [],
        bulletText: ''
    });
    
    // Track which entry is being edited
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Debounce the project entries
    const debouncedEntries = useDebounce(projectEntries, 1000);
    
    // Update parent component when debounced data changes
    useEffect(() => {
        if (JSON.stringify(debouncedEntries) !== JSON.stringify(data)) {
            updateData(debouncedEntries);
        }
    }, [debouncedEntries, data, updateData]);
    
    // Reset new entry form
    const resetNewEntryForm = () => {
        setNewEntry({
            id: '',
            name: '',
            technologies: '',
            url: '',
            dates: '',
            bullets: [],
            bulletText: ''
        });
    };
    
    // Add a new project entry with bullet points split from text
    const handleAddProject = () => {
        if (newEntry.name.trim() && newEntry.bulletText?.trim()) {
            // Split bullet text by new lines and filter out empty lines
            const bullets = newEntry.bulletText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            
            const newId = Date.now().toString();
            const updatedEntries = [...projectEntries, { 
                ...newEntry, 
                id: newId,
                bullets: bullets
            }];
            
            setProjectEntries(updatedEntries);
            resetNewEntryForm();
        }
    };
    
    // Update a field in the new entry form
    const handleNewEntryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Delete a project entry
    const handleDeleteEntry = (id: string) => {
        const updatedEntries = projectEntries.filter(entry => entry.id !== id);
        setProjectEntries(updatedEntries);
    };
    
    // Start editing an entry
    const handleStartEdit = (id: string) => {
        setEditingId(id);
    };
    
    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);
    };
    
    // Save edited entry
    const handleSaveEdit = (id: string, updatedEntry: Project & { bulletText?: string }) => {
        // Split bullet text by new lines if it exists
        let bullets = updatedEntry.bullets;
        
        if (updatedEntry.bulletText) {
            bullets = updatedEntry.bulletText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }
        
        const updatedEntries = projectEntries.map(entry => 
            entry.id === id ? { ...updatedEntry, id, bullets } : entry
        );
        
        setProjectEntries(updatedEntries);
        setEditingId(null);
    };
    
    // Optimize bullets with AI
    const handleOptimizeBullets = async (id: string, text: string) => {
        setIsOptimizing(id);
        setOptimizationFeedback('');
        
        const requestPayload = {
            type: "project",
            text: text
        };
        
        try {
            const response = await fetch("http://localhost:8000/optimize-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestPayload),
            });
            
            if (!response.ok) {
                throw new Error(`Optimization failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            // Update the entry with optimized bullets
            setProjectEntries(prev => {
                return prev.map(entry => {
                    if (entry.id === id) {
                        return {
                            ...entry,
                            bullets: result.bullet_points
                        };
                    }
                    return entry;
                });
            });
            
            // Show feedback
            if (result.feedback && result.feedback.length > 0) {
                setOptimizationFeedback(result.feedback.join(' '));
            }
            
        } catch (error) {
            console.error('API Error:', error);
        } finally {
            setIsOptimizing(null);
        }
    };
    
    return (
        <div>
            <h3 className="text-lg font-medium mb-2">{sectionLabel}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
            
            {/* Display existing project entries */}
            {projectEntries.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-medium mb-3">Your Projects</h4>
                    <div className="space-y-3">
                        {projectEntries.map((entry) => (
                            <div key={entry.id} className="border border-gray-200 rounded-md p-4 dark:border-gray-700">
                                {editingId === entry.id ? (
                                    // Edit form
                                    <EditProjectForm 
                                        entry={entry}
                                        onSave={(updatedEntry) => handleSaveEdit(entry.id!, updatedEntry)}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    // Display entry
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                                    {entry.name}
                                                    {entry.url && (
                                                        <a 
                                                            href={entry.url.startsWith('http') ? entry.url : `https://${entry.url}`} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-300 text-sm italic">{entry.technologies}</div>
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                {entry.dates}
                                            </div>
                                        </div>
                                        
                                        {/* Display bullets */}
                                        <div className="mt-2">
                                            <ul className="list-disc pl-5 space-y-1">
                                                {entry.bullets.map((bullet, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        {/* Action buttons */}
                                        <div className="flex justify-end gap-2 mt-3">
                                            <button 
                                                onClick={() => handleStartEdit(entry.id!)} 
                                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    // Create a summary text for optimization
                                                    const summaryText = `Project: ${entry.name}. Technologies: ${entry.technologies}. ${entry.bullets.join('. ')}`;
                                                    handleOptimizeBullets(entry.id!, summaryText);
                                                }} 
                                                disabled={isOptimizing === entry.id}
                                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 transition-colors disabled:opacity-50"
                                            >
                                                {isOptimizing === entry.id ? (
                                                    <>
                                                        <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Optimizing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                        </svg>
                                                        Optimize
                                                    </>
                                                )}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteEntry(entry.id!)} 
                                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Optimization feedback panel */}
            {optimizationFeedback && (
                <div className="mt-2 mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md">
                    <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        AI Optimization Feedback
                    </h4>
                    <p className="text-purple-700 dark:text-purple-200 text-sm">{optimizationFeedback}</p>
                </div>
            )}
            
            {/* Add new project entry form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3">Add Project</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project Name*
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={newEntry.name}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Resume Builder Website"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Technologies Used*
                        </label>
                        <input
                            type="text"
                            name="technologies"
                            value={newEntry.technologies}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="React, TypeScript, Next.js"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Project URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            value={newEntry.url}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="https://github.com/yourusername/project"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Dates
                        </label>
                        <input
                            type="text"
                            name="dates"
                            value={newEntry.dates}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Jan 2024 -- Present"
                        />
                    </div>
                </div>
                
                {/* Bullet points section with single textarea */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Project Description & Achievements*
                    </label>
                    
                    <div className="flex flex-col mb-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Enter one bullet point per line. Each line will become a separate bullet point on your resume.
                        </div>
                        <textarea
                            name="bulletText"
                            value={newEntry.bulletText}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[150px]"
                            placeholder="• Developed a responsive web application with React and TypeScript
• Implemented user authentication using JWT and Firebase
• Created an intuitive interface for building resumes with real-time preview"
                            rows={5}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleAddProject}
                        disabled={!newEntry.name.trim() || !newEntry.technologies.trim() || !newEntry.bulletText?.trim()}
                        className={`px-4 py-2 rounded-md ${!newEntry.name.trim() || !newEntry.technologies.trim() || !newEntry.bulletText?.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Add Project
                    </button>
                </div>
            </div>
        </div>
    );
});

// Edit Project Form Component
interface EditProjectFormProps {
    entry: Project;
    onSave: (updatedEntry: Project) => void;
    onCancel: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ entry, onSave, onCancel }) => {
    // Convert bullets array to text for editing
    const initialBulletText = entry.bullets.join('\n');
    
    const [editedEntry, setEditedEntry] = useState({
        ...entry,
        bulletText: initialBulletText
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editedEntry.name.trim() && editedEntry.technologies.trim() && editedEntry.bulletText?.trim()) {
            // Process bullets for the final save
            const bullets = editedEntry.bulletText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
                
            // Create final entry object
            const finalEntry: Project = {
                ...editedEntry,
                bullets
            };
            
            // Remove bulletText property as it's not in the Project type
            delete (finalEntry as any).bulletText;
            
            onSave(finalEntry);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name*
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={editedEntry.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Technologies Used*
                    </label>
                    <input
                        type="text"
                        name="technologies"
                        value={editedEntry.technologies}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project URL
                    </label>
                    <input
                        type="text"
                        name="url"
                        value={editedEntry.url || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dates
                    </label>
                    <input
                        type="text"
                        name="dates"
                        value={editedEntry.dates}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            </div>
            
            {/* Bullet points section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Description & Achievements*
                </label>
                
                <div className="flex flex-col mb-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Enter one bullet point per line. Each line will become a separate bullet point on your resume.
                    </div>
                    <textarea
                        name="bulletText"
                        value={editedEntry.bulletText}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[150px]"
                        required
                    />
                </div>
            </div>
            
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 text-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

ProjectsForm.displayName = 'ProjectsForm';

export default ProjectsForm;