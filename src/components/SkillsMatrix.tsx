import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Terminal, 
  Users, 
  Search, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...SKILLS_DATA.map((c) => c.category)];

  const filteredCategories = SKILLS_DATA.map((group) => {
    const isCategoryMatch = selectedCategory === 'All' || group.category === selectedCategory;
    const filteredSkills = group.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...group,
      visible: isCategoryMatch && filteredSkills.length > 0,
      skills: filteredSkills
    };
  }).filter((group) => group.visible);

  return (
    <section id="skills" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills & Engineering Stack
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Equipped with a solid foundation in computer engineering, algorithmic thinking, and modern software and AI pipelines.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((group, gIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.05 }}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700/80 transition-colors space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  {group.category}
                </h3>
                <span className="text-[11px] font-mono text-slate-500">{group.skills.length} skills</span>
              </div>

              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="text-indigo-400 font-mono tabular-nums">{skill.level}%</span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400">{skill.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No skills found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

      </div>
    </section>
  );
}
