import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  MessageCircle,
  Camera
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useAvatar } from '../context/AvatarContext';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const { avatarUrl, isCustom, openUploadModal } = useAvatar();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative min-h-[92vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Subtle ambient lighting grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic & Bio Anchor (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Editorial Status Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Software Engineering & AI Internships</span>
            </div>

            {/* Massive Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">{PERSONAL_INFO.name}</span>
              </h1>
              
              {/* Dynamic Animated Role */}
              <div className="h-10 sm:h-12 flex items-center overflow-hidden">
                <span className="text-slate-400 text-lg sm:text-xl font-medium mr-2">I build with</span>
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="text-lg sm:text-2xl font-semibold text-indigo-400"
                >
                  {PERSONAL_INFO.roles[currentRoleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Objective Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-pretty">
              Computer Science and Design student at <span className="text-slate-100 font-semibold">{PERSONAL_INFO.college}</span>. Driven by combining software development with AI/ML, computer vision, and data analysis to solve real-world problems.
            </p>

            {/* Quick Contact & Location Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Karnataka, India</span>
              </div>
              <span className="text-slate-700">&bull;</span>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span className="text-slate-700">&bull;</span>
              <a 
                href={`tel:${PERSONAL_INFO.phone}`} 
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span className="text-slate-700">&bull;</span>
              <a 
                href={`https://api.whatsapp.com/send?phone=916363135305&text=${encodeURIComponent('Hi Neelambika! I visited your portfolio and would like to connect.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 text-slate-300 bg-slate-900/90 border border-slate-700/80 rounded-xl hover:text-indigo-400 hover:bg-slate-800 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Quantitative Proof Adjacency Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 max-w-lg">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">8.00<span className="text-xs text-indigo-400 font-normal">/10</span></div>
                <div className="text-xs text-slate-400 mt-0.5">Engineering CGPA</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">3+</div>
                <div className="text-xs text-slate-400 mt-0.5">ML & Web Projects</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <div className="text-2xl font-bold text-white tracking-tight tabular-nums">5</div>
                <div className="text-xs text-slate-400 mt-0.5">Certifications</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Anchor & Portrait Media Frame (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-emerald-500/10 blur-xl opacity-75"></div>

              {/* Main Media Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl group">
                
                {/* Image container (clickable) */}
                <div 
                  onClick={openUploadModal}
                  className="aspect-square relative overflow-hidden bg-slate-950 cursor-pointer"
                  title="Click to upload/change your photo"
                >
                  <img
                    src={avatarUrl}
                    alt="Neelambika Matagar - Software & AI/ML Engineer"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Hover hint overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md">
                      <Camera className="w-4 h-4 text-indigo-400" />
                      <span>{isCustom ? 'Change Photo' : 'Upload Your Photo'}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Upload Button */}
                <button
                  type="button"
                  onClick={openUploadModal}
                  className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-800 hover:border-indigo-500 text-xs font-medium flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all"
                  title="Upload IMG-20250119-WA0003[1].jpg or any photo from your device"
                >
                  <Camera className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isCustom ? 'Photo Added' : 'Add Photo'}</span>
                </button>

                {/* Overlaid Bottom Card Info */}
                <div className="p-5 relative z-10 -mt-16 backdrop-blur-md bg-slate-900/90 border-t border-slate-800/80 mx-3 mb-3 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white">{PERSONAL_INFO.name}</h2>
                      <p className="text-xs text-indigo-400 font-medium">{PERSONAL_INFO.degree}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Alva&apos;s AIET &apos;27
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                    <span>Mangalore, Karnataka</span>
                    <span>Kannada &bull; English &bull; Hindi</span>
                  </div>
                </div>

                {/* Floating Tag 1: Deep Learning */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-200 shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI & Machine Learning</span>
                </motion.div>

                {/* Floating Tag 2: Full Stack */}
                <motion.div 
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-16 right-4 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-200 shadow-xl flex items-center gap-2"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>React & Flask</span>
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Marquee Banner Ribbon */}
      <div className="absolute bottom-0 left-0 right-0 py-3 bg-slate-950/80 border-y border-slate-800/80 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-marquee text-xs uppercase tracking-widest font-mono text-slate-400">
          <span>&bull; Python Machine Learning</span>
          <span>&bull; Deep Learning Computer Vision</span>
          <span>&bull; Full-Stack React.js & Flask</span>
          <span>&bull; Personal Finance Data Analytics</span>
          <span>&bull; Phishing URL Security Classifier</span>
          <span>&bull; SQL & MySQL Relational DB</span>
          <span>&bull; National Service Scheme (NSS) Leader</span>
          <span>&bull; Python Machine Learning</span>
          <span>&bull; Deep Learning Computer Vision</span>
          <span>&bull; Full-Stack React.js & Flask</span>
        </div>
      </div>
    </section>
  );
}
