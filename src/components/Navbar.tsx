import React, { useState, useEffect } from 'react';
import { FileText, Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useAvatar } from '../context/AvatarContext';

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { avatarUrl } = useAvatar();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Interactive Demos', href: '#demos' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand wordmark with photo avatar */}
        <a 
          href="#about" 
          className="text-sm sm:text-base font-bold tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2.5"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-indigo-500/40 shadow-sm shadow-indigo-500/20">
            <img 
              src={avatarUrl} 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span>{PERSONAL_INFO.name}</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-indigo-400 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/30 whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>View Full Resume</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Neelambika</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
