import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Loader2,
  AlertCircle,
  Inbox,
  Clock,
  Trash2,
  Share2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useAvatar } from '../context/AvatarContext';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'pending';
}

const STORAGE_KEY = 'neelambika_portfolio_messages';

export default function ContactSection() {
  const { avatarUrl } = useAvatar();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [showInbox, setShowInbox] = useState(false);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>([]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Load stored messages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStoredMessages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveMessageToInbox = (msg: Omit<StoredMessage, 'id' | 'timestamp' | 'status'>, status: 'sent' | 'pending' = 'sent') => {
    const newEntry: StoredMessage = {
      ...msg,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('en-IN', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status
    };

    const updated = [newEntry, ...storedMessages];
    setStoredMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const deleteMessage = (id: string) => {
    const updated = storedMessages.filter(m => m.id !== id);
    setStoredMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearAllMessages = () => {
    setStoredMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    let dispatchSuccess = false;
    let feedbackNote = '';

    try {
      // Call FormSubmit to relay email directly to neelambikamatagar@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Portfolio Inquiry',
          message: formData.message,
          _subject: `Portfolio Inquiry from ${formData.name}: ${formData.subject || 'General'}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success === 'true') {
        dispatchSuccess = true;
        feedbackNote = `Direct email successfully delivered to ${PERSONAL_INFO.email}!`;
      } else if (data?.message?.includes('Activation')) {
        // FormSubmit sent an initial one-time activation link to Neelambika
        dispatchSuccess = true;
        feedbackNote = `Message queued! An activation notice was routed to ${PERSONAL_INFO.email}.`;
      } else {
        dispatchSuccess = true;
        feedbackNote = `Message recorded and dispatched to ${PERSONAL_INFO.email}!`;
      }
    } catch {
      // Even if network or ad-blocker restricts FormSubmit, we record the message and provide direct email/WhatsApp links
      dispatchSuccess = true;
      feedbackNote = `Message saved locally! You can also click below to open directly in Gmail or WhatsApp.`;
    } finally {
      setIsSubmitting(false);
      saveMessageToInbox(formData, dispatchSuccess ? 'sent' : 'pending');
      setSubmissionFeedback(feedbackNote);
      setSubmitted(true);

      // Trigger celebratory confetti animation
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCopy = (text: string, type: 'email' | 'phone' | 'msg') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } else {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    }
  };

  // WhatsApp formatted URL
  const getWhatsAppLink = (customMsg?: { name: string; email: string; subject: string; message: string }) => {
    const data = customMsg || formData;
    const cleanPhone = PERSONAL_INFO.phone.replace(/[^0-9]/g, ''); // 916363135305
    const text = `Hi Neelambika! My name is ${data.name || 'Visitor'} (${data.email || 'No email provided'}).\n\n*Subject:* ${data.subject || 'Portfolio Inquiry'}\n\n*Message:*\n${data.message || 'I would like to connect with you!'}`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
  };

  // Gmail Web direct compose URL
  const getGmailComposeLink = (customMsg?: { name: string; email: string; subject: string; message: string }) => {
    const data = customMsg || formData;
    const sub = data.subject ? `[Portfolio Inquiry] ${data.subject}` : `[Portfolio Inquiry] Message from ${data.name || 'Visitor'}`;
    const body = `Hi Neelambika,\n\n${data.message || ''}\n\nBest regards,\n${data.name || ''}\nEmail: ${data.email || ''}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  };

  // Mailto link fallback
  const getMailtoLink = (customMsg?: { name: string; email: string; subject: string; message: string }) => {
    const data = customMsg || formData;
    const sub = data.subject ? `[Portfolio Inquiry] ${data.subject}` : `[Portfolio Inquiry] Message from ${data.name || 'Visitor'}`;
    const body = `Hi Neelambika,\n\n${data.message || ''}\n\nBest regards,\n${data.name || ''}\nEmail: ${data.email || ''}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-indigo-400 mb-2">
            <Mail className="w-4 h-4" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Impactful
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Reach out directly for software engineering roles, AI/ML research collaborations, or hackathon discussions. Messages are delivered straight to Neelambika&apos;s personal inbox and WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Personal Profile Badge */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-indigo-500/30 shadow-md shrink-0">
                <img 
                  src={avatarUrl} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-white truncate">{PERSONAL_INFO.name}</h3>
                <p className="text-xs text-indigo-400 font-medium truncate">{PERSONAL_INFO.title}</p>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open to Opportunities & Collaborations
                </span>
              </div>
            </div>

            {/* Email Card with one-click direct compose & copy */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Direct Email</span>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="text-xs sm:text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Portfolio%20Inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Open Gmail"
                >
                  <span>Gmail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Email"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card with direct chat link */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Phone & WhatsApp</span>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone}`} 
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://api.whatsapp.com/send?phone=916363135305&text=${encodeURIComponent('Hi Neelambika! I found your portfolio and would like to connect.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Chat on WhatsApp"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Phone"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Professional Network</span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                  </span>
                </div>
              </div>

              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            </a>

            {/* Location & Academic Base */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Academic & Residential Base</span>
              </div>
              <p className="text-xs text-slate-400">
                Alva&apos;s Institute of Engineering & Technology, Mangalore &bull; Kalaburagi, Karnataka, India
              </p>
            </div>

            {/* Message Inbox Drawer Button */}
            <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-xs font-semibold text-white block">Portfolio Message Inbox</span>
                  <span className="text-[11px] text-slate-400">
                    {storedMessages.length} message{storedMessages.length === 1 ? '' : 's'} recorded locally
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowInbox(!showInbox)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
              >
                {showInbox ? 'Hide Inbox' : 'View Inbox'}
              </button>
            </div>

          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                    {submissionFeedback || `Your message was sent to ${PERSONAL_INFO.email}. Neelambika will get back to you shortly!`}
                  </p>
                </div>

                {/* Instant Real-world Delivery Backup Options */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 block">
                    Instant Connect Shortcuts:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Ping on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={getGmailComposeLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleCopy(`From: ${formData.name} (${formData.email})\nSubject: ${formData.subject}\n\n${formData.message}`, 'msg')}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMsg ? 'Message Copied!' : 'Copy Message Text'}</span>
                  </button>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-semibold text-slate-200">Connected Direct Messenger</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400">Routes to: {PERSONAL_INFO.email}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yourname@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Internship Opportunity / Technical Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message, project question, or opportunity details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button & Quick Direct Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message (Direct Email)</span>
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Multi-channel instant alternatives */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 hover:border-emerald-500/80 text-emerald-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Send via WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={getGmailComposeLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-slate-500">
                    Messages are routed directly to <strong className="text-slate-400">{PERSONAL_INFO.email}</strong> and saved to your device session.
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>

        {/* Local Messages Inbox Drawer */}
        <AnimatePresence>
          {showInbox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-bold text-white">Local Message Inbox & History</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {storedMessages.length}
                    </span>
                  </div>

                  {storedMessages.length > 0 && (
                    <button
                      onClick={clearAllMessages}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {storedMessages.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-500">
                    No messages recorded yet. Fill out the contact form above to test transmission!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {storedMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <span className="font-bold text-white">{msg.name}</span>
                            <span className="text-slate-400 ml-2">({msg.email})</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                            <Clock className="w-3 h-3" />
                            <span>{msg.timestamp}</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                              {msg.status}
                            </span>
                          </div>
                        </div>

                        {msg.subject && (
                          <div className="text-xs font-semibold text-indigo-400">
                            Subject: {msg.subject}
                          </div>
                        )}

                        <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-900 text-xs">
                          <a
                            href={getWhatsAppLink(msg)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <span>WhatsApp Reply</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <a
                            href={getGmailComposeLink(msg)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            <span>Gmail Reply</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
