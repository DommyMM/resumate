'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

interface PDFViewerProps {
    pdfUrl: string | null;
    isProcessing?: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isProcessing = false }) => {
    const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.2);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdfjsLib, setPdfjsLib] = useState<typeof import('pdfjs-dist') | null>(null);

    // Load PDF.js library
    useEffect(() => {
        const loadPdfJs = async () => {
            const pdfjs = await import('pdfjs-dist');
            pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
            setPdfjsLib(pdfjs);
        };
        
        loadPdfJs();
    }, []);

    // Load PDF when URL changes
    useEffect(() => {
        if (pdfUrl && pdfjsLib) {
            loadPdfDocument(pdfUrl);
        } else if (!pdfUrl) {
            setPdfDocument(null);
        }
        
        // Cleanup function
        return () => {
            if (pdfDocument) {
                pdfDocument.destroy();
            }
        };
    }, [pdfUrl, pdfjsLib]);

    // Render PDF page when document, page, or scale changes
    useEffect(() => {
        if (pdfDocument && canvasRef.current) {
        renderPage();
        }
    }, [pdfDocument, currentPage, scale]);

    // Load PDF document
    const loadPdfDocument = async (url: string) => {
        if (!pdfjsLib) return;
        
        try {
            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            setPdfDocument(pdf);
            setNumPages(pdf.numPages);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error loading PDF document:', error);
        }
    };

    // Render the current page
    const renderPage = async () => {
        if (!pdfDocument || !canvasRef.current) return;

        try {
            const page = await pdfDocument.getPage(currentPage);
            const viewport = page.getViewport({ scale });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
        } catch (error) {
            console.error('Error rendering PDF page:', error);
        }
    };

    // Navigate to previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    // Navigate to next page
    const handleNextPage = () => {
        if (pdfDocument && currentPage < numPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    // Change zoom level
    const handleZoomChange = (newScale: number) => {
        setScale(newScale);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-16rem)]">
            {isProcessing ? (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Generating your resume...</p>
                    </div>
                </div>
            ) : pdfUrl ? (
                <div ref={containerRef} className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700">
                        <div>
                            <button 
                                onClick={handlePreviousPage}
                                disabled={currentPage <= 1}
                                className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 mr-2"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage >= numPages}
                                className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                            <span className="ml-4 text-sm">
                                Page {currentPage} of {numPages}
                            </span>
                        </div>
                        <div>
                            <select 
                                value={scale} 
                                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                                className="px-2 py-1 border rounded bg-white dark:bg-gray-800"
                            >
                                <option value={0.8}>80%</option>
                                <option value={1}>100%</option>
                                <option value={1.2}>120%</option>
                                <option value={1.5}>150%</option>
                                <option value={2}>200%</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-4 flex justify-center">
                        <canvas ref={canvasRef} className="shadow-lg" />
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400">No PDF to display. Enter details!</p>
                </div>
            )}
        </div>
    );
};

export default PDFViewer;