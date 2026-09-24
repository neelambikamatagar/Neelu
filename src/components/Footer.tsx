import React from 'react';
import { ArrowUp, Heart, Linkedin, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-slate-400 text-xs">
              Computer Science & Design Engineer &bull; AI/ML & Full-Stack Developer
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#demos" className="hover:text-white transition-colors">Demos</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <button onClick={onOpenResume} className="hover:text-white transition-colors">Resume</button>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex items-center gap-2"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-slate-400 transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <span>&bull;</span>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-400 transition-colors">
              LinkedIn Profile
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
