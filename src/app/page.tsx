import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 h-10 w-10 rounded-md flex items-center justify-center text-white font-bold text-xl">R</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ResumeBuilder</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#templates" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Templates</a></li>
            <li><a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</a></li>
            <li><a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">How It Works</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Professional resumes</span>
            <span className="block text-blue-600">powered by AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create ATS-friendly resumes with real-time AI optimization. Our tool uses advanced language models to help you craft the perfect resume in minutes.
          </p>
          <div className="mt-10 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link href="/builder" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Build Your Resume
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/templates" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Resume Template Section */}
      <section id="templates" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Professional Templates
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
              Choose from professionally designed variations based on the LaTeX academic resume format.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Template Preview 1 - Classic */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-600">
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
              </div>
              <div className="p-4">
                <h3 className="font-medium">Classic</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Traditional academic style</p>
              </div>
            </div>
            
            {/* Template Preview 2 - Modern */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-600">
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
              </div>
              <div className="p-4">
                <h3 className="font-medium">Modern</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Contemporary color scheme</p>
              </div>
            </div>
            
            {/* Template Preview 3 - Professional */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-600">
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
                  
                  {/* Added additional elements to match height */}
                  <div className="h-2 w-4/5 bg-gray-200 dark:bg-gray-500 rounded mb-1 mt-2"></div>
                  <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-500 rounded mb-1"></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Professional</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">Clean and business-oriented</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/templates" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-500">
              Browse all templates
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Powered by AI
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our resume builder uses AI to help you create a professional, ATS-friendly resume.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">Real-Time Optimization</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Get instant feedback on your content with AI-powered suggestions to highlight your accomplishments effectively.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">ATS-Friendly Format</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Our LaTeX-based templates are designed to pass through Applicant Tracking Systems with clean, machine-readable formatting.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">Professional PDF Export</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Generate beautifully typeset PDFs using industry-standard LaTeX templates that stand out from word processor resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Create your professional resume in three simple steps
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enter Your Information</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Fill in your details section by section with our guided form interface. Our AI helps optimize your content as you type.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review & Refine</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  See your resume take shape in real-time with our side-by-side preview. Make adjustments with instant visual feedback.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Download & Apply</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Generate a professional LaTeX-formatted PDF resume that stands out from the crowd and passes ATS systems.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/builder" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Start Building Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="bg-blue-600 h-8 w-8 rounded-md flex items-center justify-center text-white font-bold text-lg mr-2">R</div>
                <span className="text-xl font-bold">ResumeBuilder</span>
              </div>
              <p className="mt-2 text-sm text-gray-300">
                Create professional resumes with AI assistance
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#templates" className="text-gray-300 hover:text-white">Templates</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Resume Tips</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Career Advice</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}