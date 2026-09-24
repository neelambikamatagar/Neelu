import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EDUCATION_DATA, 
  PROJECTS_DATA, 
  SKILLS_DATA, 
  CERTIFICATIONS_DATA, 
  ACTIVITIES_DATA 
} from '../data/portfolioData';
import { useAvatar } from '../context/AvatarContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const { avatarUrl } = useAvatar();

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
NEELAMBIKA MATAGAR
${PERSONAL_INFO.phone} — ${PERSONAL_INFO.email} — ${PERSONAL_INFO.linkedin}

CAREER OBJECTIVE
${PERSONAL_INFO.bio}

EDUCATION
1. ${EDUCATION_DATA[0].institution} (2023 – 2027)
   ${EDUCATION_DATA[0].degree} — ${EDUCATION_DATA[0].location}
   ${EDUCATION_DATA[0].grade}
2. ${EDUCATION_DATA[1].institution} (2021 – 2023)
   ${EDUCATION_DATA[1].degree} — ${EDUCATION_DATA[1].location}
3. ${EDUCATION_DATA[2].institution} (Completed 2021)
   ${EDUCATION_DATA[2].degree} — ${EDUCATION_DATA[2].location}

TECHNICAL SKILLS
• Programming: Python, JavaScript
• Web Development: HTML5, CSS3, JavaScript, React.js, Flask
• Database: SQL, MySQL
• AI / ML & Data: Machine Learning, Data Analysis, Pandas
• Tools: Git, GitHub, VS Code, Figma
• Core Concepts: Object-Oriented Programming, DBMS, Data Structures
• Soft Skills: Problem Solving, Analytical Thinking, Communication, Teamwork, Adaptability

PROJECTS
1. Personal Finance & Expense Tracker with Data Analytics
   Tech: Python Flask, MySQL, JavaScript, Pandas, Chart.js
   - Web application concept for managing income, expenses, budgets, savings, and financial transactions.
   - Designed a dashboard for income vs. expense analysis, category-wise spending, monthly trends, and budget tracking.
   - Planned budget alerts, financial insights, monthly reports, and expense prediction using historical spending data.

2. AI-Based Indigenous Cattle Breed Classification Using Deep Learning (Ongoing Project)
   - Developing an AI/ML project focused on classifying indigenous cattle breeds using deep learning techniques.
   - Working toward image-based breed classification to support automated identification of indigenous cattle breeds.

3. Phishing Detection Using Machine Learning
   Tech: Python, Machine Learning
   - Developed a machine learning approach to distinguish phishing websites from legitimate websites.
   - Prepared phishing and legitimate website data and extracted features such as URL length, special symbols, domain age, and SSL-related information.
   - Explored Decision Tree, Random Forest, SVM, and Neural Network algorithms and evaluated performance using accuracy, precision, and recall.

CERTIFICATIONS & COURSES
• Machine Learning with Python
• Introduction to Artificial Intelligence
• Computer Networks and Network Security
• English for Career Development
• Infosys Springboard Certification

TRAINING & ACTIVITIES
• Completed technical training through E-Box and Placevalue.
• Participated in Ideathon and Hackathon events, applying programming, analytical, and problem-solving skills.
• Actively involved as an NSS member, developing leadership, teamwork, and social responsibility skills.
• Organized and coordinated college events, strengthening communication and collaboration skills.

