import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Users2,
  Trophy,
  BookOpen
} from 'lucide-react';
import { EDUCATION_DATA, ACTIVITIES_DATA } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="education" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Journey & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Campus Activities
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Building strong analytical foundations through university coursework, competitive hackathons, and NSS community leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Education Timeline (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Academic Qualifications</h3>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-800">
              {EDUCATION_DATA.map((edu, idx) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-10 space-y-2 group"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium text-indigo-400">{edu.period}</span>
                      {edu.badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {edu.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                      {edu.institution}
                    </h4>

                    <div className="text-xs font-semibold text-slate-300 mt-0.5">
                      {edu.degree}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {edu.location}
                      </span>
                      {edu.grade && (
                        <>
                          <span>&bull;</span>
                          <span className="text-emerald-400 font-mono font-semibold">{edu.grade}</span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Activities, Hackathons & NSS (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Activities, Training & Leadership</h3>
            </div>

            <div className="space-y-4">
              {ACTIVITIES_DATA.map((act, idx) => (
                <motion.div
                  key={act.title}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{act.title}</h4>
                      <p className="text-xs text-indigo-400 font-medium">{act.organization}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">{act.period}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {act.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {act.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
