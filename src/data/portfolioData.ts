export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack & Data' | 'Deep Learning & AI' | 'Cybersecurity & ML';
  status?: string;
  techStack: string[];
  description: string;
  highlights: string[];
  imagePath?: string;
  demoType: 'finance' | 'cattle' | 'phishing';
  metrics: { label: string; value: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  badge?: string;
}

export interface ActivityItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  focus: string;
  date?: string;
}

export const PERSONAL_INFO = {
  name: 'Neelambika Matagar',
  title: 'Computer Science & Design Engineer',
  roles: [
    'Computer Science & Design Engineer',
    'AI & Deep Learning Enthusiast',
    'Full-Stack Web Developer',
    'Data-Driven Problem Solver'
  ],
  phone: '+91 6363135305',
  email: 'neelambikamatagar@gmail.com',
  linkedin: 'https://linkedin.com/in/neelambika-matagar',
  linkedinHandle: 'neelambika-matagar',
  github: 'https://github.com/neelambika-matagar',
  location: 'Mangalore & Kalaburagi, Karnataka, India',
  college: "Alva's Institute of Engineering and Technology",
  degree: 'B.E. in Computer Science and Design',
  gradYear: '2027',
  cgpa: '8.00 / 10',
  bio: 'Computer Science and Design student with strong technical foundation in web development, Python, JavaScript, SQL, Flask, React.js, machine learning, and data analysis. Passionate about engineering high-impact AI/ML systems and intuitive, data-oriented software solutions.',
  languages: [
    { name: 'Kannada', level: 'Native / Bilingual' },
    { name: 'English', level: 'Professional Working' },
    { name: 'Hindi', level: 'Working Proficiency' }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'personal-finance',
    title: 'Personal Finance & Expense Tracker',
    subtitle: 'Data Analytics & Intelligent Budgeting Platform',
    category: 'Full-Stack & Data',
    techStack: ['Python Flask', 'MySQL', 'JavaScript', 'Pandas', 'Chart.js'],
    description: 'A comprehensive web application concept for managing income, personal expenses, savings goals, and financial transactions with interactive spending insights.',
    highlights: [
      'Engineered an interactive analytics dashboard for income vs. expense distribution and monthly trends.',
      'Utilized Pandas for transaction aggregation, spending categorization, and historical trend modeling.',
      'Planned real-time budget threshold alerts, financial health scores, and predictive expenditure forecasting.'
    ],
    demoType: 'finance',
    metrics: [
      { label: 'Category Insights', value: '100% Real-Time' },
      { label: 'Trend Accuracy', value: 'Monthly Aggregation' },
      { label: 'Tech Stack', value: 'Flask + MySQL + Pandas' }
    ]
  },
  {
    id: 'cattle-classification',
    title: 'AI Indigenous Cattle Breed Classification',
    subtitle: 'Deep Learning Computer Vision System',
    category: 'Deep Learning & AI',
    status: 'Ongoing Research Project',
    techStack: ['Python', 'Deep Learning', 'PyTorch / CNN', 'OpenCV', 'Pandas'],
    description: 'An AI-powered computer vision research initiative focused on recognizing and classifying indigenous Indian cattle breeds to support agricultural biodiversity and automated breed preservation.',
    highlights: [
      'Developing convolutional neural network (CNN) architectures tailored for recognizing distinct morphological traits of indigenous breeds.',
      'Engineering an image preprocessing pipeline including data augmentation, contrast normalization, and feature isolation.',
      'Working toward an automated identification tool for farmers, veterinarians, and conservation agencies.'
    ],
    demoType: 'cattle',
    metrics: [
      { label: 'Target Breeds', value: 'Indigenous Varieties' },
      { label: 'Methodology', value: 'Deep CNN Transfer' },
      { label: 'Status', value: 'Active Development' }
    ]
  },
  {
    id: 'phishing-detection',
    title: 'Phishing Website Detection',
    subtitle: 'Machine Learning Security Classification Engine',
    category: 'Cybersecurity & ML',
    techStack: ['Python', 'Machine Learning', 'Scikit-learn', 'Random Forest', 'SVM'],
    description: 'A robust machine learning classification system trained to distinguish fraudulent phishing web URLs from legitimate websites based on heuristic and structural attributes.',
    highlights: [
      'Extracted and engineered critical feature vectors: URL character entropy, symbol frequency (@, //, -), domain age, and SSL certificate validity.',
      'Trained and benchmarked multi-model classifiers including Decision Trees, Random Forests, Support Vector Machines (SVM), and Neural Networks.',
      'Evaluated performance using rigorous accuracy, precision, and recall metrics to minimize false positives for end-user protection.'
    ],
    demoType: 'phishing',
    metrics: [
      { label: 'Model Evaluation', value: '96.4% Precision' },
      { label: 'Feature Extraction', value: '15+ URL Heuristics' },
      { label: 'Algorithms Benchmarked', value: 'RF, SVM, NN, DT' }
    ]
  }
];

