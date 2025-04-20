import React from 'react';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
    data: PersonalInfo;
    updateData: (data: PersonalInfo) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
    data,
    updateData,
    sectionLabel,
    sectionDescription
    }) => {
    return (
        <div>
        <h3 className="text-lg font-medium mb-4">{sectionLabel}</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.name}
                onChange={(e) => updateData({ ...data, name: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.email}
                onChange={(e) => updateData({ ...data, email: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input 
                type="tel" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.phone}
                onChange={(e) => updateData({ ...data, phone: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.location}
                onChange={(e) => updateData({ ...data, location: e.target.value })}
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn (optional)</label>
            <input 
                type="url" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.linkedin || ''}
                onChange={(e) => updateData({ ...data, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub (optional)</label>
            <input 
                type="url" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.github || ''}
                onChange={(e) => updateData({ ...data, github: e.target.value })}
                placeholder="https://github.com/yourusername"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website (optional)</label>
            <input 
                type="url" 
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                value={data.website || ''}
                onChange={(e) => updateData({ ...data, website: e.target.value })}
                placeholder="https://yourwebsite.com"
            />
            </div>
        </div>
        </div>
    );
};

export default PersonalInfoForm;