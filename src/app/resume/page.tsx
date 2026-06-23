"use client";

import React from 'react';
import ClickSpark from '@/components/ui/ClickSpark';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';

const RESUME_PDF_PATH = '/Tran_Khoi_Nguyen_Pham_s_Resume_Summer_Feb_2026.pdf';
const RESUME_PDF_VIEWER_SRC = `${RESUME_PDF_PATH}#toolbar=0&navpanes=0&scrollbar=0`;

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF_PATH;
    link.download = 'Noah_Pham_Resume.pdf';
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(RESUME_PDF_PATH, '_blank');
  };

  return (
    <>
      <ClickSpark
        sparkColor='#0092FF'
        sparkSize={15}
        sparkRadius={40}
        sparkCount={10}
        duration={400}
      >
        <div className="min-h-screen bg-white py-8">
          <div className="container mx-auto max-w-6xl px-8 pb-8">
            {/* Header Section */}
            <div className="mb-16">
              <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-gray-400">
                Resume
              </h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                    Atilade Oke
                  </h1>
                  <p className="mt-2 text-xl text-gray-500">
                    Electrical Engineering Student & Founder
                  </p>
                  <p className="mt-1 text-lg text-gray-400">
                    Last Updated: Feb 2026
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleDownload}
                    variant="tactile-black"
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download PDF
                  </Button>
                  <Button 
                    onClick={handleOpenInNewTab}
                    variant="tactile-secondary"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Open in New Tab
                  </Button>
                </div>
              </div>
            </div>

            {/* PDF Viewer Section */}
            <div className="mb-16">
              <div className="relative w-full">
                <div className="relative overflow-hidden rounded-xl bg-gray-50 shadow-lg">
                  <iframe
                    src={RESUME_PDF_VIEWER_SRC}
                    width="100%"
                    height="800"
                    className="border-0 rounded-xl"
                    title="Resume PDF"
                  />
                </div>
                
                {/* Fallback message */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl opacity-0 pointer-events-none" id="pdf-fallback">
                  <div className="text-center space-y-4">
                    <p className="text-gray-500">
                      Unable to display PDF. Please download to view.
                    </p>
                    <Button onClick={handleDownload} variant="default">
                      <Download size={16} className="mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-optimized message */}
            <div className="block sm:hidden mb-16">
              <div className="rounded-xl bg-blue-50 p-6 text-center">
                <p className="text-blue-700 font-medium mb-3">
                  For the best viewing experience on mobile
                </p>
                <p className="text-blue-600 text-sm mb-4">
                  Download the PDF or open in a new tab for easier reading
                </p>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleDownload} variant="default" size="sm">
                    <Download size={14} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>

            <hr className="mx-auto my-16 w-full border-t border-gray-200" />
          </div>
        </div>
      </ClickSpark>
    </>
  );
};

export default Resume;
