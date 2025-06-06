import Link from "next/link";

const templates = [
    {
        id: "scholar",
        name: "Academic Scholar",
        description: "Emphasizes educational achievements and qualifications, perfect for academic positions and graduate applications.",
        features: ["Enhanced education section", "Academic qualifications focus", "Elegant typography", "ATS-friendly structure"],
        style: "classic",
    },
    {
        id: "professional",
        name: "Industry Professional",
        description: "Highlights work experience and achievements with a clean, business-oriented design for corporate positions.",
        features: ["Expanded work experience section", "Achievement-focused bullets", "Business-ready layout", "Professional tone"],
        style: "professional",
    },
    {
        id: "researcher",
        name: "Research Specialist",
        description: "Showcases research projects and technical skills with a modern design for research and technical roles.",
        features: ["Prominent projects section", "Technical skills highlight", "Research achievements focus", "Modern visual elements"],
        style: "modern",
    },
    {
        id: "technical",
        name: "Technical Expert",
        description: "Designed for technical roles with emphasis on skills and technical expertise.",
        features: ["Expanded skills section", "Technical competencies showcase", "Code and tools expertise", "Technical achievements focus"],
        style: "modern",
    },
    {
        id: "startup",
        name: "Startup Innovator",
        description: "Perfect for startup environments, focusing on versatile skills and impactful projects.",
        features: ["Balanced experience and projects", "Innovation highlights", "Versatility emphasis", "Modern digital presence"],
        style: "professional",
    },
    {
        id: "minimal",
        name: "Minimalist",
        description: "A clean, space-efficient design that focuses purely on content for any career type.",
        features: ["Maximum content space", "Distraction-free design", "Highly readable", "Multi-purpose application"],
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
    // Different template previews based on style and id
    const renderPreview = () => {
        // Base styles
        if (style === 'classic') {
            // Academic Scholar - emphasize education
            return (
            <div className="p-4">
                {/* Header */}
                <div className="h-8 w-48 bg-gray-800 dark:bg-gray-900 rounded mb-4 mx-auto"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-2 mx-auto"></div>
                
                {/* Section - Education - LARGER for Academic Scholar */}
                <div className="h-6 w-36 bg-blue-600 rounded mb-3 mt-4 font-bold"></div>
                <div className="border-t-2 border-black dark:border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-2">
                    <div className="h-5 w-36 bg-gray-700 dark:bg-gray-900 rounded"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-4 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-500 rounded mb-3"></div>
                
                {/* Section - Experience - smaller for Academic Scholar */}
                <div className="h-5 w-32 bg-blue-600 rounded mb-3 mt-4"></div>
                <div className="border-t-2 border-black dark:border-gray-400 w-full mb-3"></div>
                <div className="flex justify-between mb-1">
                    <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                </div>
                <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
            </div>
            );
        } else if (style === 'modern') {
            // Research Specialist or Technical Expert
            return (
            <div className="p-4">
                {/* Header */}
                <div className="h-10 w-48 bg-blue-600 rounded-md mb-4 mx-auto"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-2 mx-auto"></div>
                
                {/* Adjust sections based on template ID */}
                {id === 'researcher' ? (
                    // Research Specialist - emphasize projects
                    <>
                        {/* Projects Section - LARGER */}
                        <div className="h-6 w-32 bg-blue-600 rounded-md mb-3 mt-4 font-bold"></div>
                        <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                        <div className="flex justify-between mb-2">
                            <div className="h-5 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        </div>
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                        
                        {/* Experience Section - smaller */}
                        <div className="h-5 w-32 bg-blue-600 rounded-md mb-3 mt-4"></div>
                        <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                        <div className="flex justify-between mb-1">
                            <div className="h-4 w-32 bg-gray-700 dark:bg-gray-900 rounded"></div>
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        </div>
                        <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                    </>
                ) : (
                    // Technical Expert - emphasize skills
                    <>
                        {/* Skills Section - LARGER */}
                        <div className="h-6 w-36 bg-blue-600 rounded-md mb-3 mt-4 font-bold"></div>
                        <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div>
                                <div className="h-4 w-24 bg-gray-700 dark:bg-gray-900 rounded mb-1"></div>
                                <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded"></div>
                            </div>
                            <div>
                                <div className="h-4 w-24 bg-gray-700 dark:bg-gray-900 rounded mb-1"></div>
                                <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded"></div>
                            </div>
                        </div>
                        
                        {/* Experience Section - standard */}
                        <div className="h-5 w-32 bg-blue-600 rounded-md mb-3 mt-4"></div>
                        <div className="border-t-2 border-blue-600 w-full mb-3"></div>
                        <div className="flex justify-between mb-1">
                            <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        </div>
                        <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
                    </>
                )}
            </div>
            );
        } else if (style === 'professional') {
            // Industry Professional, Startup Innovator, or Minimalist
            if (id === 'professional') {
                // Industry Professional - emphasize experience
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
                    
                    {/* Experience Section - LARGER */}
                    <div className="h-6 w-36 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4 font-bold"></div>
                    <div className="border-t border-gray-400 w-full mb-3"></div>
                    <div className="flex justify-between mb-2">
                        <div className="h-5 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                    <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded mb-1"></div>
                    <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                    
                    {/* Education Section - smaller */}
                    <div className="h-5 w-32 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4"></div>
                    <div className="border-t border-gray-400 w-full mb-3"></div>
                    <div className="flex justify-between mb-1">
                        <div className="h-4 w-32 bg-gray-700 dark:bg-gray-900 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="h-3 w-48 bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                </div>
                );
            } else if (id === 'startup') {
                // Startup Innovator - balance projects and experience
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
                    
                    {/* Experience Section */}
                    <div className="h-5 w-32 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4"></div>
                    <div className="border-t border-gray-400 w-full mb-3"></div>
                    <div className="flex justify-between mb-1">
                        <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                    
                    {/* Projects Section - equally emphasized */}
                    <div className="h-5 w-32 bg-gray-700 dark:bg-gray-900 rounded mb-3 mt-4"></div>
                    <div className="border-t border-gray-400 w-full mb-3"></div>
                    <div className="flex justify-between mb-1">
                        <div className="h-4 w-40 bg-gray-700 dark:bg-gray-900 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-500 rounded"></div>
                    </div>
                    <div className="h-3 w-full bg-gray-300 dark:bg-gray-500 rounded mb-3"></div>
                </div>
                );
            } else {
                // Minimalist - cleaner, simpler
                return (
                <div className="p-4">
                    {/* Header - simpler */}
                    <div className="flex justify-center mb-6">
                        <div className="h-7 w-36 bg-gray-800 dark:bg-gray-900 rounded"></div>
                    </div>
                    <div className="flex justify-center gap-6 mb-6">
                        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-500 rounded"></div>
                        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-500 rounded"></div>
                    </div>
                    
                    {/* Minimal section dividers with more whitespace */}
                    <div className="h-5 w-28 bg-gray-700 dark:bg-gray-900 rounded mb-2"></div>
                    <div className="border-t border-gray-300 w-full mb-4"></div>
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-600 rounded mb-6"></div>
                    
                    <div className="h-5 w-28 bg-gray-700 dark:bg-gray-900 rounded mb-2"></div>
                    <div className="border-t border-gray-300 w-full mb-4"></div>
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                </div>
                );
            }
        }
        
        // Default fallback
        return (
        <div className="p-4 flex justify-center items-center h-full">
            <div className="text-gray-500">Preview not available</div>
        </div>
        );
    };

    return (
        <div className="w-full h-full">
        {renderPreview()}
        </div>
    );
}