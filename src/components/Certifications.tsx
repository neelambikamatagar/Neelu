import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Languages, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Globe2
} from 'lucide-react';
import { CERTIFICATIONS_DATA, PERSONAL_INFO } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2">
              <Award className="w-4 h-4" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Languages
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Specialized technical accreditations in machine learning, AI theory, computer networking, and industry springboard standards.
            </p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Completed
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium mt-0.5">{cert.issuer}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cert.focus}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Curriculum Competency</span>
              </div>
            </motion.div>
          ))}

          {/* Languages Card in same grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <Languages className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Multilingual
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Languages Proficiency</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Effective multilingual communication across technical teams, professional workspaces, and diverse communities.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {PERSONAL_INFO.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-xs font-semibold text-slate-200">{lang.name}</span>
                    <span className="text-xs font-mono text-indigo-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-indigo-900/40 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Native & Professional Working</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
