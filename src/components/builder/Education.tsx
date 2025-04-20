import React, { useState, useEffect, memo } from 'react';
import { Education as EducationType } from '@/types/resume';
import { useDebounce } from '@/hooks/useDebounce';

interface EducationFormProps {
    data: EducationType[];
    updateData: (data: EducationType[]) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const EducationForm: React.FC<EducationFormProps> = memo(({
    data,
    updateData,
    sectionLabel,
    sectionDescription
}) => {
    // Local state for education entries
    const [educationEntries, setEducationEntries] = useState<EducationType[]>(data);
    
    // New entry form state
    const [newEntry, setNewEntry] = useState<EducationType>({
        institution: '',
        location: '',
        degree: '',
        dates: ''
    });
    
    // Track which entry is being edited
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Debounce the education entries
    const debouncedEntries = useDebounce(educationEntries, 1000);
    
    // Update parent component when debounced data changes
    useEffect(() => {
        if (JSON.stringify(debouncedEntries) !== JSON.stringify(data)) {
            updateData(debouncedEntries);
        }
    }, [debouncedEntries, data, updateData]);
    
    // Reset new entry form
    const resetNewEntryForm = () => {
        setNewEntry({
            institution: '',
            location: '',
            degree: '',
            dates: ''
        });
    };
    
    // Add a new education entry
    const handleAddEducation = () => {
        if (newEntry.institution.trim() && newEntry.degree.trim()) {
            const updatedEntries = [...educationEntries, { ...newEntry }];
            setEducationEntries(updatedEntries);
            resetNewEntryForm();
        }
    };
    
    // Update a field in the new entry form
    const handleNewEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Delete an education entry
    const handleDeleteEntry = (index: number) => {
        const updatedEntries = educationEntries.filter((_, idx) => idx !== index);
        setEducationEntries(updatedEntries);
    };
    
    // Start editing an entry
    const handleStartEdit = (index: number) => {
        setEditingId(index);
    };
    
    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);
    };
    
    // Save edited entry
    const handleSaveEdit = (index: number, updatedEntry: EducationType) => {
        const updatedEntries = [...educationEntries];
        updatedEntries[index] = updatedEntry;
        setEducationEntries(updatedEntries);
        setEditingId(null);
    };
    
    return (
        <div>
            <h3 className="text-lg font-medium mb-2">{sectionLabel}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
            
            {/* Display existing education entries */}
            {educationEntries.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-medium mb-3">Your Education</h4>
                    <div className="space-y-3">
                        {educationEntries.map((entry, index) => (
                            <div key={index} className="border border-gray-200 rounded-md p-4 dark:border-gray-700">
                                {editingId === index ? (
                                    // Edit form
                                    <EditEducationForm 
                                        entry={entry}
                                        onSave={(updatedEntry) => handleSaveEdit(index, updatedEntry)}
                                        onCancel={handleCancelEdit}
                                    />
                                ) : (
                                    // Display entry
                                    <div>
                                        <div className="flex justify-between">
                                            <div className="font-medium text-gray-800 dark:text-gray-200">{entry.institution}</div>
                                            <div className="text-gray-500 text-sm">{entry.dates}</div>
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">{entry.degree}</div>
                                        <div className="text-gray-500 text-sm">{entry.location}</div>
                                        
                                        {/* Action buttons */}
                                        <div className="flex justify-end gap-2 mt-3">
                                            <button 
                                                onClick={() => handleStartEdit(index)} 
                                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteEntry(index)} 
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
            
            {/* Add new education entry form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3">Add Education</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Institution*
                        </label>
                        <input
                            type="text"
                            name="institution"
                            value={newEntry.institution}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="University or School Name"
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
                            placeholder="City, State or Country"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Degree/Certification*
                        </label>
                        <input
                            type="text"
                            name="degree"
                            value={newEntry.degree}
                            onChange={handleNewEntryChange}
                            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="BS in Computer Science"
                            required
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
                            placeholder="Sep 2018 - Jun 2022"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleAddEducation}
                        disabled={!newEntry.institution.trim() || !newEntry.degree.trim()}
                        className={`px-4 py-2 rounded-md ${!newEntry.institution.trim() || !newEntry.degree.trim() 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Add Education
                    </button>
                </div>
            </div>
        </div>
    );
});

// Edit Education Form Component
interface EditEducationFormProps {
    entry: EducationType;
    onSave: (updatedEntry: EducationType) => void;
    onCancel: () => void;
}

const EditEducationForm: React.FC<EditEducationFormProps> = ({ entry, onSave, onCancel }) => {
    const [editedEntry, setEditedEntry] = useState<EducationType>(entry);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editedEntry.institution.trim() && editedEntry.degree.trim()) {
            onSave(editedEntry);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Institution*
                    </label>
                    <input
                        type="text"
                        name="institution"
                        value={editedEntry.institution}
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Degree/Certification*
                    </label>
                    <input
                        type="text"
                        name="degree"
                        value={editedEntry.degree}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
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
            <div className="flex justify-end gap-2 mt-3">
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

EducationForm.displayName = 'EducationForm';

export default EducationForm;