/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsMatrix from './components/SkillsMatrix';
import ExperienceEducation from './components/ExperienceEducation';
import Certifications from './components/Certifications';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import PhotoUploadModal from './components/PhotoUploadModal';
import { AvatarProvider } from './context/AvatarContext';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <AvatarProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
        {/* Top Navigation */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <ProjectShowcase />
          <SkillsMatrix />
          <ExperienceEducation />
          <Certifications />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setResumeOpen(true)} />

        {/* Full Resume Modal */}
        <ResumeModal 
          isOpen={resumeOpen} 
          onClose={() => setResumeOpen(false)} 
        />

        {/* Photo Upload Modal */}
        <PhotoUploadModal />
      </div>
    </AvatarProvider>
  );
}