export const SKILLS_DATA = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90, note: 'Data analysis, ML algorithms, scripting' },
      { name: 'JavaScript', level: 85, note: 'Modern ES6+, DOM manipulation, async' },
      { name: 'SQL', level: 82, note: 'Relational querying, schema design, joins' },
      { name: 'HTML5 & CSS3', level: 92, note: 'Responsive design, semantic structure' }
    ]
  },
  {
    category: 'Web Development & Frameworks',
    skills: [
      { name: 'React.js', level: 85, note: 'Components, state hooks, modern SPA' },
      { name: 'Flask (Python)', level: 80, note: 'REST APIs, routing, backend services' },
      { name: 'MySQL', level: 82, note: 'Database optimization, transactions' },
      { name: 'Tailwind CSS', level: 88, note: 'Utility-first layout, responsive UI' }
    ]
  },
  {
    category: 'AI / Machine Learning & Data',
    skills: [
      { name: 'Machine Learning', level: 85, note: 'Supervised learning, classification, evaluation' },
      { name: 'Deep Learning', level: 78, note: 'Neural networks, CNNs, image features' },
      { name: 'Data Analysis & Pandas', level: 88, note: 'Data cleaning, feature engineering, aggregation' },
      { name: 'NumPy & Scikit-learn', level: 82, note: 'Model pipelines, metrics computation' }
    ]
  },
  {
    category: 'Tools & Core Foundations',
    skills: [
      { name: 'Git & GitHub', level: 86, note: 'Version control, branch management' },
      { name: 'VS Code & Jupyter', level: 90, note: 'Productive development & prototyping' },
      { name: 'Figma', level: 80, note: 'UI/UX wireframing, interface design' },
      { name: 'Data Structures & OOP', level: 85, note: 'Object-oriented programming, algorithms' }
    ]
  },
  {
    category: 'Professional Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 92, note: 'Algorithmic logic, debugging' },
      { name: 'Analytical Thinking', level: 90, note: 'Data-driven decision making' },
      { name: 'Teamwork & Collaboration', level: 88, note: 'NSS member, hackathon teams' },
      { name: 'Communication & Adaptability', level: 86, note: 'Event coordination, presentation' }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Alva's Institute of Engineering and Technology",
    degree: 'B.E. in Computer Science and Design',
    location: 'Mangalore, Karnataka',
    period: '2023 – 2027',
    grade: 'CGPA: 8.00 / 10',
    description: 'Pursuing specialized undergraduate studies at the intersection of computer engineering, intelligent systems, and interactive UI/UX design. Active participant in technical hackathons and academic forums.',
    badge: 'Current Degree'
  },
  {
    institution: 'Doddaappa Appa Science PUC Residential College',
    degree: 'Pre-University Course (PUC - Science)',
    location: 'Kalaburagi, Karnataka',
    period: '2021 – 2023',
    description: 'Rigorous pre-university scientific curriculum with focus on Physics, Chemistry, Mathematics, and Computer Science fundamentals.',
    badge: 'Pre-University'
  },
  {
    institution: 'Shree Guru Vidya Peetha',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    location: 'Kalaburagi, Karnataka',
    period: 'Completed 2021',
    description: 'Distinguished secondary school education fostering analytical discipline and mathematics foundation.',
    badge: 'Secondary School'
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    name: 'Machine Learning with Python',
    issuer: 'Professional Course Credential',
    focus: 'Model training, regression, classification, and evaluation metrics.'
  },
  {
    name: 'Introduction to Artificial Intelligence',
    issuer: 'AI Foundations Program',
    focus: 'Heuristic search, knowledge representation, and intelligent agent principles.'
  },
  {
    name: 'Infosys Springboard Certification',
    issuer: 'Infosys Springboard',
    focus: 'Industry-aligned software engineering and modern technology paradigms.'
  },
  {
    name: 'Computer Networks and Network Security',
    issuer: 'Networking Fundamentals',
    focus: 'TCP/IP stack, routing protocols, cryptography, and network defense.'
  },
  {
    name: 'English for Career Development',
    issuer: 'Career Advancement',
    focus: 'Professional communication, executive writing, and technical presentation.'
  }
];

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    title: 'Hackathon & Ideathon Competitor',
    organization: 'Technical Engineering Forums',
    period: '2023 – Present',
    description: 'Participated in intense hackathons and ideathon events, architecting and prototyping software solutions under time constraints while applying algorithmic problem-solving.',
    skills: ['Rapid Prototyping', 'Team Coordination', 'Pitching', 'System Design']
  },
  {
    title: 'Active NSS Member (National Service Scheme)',
    organization: 'Youth & Community Development',
    period: '2023 – Present',
    description: 'Actively participating in community welfare drives, blood donation camps, environmental initiatives, and rural engagement to develop leadership and social responsibility.',
    skills: ['Leadership', 'Social Responsibility', 'Public Outreach', 'Teamwork']
  },
  {
    title: 'Technical Training Graduate',
    organization: 'E-Box & Placevalue Platforms',
    period: 'Specialized Training',
    description: 'Completed comprehensive hands-on programming challenges, automated code evaluation tests, and algorithmic optimization modules.',
    skills: ['Algorithm Efficiency', 'Data Structures', 'Coding Speed']
  },
  {
    title: 'Event Coordinator & Organizer',
    organization: 'College Campus Initiatives',
    period: '2023 – Present',
    description: 'Organized and managed student engagement events and technical workshops, coordinating logistics, stage management, and cross-functional team communication.',
    skills: ['Event Management', 'Public Speaking', 'Logistics Planning']
  }
];
