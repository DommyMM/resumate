import React from 'react';

interface SummaryFormProps {
    data: string;
    updateData: (data: string) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const SummaryForm: React.FC<SummaryFormProps> = ({
    data,
    updateData,
    sectionLabel,
    sectionDescription
    }) => {
    return (
        <div>
        <h3 className="text-lg font-medium mb-4">{sectionLabel}</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{sectionDescription}</p>
        
        <div>
            <textarea
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            value={data}
            onChange={(e) => updateData(e.target.value)}
            placeholder="Write a brief summary of your professional background, skills, and career goals..."
            />
        </div>
        </div>
    );
};

export default SummaryForm;