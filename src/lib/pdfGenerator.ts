/**
 * Generates a PDF from LaTeX content via backend API
 * @param latex The LaTeX content to convert
 * @returns A blob URL to the generated PDF
 */
export async function generatePDF(latex: string): Promise<string> {
    try {
        const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex }),
        });

        if (!response.ok) {
        throw new Error(`Error generating PDF: ${response.statusText}`);
        }

        const pdfBlob = await response.blob();
        return URL.createObjectURL(pdfBlob);
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw error;
    }
}