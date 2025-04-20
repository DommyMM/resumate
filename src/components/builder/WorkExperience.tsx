import React, { useState, useEffect, memo } from 'react';
import { Experience } from '@/types/resume';
import { useDebounce } from '@/hooks/useDebounce';

interface WorkExperienceFormProps {
    data: Experience[];
    updateData: (data: Experience[]) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = memo(({
    data,
    updateData,
    sectionLabel,
    sectionDescription
}) => {
    // Local state for experience entries
    const [experienceEntries, setExperienceEntries] = useState<Experience[]>(data);
    
    // State for showing the optimization loading spinner
    const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
    
    // State for feedback from optimization
    const [optimizationFeedback, setOptimizationFeedback] = useState<string>('');
    
    // New entry form state with bulletText instead of bullets array
    const [newEntry, setNewEntry] = useState<Experience & { bulletText?: string }>({
        id: '',
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentPosition: false,
        bullets: [],
        bulletText: ''
    });
    
    // Track which entry is being edited
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Debounce the experience entries
    const debouncedEntries = useDebounce(experienceEntries, 1000);
    
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
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrentPosition: false,
            bullets: [],
            bulletText: ''
        });
    };
    
    // Add a new experience entry with bullet points split from text
    const handleAddExperience = () => {
        if (newEntry.position.trim() && newEntry.company.trim() && newEntry.bulletText?.trim()) {
            // Split bullet text by new lines and filter out empty lines
            const bullets = newEntry.bulletText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
            
            const newId = Date.now().toString();
            const updatedEntries = [...experienceEntries, { 
                ...newEntry, 
                id: newId,
                bullets: bullets
            }];
            
            setExperienceEntries(updatedEntries);
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
    
    // Toggle current position checkbox
    const handleCurrentPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setNewEntry(prev => ({
            ...prev,
            isCurrentPosition: isChecked,
            endDate: isChecked ? 'Present' : prev.endDate
        }));
    };
    
    // Delete an experience entry
    const handleDeleteEntry = (id: string) => {
        const updatedEntries = experienceEntries.filter(entry => entry.id !== id);
        setExperienceEntries(updatedEntries);
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
    const handleSaveEdit = (id: string, updatedEntry: Experience & { bulletText?: string }) => {
        // Split bullet text by new lines if it exists
        let bullets = updatedEntry.bullets;
        
        if (updatedEntry.bulletText) {
            bullets = updatedEntry.bulletText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);
        }
        
        const updatedEntries = experienceEntries.map(entry => 
            entry.id === id ? { ...updatedEntry, id, bullets } : entry
        );
        
        setExperienceEntries(updatedEntries);
        setEditingId(null);
    };
    
    const handleOptimizeBullets = async (id: string, text: string) => {
        setIsOptimizing(id);
        setOptimizationFeedback('');
        
        try {
            const response = await fetch("http://localhost:8000/optimize-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "experience",
                    text: text
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Optimization failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            // Update the entry with optimized bullets
            setExperienceEntries(prev => {
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
            
            // Force re-scroll in PDFViewer by dispatching a custom event
            window.dispatchEvent(new CustomEvent('resume-section-updated', {
                detail: { section: 'experience' }
            }));
            
        } catch (error) {
            console.error('Failed to optimize bullets:', error);
        } finally {
            setIsOptimizing(null);
        }
    };
    
    return (
        <div>
            <h3 className="text-lg font-medium mb-2">{sectionLabel}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
            
            {/* Display existing experience entries */}
            {experienceEntries.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-medium mb-3">Your Work Experience</h4>
                    <div className="space-y-3">
                        {experienceEntries.map((entry) => (
                            <div key={entry.id} className="border border-gray-200 rounded-md p-4 dark:border-gray-700">
                                {editingId === entry.id ? (
                                    // Edit form
                                    <EditExperienceForm 
                                        entry={entry}
                                        onSave={(updatedEntry) => handleSaveEdit(entry.id!, updatedEntry)}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    // Display entry
                                    <div>
                                        <div className="flex justify-between">
                                            <div className="font-medium text-gray-800 dark:text-gray-200">{entry.position}</div>
                                            <div className="text-gray-500 text-sm">
                                                {entry.startDate} - {entry.isCurrentPosition ? 'Present' : entry.endDate}
                                            </div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">{entry.company}</div>
                                        <div className="text-gray-500 text-sm mb-2">{entry.location}</div>
                                        
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
                                                    const summaryText = `I worked as a ${entry.position} at ${entry.company} for ${entry.startDate} to ${entry.isCurrentPosition ? 'Present' : entry.endDate} where I ${entry.bullets.join('. ')}`;
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
            
            {/* Add new experience entry form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3">Add Work Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Position*
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={newEntry.position}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Software Engineer"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company*
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={newEntry.company}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Google"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={newEntry.location}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="San Francisco, CA"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Start Date
                            </label>
                            <input
                                type="text"
                                name="startDate"
                                value={newEntry.startDate}
                                onChange={handleNewEntryChange}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Jan 2022"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                End Date
                            </label>
                            <input
                                type="text"
                                name="endDate"
                                value={newEntry.endDate}
                                onChange={handleNewEntryChange}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Dec 2023"
                                disabled={newEntry.isCurrentPosition}
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isCurrentPosition"
                                checked={newEntry.isCurrentPosition}
                                onChange={handleCurrentPositionChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                            />
                            <label htmlFor="isCurrentPosition" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                I currently work here
                            </label>
                        </div>
                    </div>
                </div>
                
                {/* Bullet points section with single textarea */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Achievements & Responsibilities*
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
                            placeholder="• Developed a full-stack web application using React and Node.js
• Improved application performance by 40% through code optimizations
• Implemented automated CI/CD pipelines using GitHub Actions"
                            rows={5}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleAddExperience}
                        disabled={!newEntry.position.trim() || !newEntry.company.trim() || !newEntry.bulletText?.trim()}
                        className={`px-4 py-2 rounded-md ${!newEntry.position.trim() || !newEntry.company.trim() || !newEntry.bulletText?.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Add Experience
                    </button>
                </div>
            </div>
        </div>
    );
});

// Edit Experience Form Component
interface EditExperienceFormProps {
    entry: Experience;
    onSave: (updatedEntry: Experience) => void;
    onCancel: () => void;
}

const EditExperienceForm: React.FC<EditExperienceFormProps> = ({ entry, onSave, onCancel }) => {
    const [editedEntry, setEditedEntry] = useState<Experience>(entry);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleCurrentPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setEditedEntry(prev => ({
            ...prev,
            isCurrentPosition: isChecked,
            endDate: isChecked ? 'Present' : prev.endDate
        }));
    };
    
    const handleBulletChange = (index: number, value: string) => {
        setEditedEntry(prev => {
            const updatedBullets = [...prev.bullets];
            updatedBullets[index] = value;
            return {
                ...prev,
                bullets: updatedBullets
            };
        });
    };
    
    const handleAddBullet = () => {
        setEditedEntry(prev => ({
            ...prev,
            bullets: [...prev.bullets, '']
        }));
    };
    
    const handleRemoveBullet = (index: number) => {
        if (editedEntry.bullets.length > 1) {
            setEditedEntry(prev => {
                const updatedBullets = prev.bullets.filter((_, i) => i !== index);
                return {
                    ...prev,
                    bullets: updatedBullets
                };
            });
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editedEntry.position.trim() && editedEntry.company.trim() && editedEntry.bullets.some(b => b.trim())) {
            onSave(editedEntry);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Position*
                    </label>
                    <input
                        type="text"
                        name="position"
                        value={editedEntry.position}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company*
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={editedEntry.company}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={editedEntry.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Start Date
                        </label>
                        <input
                            type="text"
                            name="startDate"
                            value={editedEntry.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            End Date
                        </label>
                        <input
                            type="text"
                            name="endDate"
                            value={editedEntry.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            disabled={editedEntry.isCurrentPosition}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="edit-isCurrentPosition"
                            checked={editedEntry.isCurrentPosition}
                            onChange={handleCurrentPositionChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                        />
                        <label htmlFor="edit-isCurrentPosition" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            I currently work here
                        </label>
                    </div>
                </div>
            </div>
            
            {/* Bullet points section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Achievements & Responsibilities*
                </label>
                
                {editedEntry.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                        <div className="pt-2 text-gray-400">•</div>
                        <textarea
                            value={bullet}
                            onChange={(e) => handleBulletChange(index, e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[60px]"
                            placeholder="Describe a specific achievement or responsibility"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveBullet(index)}
                            disabled={editedEntry.bullets.length <= 1}
                            className="mt-2 text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
                
                <button
                    type="button"
                    onClick={handleAddBullet}
                    className="inline-flex items-center mt-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add another bullet point
                </button>
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

WorkExperienceForm.displayName = 'WorkExperienceForm';

export default WorkExperienceForm;