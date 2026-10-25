import React, { useState } from 'react';
import { Search, X, ArrowRight, CheckCircle2, Mail, HelpCircle, BookOpen, Layers } from 'lucide-react';
import { LabTab } from '../../types';

interface SearchAndUtilityModalsProps {
  activeModal: 'search' | 'support' | 'newsletter' | null;
  onClose: () => void;
  onSelectTab: (tab: LabTab) => void;
}

export const SearchAndUtilityModals: React.FC<SearchAndUtilityModalsProps> = ({
  activeModal,
  onClose,
  onSelectTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const [supportName, setSupportName] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [supportDone, setSupportDone] = useState(false);

  if (!activeModal) return null;

  const searchableItems: { title: string; category: string; tab: LabTab; desc: string }[] = [
    { title: 'Function & Graphing Studio', category: 'Laboratory', tab: 'graphing', desc: '2D Cartesian plotter, derivatives, tangent lines & integrals' },
    { title: 'Geometry & Unit Circle', category: 'Laboratory', tab: 'geometry', desc: 'Interactive unit circle, trigonometry projections & triangle solver' },
    { title: 'Calculus & Riemann Sandbox', category: 'Laboratory', tab: 'calculus', desc: 'Riemann sums convergence, Taylor polynomials & limits' },
    { title: 'Linear Algebra Grid', category: 'Laboratory', tab: 'linear-algebra', desc: '2D Matrix transformations, determinant area & eigenvalues' },
    { title: 'Statistics & Probability Lab', category: 'Laboratory', tab: 'probability', desc: 'Normal/Binomial distributions & Buffon π estimation' },
    { title: 'Number Theory & Discrete Math', category: 'Laboratory', tab: 'discrete', desc: 'Prime factorization sieve, Euclidean GCD & modular clock' },
    { title: 'Student Learning Center & Pathways', category: 'Education', tab: 'education', desc: 'Guided curriculum pathways, conceptual quizzes & downloadable cheat sheets' },
    { title: 'Formula Reference Handbook', category: 'Handbook', tab: 'formulas', desc: 'Full indexed list of mathematical definitions and formulas' },
    { title: 'Daily Problem Challenges', category: 'Challenges', tab: 'challenges', desc: 'Test and sharpen your reasoning with daily problem sets' },
    { title: 'Lab Scratchpad & Notebook', category: 'Workspace', tab: 'notebook', desc: 'Expression calculator and persistent local storage notes' },
    { title: 'About Math Lab (Non-Profit)', category: 'About', tab: 'about', desc: 'Educational non-profit mission, platform architecture & Apache-2.0 license' },
  ];

  const filtered = searchableItems.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#ded5c5] shadow-2xl p-6 text-[#182029]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#667085] hover:text-[#182029] rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Modal */}
        {activeModal === 'search' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#182029] font-serif-editorial">
              <Search className="w-4 h-4 text-[#0077c8]" />
              <span>Search Math Lab</span>
            </div>

            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search labs, formulas, topics (e.g. calculus, matrix, primes)..."
                className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-xl px-4 py-2.5 text-sm text-[#182029] focus:outline-none focus:border-[#0077c8]"
              />
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pt-2">
              {filtered.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#98a2b3]">
                  No matching tools found for "{searchTerm}"
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      onSelectTab(item.tab);
                      onClose();
                    }}
                    className="p-3 bg-[#faf7f2] hover:bg-[#f0e8db] rounded-xl cursor-pointer transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#182029] group-hover:text-[#0077c8] transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white border border-[#ded5c5] text-[#0077c8]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#667085] mt-0.5">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#98a2b3] group-hover:text-[#0077c8] group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Newsletter Signup Modal */}
        {activeModal === 'newsletter' && (
          <div className="space-y-4 py-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4a044e] flex items-center justify-center mb-1">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold font-serif-editorial text-[#182029]">
              Math Lab Monthly Newsletter
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Receive new interactive problem sets, geometry invariant breakthroughs, and open-source platform updates directly in your inbox.
            </p>

            {newsletterDone ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Thank you!</strong> You're on the list. Check your email for updates.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterDone(true);
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="text-xs font-semibold text-[#475467] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-xl px-3.5 py-2 text-xs text-[#182029] focus:outline-none focus:border-[#4a044e]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4a044e] hover:bg-[#38033b] text-white font-semibold text-xs rounded-xl shadow-xs transition"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            )}
          </div>
        )}

        {/* Support Modal */}
        {activeModal === 'support' && (
          <div className="space-y-4 py-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0077c8] flex items-center justify-center mb-1">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold font-serif-editorial text-[#182029]">
              Contact Math Lab Support
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Have questions about an interactive simulation, curriculum alignment, or open-source contribution? Send our engineering team a note.
            </p>

            {supportDone ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Message received!</strong> Our support team will get back to you shortly.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (supportMsg) setSupportDone(true);
                }}
                className="space-y-3 pt-1 text-xs"
              >
                <div>
                  <label className="font-semibold text-[#475467] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={supportName}
                    onChange={(e) => setSupportName(e.target.value)}
                    placeholder="Emily Bu / Student"
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-xl px-3 py-2 text-[#182029] focus:outline-none focus:border-[#0077c8]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#475467] block mb-1">How can we help?</label>
                  <textarea
                    rows={3}
                    required
                    value={supportMsg}
                    onChange={(e) => setSupportMsg(e.target.value)}
                    placeholder="Describe your question or issue..."
                    className="w-full bg-[#faf7f2] border border-[#d0c6b4] rounded-xl p-3 text-[#182029] focus:outline-none focus:border-[#0077c8]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-semibold text-xs rounded-xl shadow-xs transition"
                >
                  Send Support Request
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
