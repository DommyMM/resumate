import React, { useState, useEffect, memo } from 'react';
import { PersonalInfo } from '@/types/resume';
import { useDebounce } from '@/hooks/useDebounce';

interface PersonalInfoFormProps {
    data: PersonalInfo;
    updateData: (data: PersonalInfo) => void;
    sectionLabel: string;
    sectionDescription: string;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = memo(({
    data,
    updateData,
    sectionLabel,
    sectionDescription
}) => {
    // Local state for form values - initialize from props but don't update on prop changes
    const [localData, setLocalData] = useState<PersonalInfo>(() => data);

    // Update local state if props data changes (e.g., when form is reset)
    useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(localData)) {
            setLocalData(data);
        }
    }, [data]);

    // Debounce the local data with 5 second delay
    const debouncedData = useDebounce(localData, 2000);

    // Update parent component when debounced data changes
    useEffect(() => {
        // Only call updateData if data actually changed
        if (JSON.stringify(debouncedData) !== JSON.stringify(data)) {
            updateData(debouncedData);
        }
    }, [debouncedData, data, updateData]);

    // Format phone number as user types (333-333-3333)
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        const digits = e.target.value.replace(/\D/g, '');

        // Format with dashes
        let formattedNumber = '';
        if (digits.length <= 3) {
            formattedNumber = digits;
        } else if (digits.length <= 6) {
            formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else {
            formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }

        setLocalData({ ...localData, phone: formattedNumber });
    };

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
                        value={localData.name}
                        onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        value={localData.email}
                        onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                        type="tel"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        value={localData.phone}
                        onChange={handlePhoneChange}
                        placeholder="123-456-7890"
                        maxLength={12}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn (optional)</label>
                    <input
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        value={localData.linkedin || ''}
                        onChange={(e) => setLocalData({ ...localData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub (optional)</label>
                    <input
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        value={localData.github || ''}
                        onChange={(e) => setLocalData({ ...localData, github: e.target.value })}
                        placeholder="https://github.com/yourusername"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website (optional)</label>
                    <input
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                        value={localData.website || ''}
                        onChange={(e) => setLocalData({ ...localData, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                    />
                </div>
            </div>
        </div>
    );
});

PersonalInfoForm.displayName = 'PersonalInfoForm';

export default PersonalInfoForm;