LANGUAGES
Kannada, English, Hindi
`.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Action Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-slate-200">Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Plaintext</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans print:p-0">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Resume Header with photo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  {PERSONAL_INFO.title} &bull; {PERSONAL_INFO.degree}
                </p>
                <div className="text-xs text-slate-700 flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 font-medium">
                  <span>{PERSONAL_INFO.phone}</span>
                  <span>&bull;</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-indigo-700 hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                  <span>&bull;</span>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                    linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                  </a>
                </div>
              </div>

              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-sm shrink-0">
                <img 
                  src={avatarUrl} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Career Objective */}
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Career Objective
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {PERSONAL_INFO.bio}
              </p>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Education
              </h2>
              
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Alva’s Institute of Engineering and Technology</span>
                    <span className="font-mono">2023 – 2027</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>B.E. in Computer Science and Design</span>
                    <span>Mangalore, Karnataka</span>
                  </div>
                  <div className="font-semibold text-indigo-700">CGPA: 8.00 / 10</div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Doddaappa Appa Science PUC Residential College</span>
                    <span className="font-mono">2023</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Pre-University Course</span>
                    <span>Kalaburagi, Karnataka</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Shree Guru Vidya Peetha</span>
                    <span className="font-mono">2021</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>SSLC</span>
                    <span>Kalaburagi, Karnataka</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 gap-1 text-xs text-slate-800">
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Programming:</span> Python, JavaScript</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Web Development:</span> HTML5, CSS3, JavaScript, React.js, Flask</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Database:</span> SQL, MySQL</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">AI / ML & Data:</span> Machine Learning, Data Analysis, Pandas</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Tools:</span> Git, GitHub, VS Code, Figma</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Core Concepts:</span> Object-Oriented Programming, DBMS, Data Structures</div>
                <div><span className="font-semibold text-slate-900 w-36 inline-block">Soft Skills:</span> Problem Solving, Analytical Thinking, Communication, Teamwork, Adaptability</div>
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Projects
              </h2>

              {/* Project 1 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Personal Finance & Expense Tracker with Data Analytics</span>
                  <span className="text-[11px] font-normal italic text-slate-600">Python Flask, MySQL, JavaScript, Pandas, Chart.js</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700">
                  <li>Developed a web application concept for managing income, expenses, budgets, savings, and financial transactions.</li>
                  <li>Designed a dashboard for income vs. expense analysis, category-wise spending, monthly trends, and budget tracking.</li>
                  <li>Planned budget alerts, financial insights, monthly reports, and expense prediction using historical spending data.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>AI-Based Indigenous Cattle Breed Classification Using Deep Learning</span>
                  <span className="text-[11px] font-semibold text-indigo-700">Ongoing Project</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700">
                  <li>Developing an AI/ML project focused on classifying indigenous cattle breeds using deep learning techniques.</li>
                  <li>Working toward image-based breed classification to support automated identification of indigenous cattle breeds.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Phishing Detection Using Machine Learning</span>
                  <span className="text-[11px] font-normal italic text-slate-600">Python, Machine Learning</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-slate-700">
                  <li>Developed a machine learning approach to distinguish phishing websites from legitimate websites.</li>
                  <li>Prepared phishing and legitimate website data and extracted features such as URL length, special symbols, domain age, and SSL-related information.</li>
                  <li>Explored Decision Tree, Random Forest, SVM, and Neural Network algorithms and evaluated performance using accuracy, precision, and recall.</li>
                </ul>
              </div>
            </section>

            {/* Certifications & Courses */}
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Certifications & Courses
              </h2>
              <ul className="list-disc list-outside pl-4 text-xs space-y-0.5 text-slate-800">
                <li>Machine Learning with Python</li>
                <li>Introduction to Artificial Intelligence</li>
                <li>Computer Networks and Network Security</li>
                <li>English for Career Development</li>
                <li>Infosys Springboard Certification</li>
              </ul>
            </section>

            {/* Training & Activities */}
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Training & Activities
              </h2>
              <ul className="list-disc list-outside pl-4 text-xs space-y-0.5 text-slate-800">
                <li>Completed technical training through E-Box and Placevalue.</li>
                <li>Participated in Ideathon and Hackathon events, applying programming, analytical, and problem-solving skills.</li>
                <li>Actively involved as an NSS member, developing leadership, teamwork, and social responsibility skills.</li>
                <li>Organized and coordinated college events, strengthening communication and collaboration skills.</li>
              </ul>
            </section>

            {/* Languages */}
            <section className="space-y-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Languages
              </h2>
              <p className="text-xs text-slate-800">Kannada, English, Hindi</p>
            </section>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
