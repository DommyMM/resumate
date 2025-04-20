import Link from "next/link";
import Image from "next/image";

// Template data
const templates = [
    {
        id: "classic",
        name: "Classic Academic",
        description: "A traditional academic-style resume with clean typography and formal section headings.",
        features: ["Formal section dividers", "Traditional typography", "Optimized for academic positions", "ATS-friendly structure"],
        style: "classic",
    },
    {
        id: "modern",
        name: "Modern Professional",
        description: "A contemporary take on the academic format with modern color accents and cleaner lines.",
        features: ["Color accents", "Modern typography", "Balanced white space", "Bold section headings"],
        style: "modern",
    },
    {
        id: "professional",
        name: "Executive",
        description: "A refined business-oriented layout ideal for corporate and executive positions.",
        features: ["Minimalist design", "Business-focused layout", "Emphasis on achievements", "Compact presentation"],
        style: "professional",
    },
    {
        id: "technical",
        name: "Technical Specialist",
        description: "Designed for technical roles with emphasis on skills and projects.",
        features: ["Expanded skills section", "Project showcase", "Technical keywords optimization", "Code-friendly typography"],
        style: "modern",
    },
    {
        id: "research",
        name: "Research Scholar",
        description: "Perfect for research positions with extra emphasis on publications and research experience.",
        features: ["Publications section", "Research projects highlight", "Academic achievements focus", "Citation-ready format"],
        style: "classic",
    },
    {
        id: "minimal",
        name: "Minimalist",
        description: "A clean, space-efficient design that focuses purely on content.",
        features: ["Maximum content space", "Distraction-free design", "Highly readable", "Excellent for text-heavy resumes"],
        style: "professional",
    },
];

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="w-full py-6 px-4 sm:px-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 h-10 w-10 rounded-md flex items-center justify-center text-white font-bold text-xl">R</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ResumeBuilder</h1>
            </Link>
            <nav>
            <ul className="flex gap-6">
                <li><Link href="/#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</Link></li>
                <li><Link href="/#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">How It Works</Link></li>
                <li><Link href="/templates" className="text-blue-600 font-medium">Templates</Link></li>
            </ul>
            </nav>
        </header>

        {/* Templates Hero */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                LaTeX Resume Templates
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                All templates are based on the same professional LaTeX structure with variations in styling and emphasis. 
                Choose the one that best fits your career goals.
                </p>
            </div>
            </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                <div key={template.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Template Preview */}
                    <div className="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-600">
                    <TemplatePreview id={template.id} style={template.style} />
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{template.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{template.description}</p>
                    
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Features:</h4>
                        <ul className="mt-2 space-y-1">
                        {template.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                    <div className="mt-6">
                        <Link 
                        href={`/builder?template=${template.id}`}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                        Use This Template
                        </Link>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
                Ready to build your professional resume?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
                Choose any template to get started - you can always change it later.
            </p>
            <div className="mt-8">
                <Link 
                href="/builder"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                Start Building
                </Link>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                    <div className="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold text-lg mr-2">R</div>
                    <span className="text-xl font-bold">ResumeBuilder</span>
                </div>
                </div>
                <p className="text-gray-400">&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
            </div>
            </div>
        </footer>
        </div>
    );
}

// Template preview component
function TemplatePreview({ id, style }) {
    // Different template previews based on style
    const renderPreview = () => {
        switch (style) {
        case 'classic':
            return (
            <div className="p-4">
                {/* Header */}
                <div className="h-8 w-48 bg-gray-800 dark:bg-gray-900 rounded mb-4 mx-auto"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-2 mx-auto"></div>
                
                {/* Section - Education */}
                <div className="h-5 w-32 bg-blue-600 rounded mb-3 mt-6"></div>
                <div className="border-t-2 border-black dark:border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-32 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                
                {/* Section - Experience */}
                <div className="h-5 w-32 bg-blue-600 rounded mb-3 mt-6"></div>
                <div className="border-t-2 border-black dark:border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
            </div>
            );
            
        case 'modern':
            return (
            <div className="p-4">
                {/* Header */}
                <div className="h-10 w-48 bg-blue-600 rounded-md mb-4 mx-auto"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-2 mx-auto"></div>
                
                {/* Section - Education */}
                <div className="h-5 w-32 bg-blue-600 rounded-md mb-3 mt-6"></div>
                <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-32 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                
                {/* Section - Experience */}
                <div className="h-5 w-32 bg-blue-600 rounded-md mb-3 mt-6"></div>
                <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
            </div>
            );
        
        case 'professional':
            return (
            <div className="p-4">
                {/* Header */}
                <div className="flex justify-center mb-4">
                <div className="h-8 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                </div>
                <div className="flex justify-center gap-4 mb-4">
                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                
                {/* Section - Education */}
                <div className="h-5 w-32 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4"></div>
                <div className="border-t border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-32 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                
                {/* Section - Experience */}
                <div className="h-5 w-32 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4"></div>
                <div className="border-t border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
            </div>
            );
        
        default:
            return (
            <div className="p-4 flex justify-center items-center h-full">
                <div className="text-gray-500">Preview not available</div>
            </div>
            );
        }
    };

    return (
        <div className="w-full h-full">
        {renderPreview()}
        </div>
    );
}