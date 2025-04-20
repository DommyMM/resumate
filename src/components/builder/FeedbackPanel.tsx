import React from 'react';

interface FeedbackPanelProps {
    feedback: string;
    isVisible: boolean;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, isVisible }) => {
    if (!isVisible || !feedback) {
        return null;
    }

    return (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            AI Feedback
        </h4>
        <p className="text-blue-700 dark:text-blue-200 text-sm">{feedback}</p>
        </div>
    );
};

export default FeedbackPanel;