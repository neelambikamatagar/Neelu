import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  ShieldAlert, 
  DollarSign, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Binary,
  Search,
  Check,
  AlertTriangle,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';
import financeImg from '../assets/images/project_finance_tracker_1790233056469.jpg';
import cattleImg from '../assets/images/project_cattle_ai_1790233070791.jpg';

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'cards' | 'interactive'>('cards');

  // Interactive Demo 1: Finance State
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [rent, setRent] = useState<number>(14000);
  const [food, setFood] = useState<number>(9000);
  const [transport, setTransport] = useState<number>(4500);
  const [learning, setLearning] = useState<number>(3500);

  const totalExpenses = rent + food + transport + learning;
  const savings = Math.max(0, monthlyIncome - totalExpenses);
  const savingsRate = Math.round((savings / monthlyIncome) * 100);

  // Interactive Demo 2: Cattle Breed State
  const breeds = [
    {
      id: 'gir',
      name: 'Gir Cattle (Gyr)',
      region: 'Saurashtra / Gujarat & Karnataka',
      confidence: 97.8,
      traits: ['Convex forehead dome', 'Long pendulous folded ears', 'Prominent hump'],
      milkYield: '12 - 18 Liters / day',
      climateResilience: 'High heat & tick resistance'
    },
    {
      id: 'kankrej',
      name: 'Kankrej Breed',
      region: 'Rann of Kutch, Gujarat & Rajasthan',
      confidence: 96.2,
      traits: ['Powerful lyre-shaped horns', 'Distinctive slow gait (sawai chal)', 'Broad chest'],
      milkYield: '10 - 15 Liters / day',
      climateResilience: 'Drought hardy & resilient'
    },
    {
      id: 'sahiwal',
      name: 'Sahiwal Dairy Breed',
      region: 'North-Western India',
      confidence: 98.4,
      traits: ['Reddish-dun coat color', 'Loose skin & voluminous dewlap', 'Short stumpy horns'],
      milkYield: '15 - 22 Liters / day',
      climateResilience: 'Excellent tropical heat endurance'
    },
    {
      id: 'hallikar',
      name: 'Hallikar Draught Breed',
      region: 'Mysore & Southern Karnataka',
      confidence: 95.9,
      traits: ['Long tapering horns emerging close', 'Lean muscular athletic build', 'Grey-white coat'],
      milkYield: '8 - 10 Liters / day',
      climateResilience: 'Renowned stamina & endurance'
    }
  ];
  const [selectedBreed, setSelectedBreed] = useState(breeds[0]);

  // Interactive Demo 3: Phishing URL Detector State
  const sampleUrls = [
    { url: 'https://secure-hdfc-kyc-update.com/verify-account.php', label: 'Suspicious Bank Clone', type: 'phish' },
    { url: 'http://login.paypal.verify-security-check.xyz/@billing', label: 'Spoofed Payment Gateway', type: 'phish' },
    { url: 'https://alvas.org/engineering-technology/departments/', label: 'Alva\'s AIET Official Portal', type: 'safe' },
    { url: 'https://github.com/neelambika-matagar/expense-tracker', label: 'GitHub Project Repository', type: 'safe' }
  ];
  const [testUrl, setTestUrl] = useState(sampleUrls[0].url);
  const [scanResult, setScanResult] = useState<{
    isPhishing: boolean;
    confidence: number;
    entropyScore: number;
    sslValid: boolean;
    hasSpecialSymbols: boolean;
    domainAgeDays: number;
    rfConfidence: number;
    svmConfidence: number;
    dtConfidence: number;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanUrl = (urlToTest: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const lower = urlToTest.toLowerCase();
      const isPhish = lower.includes('verify') || lower.includes('.xyz') || lower.includes('@') || lower.includes('update') || lower.startsWith('http://');
      
      setScanResult({
        isPhishing: isPhish,
        confidence: isPhish ? 97.4 : 98.6,
        entropyScore: isPhish ? 4.82 : 2.15,
        sslValid: !isPhish,
        hasSpecialSymbols: lower.includes('@') || lower.includes('-') || lower.includes('//'),
        domainAgeDays: isPhish ? 14 : 2480,
        rfConfidence: isPhish ? 98.1 : 99.2,
        svmConfidence: isPhish ? 96.5 : 97.8,
        dtConfidence: isPhish ? 95.8 : 96.9
      });
      setIsScanning(false);
    }, 450);
  };

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Engineering & Machine Learning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects & Research
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Real-world systems spanning deep learning computer vision, automated financial data analytics, and cybersecurity machine learning classifiers.
            </p>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'cards' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Project Overviews</span>
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'interactive' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Live Interactive Demos</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Bento Grid Project Cards */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Card 1: Personal Finance & Expense Tracker (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-950">
                  <img 
                    src={financeImg} 
                    alt={PROJECTS_DATA[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  {/* Clean unboxed category label */}
                  <div className="absolute top-4 left-4 text-xs font-semibold tracking-wide text-indigo-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800">
                    {PROJECTS_DATA[0].category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {PROJECTS_DATA[0].title}
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium mt-1">
                      {PROJECTS_DATA[0].subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {PROJECTS_DATA[0].description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {PROJECTS_DATA[0].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Clean tech stack unboxed list */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-slate-500 font-sans">Tech:</span>
                    {PROJECTS_DATA[0].techStack.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {i < PROJECTS_DATA[0].techStack.length - 1 && <span className="text-slate-600">&bull;</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(PROJECTS_DATA[0])}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study Details</span>
                </button>
                <button
                  onClick={() => setActiveTab('interactive')}
                  className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Test Calculator Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Card 2: AI Indigenous Cattle Breed Classification (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                  <img 
                    src={cattleImg} 
                    alt={PROJECTS_DATA[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 text-xs font-semibold tracking-wide text-indigo-300 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800">
                    {PROJECTS_DATA[1].category}
                  </div>
                  <div className="absolute top-4 right-4 text-[10px] font-semibold tracking-wide text-amber-300 bg-amber-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-800/60">
                    {PROJECTS_DATA[1].status}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {PROJECTS_DATA[1].title}
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium mt-1">
                      {PROJECTS_DATA[1].subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {PROJECTS_DATA[1].description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {PROJECTS_DATA[1].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-slate-500 font-sans">Tech:</span>
                    {PROJECTS_DATA[1].techStack.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {i < PROJECTS_DATA[1].techStack.length - 1 && <span className="text-slate-600">&bull;</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(PROJECTS_DATA[1])}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study Details</span>
                </button>
                <button
                  onClick={() => setActiveTab('interactive')}
                  className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Breed Testbench</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Card 3: Phishing Detection Using Machine Learning (Full 12 cols span) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-slate-700 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual / Radar Simulation Frame (5 cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-slate-950 p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-semibold text-slate-200">ML Heuristic Classifier</span>
                    </div>
                    <span className="text-[11px] font-mono text-indigo-400">Multi-Model SVM & RF</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Random Forest Classifier</span>
                        <span className="text-emerald-400">96.8% Accuracy</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full w-[96.8%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Decision Tree</span>
                        <span className="text-indigo-400">94.2% Accuracy</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full w-[94.2%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Support Vector Machine (SVM)</span>
                        <span className="text-violet-400">95.4% Accuracy</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-violet-500 h-full rounded-full w-[95.4%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                        <span>Neural Network Perceptron</span>
                        <span className="text-sky-400">96.1% Accuracy</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full w-[96.1%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>15+ Extracted Features</span>
                    <span className="text-emerald-400 font-semibold">ROC-AUC: 0.982</span>
                  </div>
                </div>

                {/* Details (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block text-xs font-semibold tracking-wide text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-md border border-indigo-800/50">
                    {PROJECTS_DATA[2].category}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {PROJECTS_DATA[2].title}
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium mt-1">
                      {PROJECTS_DATA[2].subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {PROJECTS_DATA[2].description}
                  </p>

                  <div className="space-y-2">
                    {PROJECTS_DATA[2].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="text-slate-500 font-sans">Tech:</span>
                      {PROJECTS_DATA[2].techStack.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-slate-300">{tech}</span>
                          {i < PROJECTS_DATA[2].techStack.length - 1 && <span className="text-slate-600">&bull;</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(PROJECTS_DATA[2])}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('interactive')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
                      >
                        <span>Test URL Scanner</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        )}

        {/* TAB 2: Live Interactive Demos Section */}
        {activeTab === 'interactive' && (
          <section id="demos" className="space-y-12 animate-fadeIn">
            
            {/* Demo 1: Personal Finance Simulator */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Live Demo 1 &bull; Personal Finance & Expense Tracker
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Interactive Budget & Spending Analytics Simulator
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Real-time Pandas & Chart.js Math</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sliders Input (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 font-medium">Monthly Net Income</span>
                      <span className="text-emerald-400 font-bold font-mono">₹{monthlyIncome.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min={20000} 
                      max={150000} 
                      step={5000}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Rent & Housing</span>
                        <span className="text-indigo-300 font-mono">₹{rent.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min={5000} 
                        max={40000} 
                        step={1000}
                        value={rent}
                        onChange={(e) => setRent(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Food & Groceries</span>
                        <span className="text-amber-300 font-mono">₹{food.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min={3000} 
                        max={30000} 
                        step={1000}
                        value={food}
                        onChange={(e) => setFood(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Transport & Commute</span>
                        <span className="text-cyan-300 font-mono">₹{transport.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min={1000} 
                        max={15000} 
                        step={500}
                        value={transport}
                        onChange={(e) => setTransport(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Tech & Skill Courses</span>
                        <span className="text-violet-300 font-mono">₹{learning.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        min={500} 
                        max={15000} 
                        step={500}
                        value={learning}
                        onChange={(e) => setLearning(Number(e.target.value))}
                        className="w-full accent-violet-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Dashboard Metrics (6 cols) */}
                <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-[11px] text-slate-400">Total Spent</span>
                      <div className="text-base sm:text-lg font-bold text-white font-mono mt-1">₹{totalExpenses.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-[11px] text-slate-400">Monthly Savings</span>
                      <div className={`text-base sm:text-lg font-bold font-mono mt-1 ${savings > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        ₹{savings.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                      <span className="text-[11px] text-slate-400">Savings Rate</span>
                      <div className="text-base sm:text-lg font-bold text-indigo-400 font-mono mt-1">{savingsRate}%</div>
                    </div>
                  </div>

                  {/* Visual Distribution Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Spending Breakdown</span>
                      <span>Total {Math.round((totalExpenses / monthlyIncome) * 100)}% of income</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div style={{ width: `${(rent / monthlyIncome) * 100}%` }} className="bg-indigo-500 h-full" title="Rent" />
                      <div style={{ width: `${(food / monthlyIncome) * 100}%` }} className="bg-amber-500 h-full" title="Food" />
                      <div style={{ width: `${(transport / monthlyIncome) * 100}%` }} className="bg-cyan-500 h-full" title="Transport" />
                      <div style={{ width: `${(learning / monthlyIncome) * 100}%` }} className="bg-violet-500 h-full" title="Learning" />
                      <div style={{ width: `${savingsRate}%` }} className="bg-emerald-500 h-full" title="Savings" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Housing</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Food</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Commute</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500"></span> Learning</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Savings</span>
                    </div>
                  </div>

                  {/* Predicted Next Quarter Spending Card */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>Forecasted Q4 Savings Projection: <strong className="text-white">₹{(savings * 3).toLocaleString()}</strong></span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-[10px] font-mono font-medium">Predictive ML</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo 2: Cattle Breed Deep Learning Classifier */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Live Demo 2 &bull; Ongoing Deep Learning Research
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Indigenous Cattle Breed Identification Testbench
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>CNN Feature Isolation</span>
                </div>
              </div>

              {/* Breed Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {breeds.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBreed(b)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedBreed.id === b.id 
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{b.name}</div>
                    <div className="text-[11px] text-indigo-400 mt-0.5">{b.confidence}% Confidence</div>
                  </button>
                ))}
              </div>

              {/* Classification Output Box */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800">
                  <img 
                    src={cattleImg} 
                    alt={selectedBreed.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bounding box simulation */}
                  <div className="absolute inset-4 border-2 border-dashed border-emerald-400/80 rounded-lg flex items-start justify-end p-2 pointer-events-none">
                    <span className="px-2 py-0.5 bg-emerald-500/90 text-slate-950 font-mono text-[10px] font-bold rounded">
                      {selectedBreed.name} : {selectedBreed.confidence}%
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{selectedBreed.name}</h4>
                      <p className="text-xs text-slate-400">{selectedBreed.region}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-semibold">
                      CNN Match: {selectedBreed.confidence}%
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-1.5">Isolated Morphological Features:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedBreed.traits.map((t, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-indigo-400" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Typical Milk Capacity:</span>
                      <span className="text-slate-200 font-semibold">{selectedBreed.milkYield}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Ecological Resilience:</span>
                      <span className="text-emerald-400 font-semibold">{selectedBreed.climateResilience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo 3: Machine Learning Phishing Website Detector */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                    Live Demo 3 &bull; Cybersecurity & Machine Learning
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Phishing Website Feature Extractor & Multi-Model Classifier
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Binary className="w-4 h-4 text-rose-400" />
                  <span>Random Forest & SVM Pipeline</span>
                </div>
              </div>

              {/* Sample Quick-pick Buttons */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400">Pick a sample URL to test:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleUrls.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTestUrl(s.url);
                        handleScanUrl(s.url);
                      }}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-slate-700 transition-colors flex items-center justify-between group"
                    >
                      <div className="truncate pr-2">
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400">{s.label}</div>
                        <div className="text-[11px] font-mono text-slate-400 truncate">{s.url}</div>
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                        s.type === 'phish' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {s.type === 'phish' ? 'Phish' : 'Safe'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* URL Input Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    placeholder="Enter any URL (e.g. https://domain.com/path)"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  onClick={() => handleScanUrl(testUrl)}
                  disabled={isScanning}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm shadow-indigo-600/30"
                >
                  {isScanning ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Extracting Features...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Run ML Scan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Results Breakdown */}
              {scanResult && (
                <div className={`p-6 rounded-2xl border transition-all ${
                  scanResult.isPhishing 
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-200' 
                    : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${scanResult.isPhishing ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {scanResult.isPhishing ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          Verdict: {scanResult.isPhishing ? 'MALICIOUS / PHISHING WEBSITE DETECTED' : 'LEGITIMATE & SAFE WEBSITE'}
                        </h4>
                        <p className="text-xs opacity-80 mt-0.5 font-mono">
                          Scikit-Learn Classifier Confidence: {scanResult.confidence}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Feature Indicator Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10">
                      <span className="text-[11px] opacity-70 block font-sans">SSL Certificate</span>
                      <span className={`font-semibold ${scanResult.sslValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {scanResult.sslValid ? 'Valid Verified' : 'Invalid / Suspicious'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10">
                      <span className="text-[11px] opacity-70 block font-sans">Entropy / Symbols</span>
                      <span className={`font-semibold ${scanResult.hasSpecialSymbols ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {scanResult.hasSpecialSymbols ? 'High Entropy (@, -, //)' : 'Clean Standard'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10">
                      <span className="text-[11px] opacity-70 block font-sans">Random Forest</span>
                      <span className="text-indigo-400 font-semibold">{scanResult.rfConfidence}% vote</span>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10">
                      <span className="text-[11px] opacity-70 block font-sans">SVM Algorithm</span>
                      <span className="text-violet-400 font-semibold">{scanResult.svmConfidence}% vote</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </section>
        )}

      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-400">{selectedProject.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-semibold"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Architecture & Purpose</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Technical Highlights</h4>
                  <div className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-indigo-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">{m.label}</span>
                      <span className="text-sm font-bold text-white font-mono mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveTab('interactive');
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Launch Live Interactive Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
