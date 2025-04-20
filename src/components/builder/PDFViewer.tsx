'use client';

import React, { useState, useRef } from 'react';

interface PDFViewerProps {
    pdfUrl?: string | null;
    latexContent?: string | null;
    isProcessing?: boolean;
    onDownload?: () => void;
    downloadDisabled?: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ 
    pdfUrl, 
    latexContent, 
    isProcessing = false,
    onDownload,
    downloadDisabled = false
}) => {
    const [currentTab, setCurrentTab] = useState<'preview' | 'latex'>('latex');
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    
    // For future PDF implementation
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Copy to clipboard function
    const copyToClipboard = async () => {
        if (latexContent) {
            try {
                await navigator.clipboard.writeText(latexContent);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };
    
    if (isProcessing) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Processing your resume...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden h-[calc(100vh-16rem)] flex flex-col">
            {/* Tab navigation with Download button */}
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 relative">
                <div className="flex items-center">
                    <button
                        onClick={() => setCurrentTab('latex')}
                        className={`px-4 py-2 ${
                            currentTab === 'latex'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        } font-medium rounded-t-lg`}
                    >
                        LaTeX Code
                    </button>
                    <button
                        onClick={() => setCurrentTab('preview')}
                        className={`px-4 py-2 ml-2 ${
                            currentTab === 'preview'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        } font-medium rounded-t-lg`}
                        disabled={!pdfUrl}
                    >
                        PDF Preview (coming soon)
                    </button>
                </div>
                
                {/* Download button - absolutely positioned at right */}
                <button 
                    onClick={onDownload}
                    className={`absolute right-0 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm ${downloadDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={downloadDisabled}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                </button>
            </div>
        
            {/* Content area - with background styling */}
            <div className="flex-grow overflow-auto relative bg-white dark:bg-gray-800 rounded-b-lg shadow-md">
                {currentTab === 'latex' && latexContent ? (
                    <div className="p-4 relative">
                        {/* Copy button – now sticky */}
                        <div className="sticky top-2 z-10 flex justify-end">
                            <button 
                                onClick={copyToClipboard}
                                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors flex items-center gap-1 shadow-md"
                            >
                                {copySuccess ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                        </svg>
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 overflow-auto h-full mt-2">
                            <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-200 pt-8">
                                {latexContent}
                            </pre>
                        </div>
                    </div>
                ) : currentTab === 'preview' && pdfUrl ? (
                    <div className="p-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            PDF preview will be implemented in the final version.
                        </p>
                        <canvas ref={canvasRef} className="mx-auto"></canvas>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-600 dark:text-gray-400">No content to display</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;