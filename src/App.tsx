import React, { useState, useEffect, useRef } from 'react';
import { LabTab, UserProgressMap } from './types';
import { 
  getStoredProgress, 
  recordLabInteraction, 
  toggleLabCompletion, 
  getProgressSummary, 
  formatTimeAgo, 
  SIMULATION_LAB_IDS 
} from './utils/progress';
import { TopUtilityBar } from './components/navigation/TopUtilityBar';
import { MainNavigation } from './components/navigation/MainNavigation';
import { SearchAndUtilityModals } from './components/navigation/SearchAndUtilityModals';
import { LoginModal } from './components/auth/LoginModal';
import { BoldHero } from './components/landing/BoldHero';
import { ChordsExploration } from './components/landing/ChordsExploration';
import { SchurSection } from './components/landing/SchurSection';
import { LaboratoriesHub } from './components/labs/LaboratoriesHub';
import { GraphingLab } from './components/labs/GraphingLab';
import { GeometryLab } from './components/labs/GeometryLab';
import { CalculusLab } from './components/labs/CalculusLab';
import { LinearAlgebraLab } from './components/labs/LinearAlgebraLab';
import { ProbabilityLab } from './components/labs/ProbabilityLab';
import { DiscreteMathLab } from './components/labs/DiscreteMathLab';
import { FormulaReference } from './components/FormulaReference';
import { DailyChallenge } from './components/DailyChallenge';
import { LabNotebook } from './components/LabNotebook';
import { AboutSection } from './components/AboutSection';
import { StudentLearningHub } from './components/education/StudentLearningHub';
import { CompletionCheckbox } from './components/common/CompletionCheckbox';
import { CertificateModal } from './components/certificate/CertificateModal';
import { 
  ArrowLeft, 
  ChevronRight, 
  Activity, 
  CircleDot, 
  Layers, 
  Grid, 
  Compass, 
  Binary, 
  BookOpen, 
  Award, 
  FileText, 
  Shield, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  User, 
  Sparkles, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<LabTab>('overview');
  const [user, setUser] = useState<{ email: string; name: string; role?: string } | null>(null);
  const [progress, setProgress] = useState<UserProgressMap>({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [utilityModal, setUtilityModal] = useState<'search' | 'support' | 'newsletter' | null>(null);
  const [certificateModal, setCertificateModal] = useState<{ isOpen: boolean; labId: LabTab | 'all' }>({
    isOpen: false,
    labId: 'all',
  });

  const explorationRef = useRef<HTMLDivElement | null>(null);

  // Initialize user from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('math_lab_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setProgress(getStoredProgress(parsed.email));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Sync progress when user changes
  useEffect(() => {
    if (user?.email) {
      setProgress(getStoredProgress(user.email));
    } else {
      setProgress({});
    }
  }, [user]);

  // Record interaction whenever user navigates to an individual lab
  useEffect(() => {
    if (user?.email && SIMULATION_LAB_IDS.includes(currentTab)) {
      const updated = recordLabInteraction(user.email, currentTab);
      setProgress(updated);
    }
  }, [currentTab, user]);

  const handleLogout = () => {
    localStorage.removeItem('math_lab_user');
    setUser(null);
    setProgress({});
  };

  const handleToggleComplete = (labId: LabTab) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    const nextProgress = toggleLabCompletion(user.email, labId);
    setProgress(nextProgress);
  };

  const scrollToExploration = () => {
    if (currentTab !== 'overview') {
      setCurrentTab('overview');
      setTimeout(() => {
        explorationRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      explorationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageTitles: Record<LabTab, string> = {
    overview: 'Overview',
    laboratories: 'All Laboratories Hub',
    education: 'Student Learning Center & Guided Pathways',
    graphing: 'Function & Graphing Studio',
    geometry: 'Geometry & Unit Circle',
    calculus: 'Calculus & Riemann Sandbox',
    'linear-algebra': 'Linear Algebra Grid',
    probability: 'Statistics & Probability Lab',
    discrete: 'Number Theory & Discrete Math',
    formulas: 'Formula Reference Library',
    challenges: 'Daily Math Challenge',
    notebook: 'Lab Notebook & Scratchpad',
    about: 'About Math Lab (Non-Profit)',
  };

  const isLabView = SIMULATION_LAB_IDS.includes(currentTab);
  const summary = getProgressSummary(progress);

  const labCatalog = [
    { id: 'graphing' as LabTab, num: '01', title: 'Function & Graphing Studio', desc: '2D Cartesian plotter, numerical derivatives, tangent equations & Riemann areas.', icon: Activity, color: 'text-sky-600 bg-sky-50' },
    { id: 'geometry' as LabTab, num: '02', title: 'Geometry & Unit Circle', desc: 'Continuous angle unit circle, live trigonometric projections, and SSS triangle solver.', icon: CircleDot, color: 'text-amber-600 bg-amber-50' },
    { id: 'calculus' as LabTab, num: '03', title: 'Calculus & Riemann Sandbox', desc: 'Partition convergence rules (Left, Right, Midpoint, Trapezoid) and Taylor series expansions.', icon: Layers, color: 'text-purple-600 bg-purple-50' },
    { id: 'linear-algebra' as LabTab, num: '04', title: 'Linear Algebra Grid', desc: 'Visual coordinate plane deformation under 2x2 matrices, determinant signed area & eigenvalues.', icon: Grid, color: 'text-blue-600 bg-blue-50' },
    { id: 'probability' as LabTab, num: '05', title: 'Statistics & Probability Lab', desc: 'Normal Gaussian bell curves, Binomial distributions, and Monte Carlo Buffon’s needle π estimation.', icon: Compass, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'discrete' as LabTab, num: '06', title: 'Number Theory & Discrete Math', desc: 'Sieve of Eratosthenes prime grid, step-by-step Euclidean algorithm GCD & modular clock.', icon: Binary, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-800 flex flex-col font-sans selection:bg-[#0077c8]/20 selection:text-slate-900">
      {/* 1. Deep Royal Purple Top Utility Bar (NMSI reference style) */}
      <TopUtilityBar
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenSearch={() => setUtilityModal('search')}
        onOpenSupport={() => setUtilityModal('support')}
        onOpenNewsletter={() => setUtilityModal('newsletter')}
        onOpenCertificate={() => setCertificateModal({ isOpen: true, labId: 'all' })}
      />

      {/* 2. Bold Clean White Main Navigation Bar with Pill Action */}
      <MainNavigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onScrollToExploration={scrollToExploration}
      />

      {/* 3. Main Views Router */}
      {currentTab === 'overview' ? (
        <div className="flex-1 flex flex-col">
          {/* Bold Hero with angled color slices & live harmonic wave preview */}
          <BoldHero
            onSelectTab={setCurrentTab}
            onScrollToExploration={scrollToExploration}
          />

          {/* Interactive AIME Two Chords Exploration (User loved this invariant) */}
          <div ref={explorationRef}>
            <ChordsExploration />
          </div>

          {/* Schur's Inequality Section (Live dynamic algebraic boundary invariant) */}
          <SchurSection />

          {/* Featured Laboratories Suite Preview Section with User Progress */}
          <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-[#0077c8] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Interactive Suites</span>
                  </div>
                  <h2 className="font-display-bold text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Tactile Mathematical Laboratories
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                    Rather than memorizing dry static formulas, step inside living simulations. Test limits, warp coordinate spaces, inspect trigonometric projections, and verify hypotheses in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setCurrentTab('laboratories')}
                    className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#0077c8] hover:bg-[#005fa3] rounded-full transition shadow-sm flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>View All 6 Labs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentTab('formulas')}
                    className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#0077c8]" />
                    <span>Handbook</span>
                  </button>
                </div>
              </div>

              {/* Logged-in Progress Overview Strip */}
              {user ? (
                <div className="bg-[#faf7f2] border border-slate-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#4a044e]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs uppercase text-slate-500 tracking-wider">
                            Progress Tracker:
                          </span>
                          <span className="font-bold text-sm text-slate-900">
                            {user.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          {summary.completed} of 6 Completed ({summary.percentage}%) &bull; {summary.inProgress} In Progress
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="w-full sm:w-40 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#0077c8] to-emerald-500 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.max(summary.percentage, 4)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs text-[#0077c8] shrink-0">
                        {summary.percentage}%
                      </span>
                      {summary.completed > 0 && (
                        <button
                          onClick={() => setCertificateModal({ isOpen: true, labId: 'all' })}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-2xs shrink-0"
                          title="Generate official completion certificate"
                        >
                          <Award className="w-3.5 h-3.5 text-slate-950" />
                          <span>Certificate ({summary.completed}/6)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <User className="w-4 h-4 text-[#0077c8]" />
                    <span>
                      <strong>Progress Tracking Enabled:</strong> Sign in with a student or faculty account to track completed simulations and monitor your learning journey.
                    </span>
                  </div>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="font-bold text-[#0077c8] hover:underline shrink-0"
                  >
                    Sign In to Track →
                  </button>
                </div>
              )}

              {/* Lab Cards Grid with live completion badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {labCatalog.map((lab) => {
                  const Icon = lab.icon;
                  const rec = progress[lab.id];
                  const isCompleted = rec?.status === 'completed';
                  const isInProgress = rec?.status === 'in_progress';
                  const lastActive = rec?.lastInteractedAt ? formatTimeAgo(rec.lastInteractedAt) : null;

                  return (
                    <div
                      key={lab.id}
                      onClick={() => setCurrentTab(lab.id)}
                      className={`group cursor-pointer bg-white rounded-2xl border p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between hover:shadow-xl ${
                        isCompleted 
                          ? 'border-emerald-300 ring-1 ring-emerald-400/20 shadow-xs' 
                          : 'border-slate-200 hover:border-[#0077c8]/50 shadow-xs'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                            LAB {lab.num}
                          </span>

                          {/* Progress Status Pill */}
                          {user ? (
                            <div>
                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                                  <span>Completed</span>
                                </span>
                              ) : isInProgress ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                                  <Clock className="w-3 h-3 text-sky-600" />
                                  <span>In Progress</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500">
                                  <span>Not Started</span>
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${lab.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-start gap-3">
                          {user && (
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isCompleted ? 'bg-emerald-100 text-emerald-700' : lab.color
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-display-bold text-xl font-bold text-slate-900 group-hover:text-[#0077c8] transition-colors">
                              {lab.title}
                            </h3>
                            {user && lastActive && (
                              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                                Active {lastActive}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {lab.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs pb-1">
                          <span className="text-slate-400 text-[11px] font-medium">Lab Status</span>
                          <CompletionCheckbox
                            isCompleted={isCompleted}
                            onToggle={() => handleToggleComplete(lab.id)}
                            size="compact"
                            label="Mark Completed"
                            completedLabel="Completed ✓"
                          />
                        </div>

                        {isCompleted && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCertificateModal({ isOpen: true, labId: lab.id });
                            }}
                            className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-300 text-amber-900 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition shadow-2xs active:scale-98"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-700" />
                            <span>Download Certificate</span>
                          </button>
                        )}

                        <div className={`flex items-center justify-between text-xs font-extrabold ${
                          isCompleted ? 'text-emerald-700' : 'text-[#0077c8]'
                        }`}>
                          <span className="uppercase tracking-wider">
                            {isCompleted ? 'Revisit Simulation' : 'Launch Simulation'}
                          </span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Student Learning Center Callout for Students & Educators */}
          <section className="bg-gradient-to-b from-white to-[#faf7f2] py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-purple-900 via-indigo-900 to-[#0077c8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
              <div 
                aria-hidden="true" 
                className="absolute right-0 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" 
              />
              <div className="relative max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Education Without Barriers</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Educational Non-Profit</span>
                  </span>
                </div>

                <h3 className="font-display-bold text-2xl sm:text-4xl font-extrabold text-white">
                  Guided Learning Tracks for High School & College Students
                </h3>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Step through guided visual pathways designed specifically for AP/IB Calculus, AMC 10/12 and AIME contest geometry, and matrix transformations. Take concept check quizzes and download free printable LaTeX study guides.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentTab('education')}
                    className="px-6 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg transition flex items-center gap-2"
                  >
                    <span>Open Student Learning Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentTab('formulas')}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs tracking-wider uppercase rounded-full transition"
                  >
                    Download Study Sheets
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Math Lab Educational Mission Banner - Educational Non-Profit */}
          <section className="bg-gradient-to-r from-slate-900 via-[#0a192f] to-[#4a044e] text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
                  EDUCATIONAL NON-PROFIT INITIATIVE
                </span>
                <h3 className="font-display-bold text-2xl sm:text-3xl font-extrabold">
                  "Intuition Before Computation — Free for Every Student."
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Math Lab is an educational non-profit organization and open-source project (Apache-2.0). Built for olympiad contestants, AP/IB calculus students, university researchers, and inquisitive autodidacts across the globe—100% free with zero advertising.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setCurrentTab('education')}
                  className="px-6 py-3 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg transition"
                >
                  Student Pathways
                </button>
                <button
                  onClick={() => setCurrentTab('about')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-full transition"
                >
                  Non-Profit Mission
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : currentTab === 'laboratories' ? (
        /* Dedicated Laboratories Hub Page with User Progress Integration */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={() => setCurrentTab('overview')}
              className="hover:text-slate-900 transition flex items-center gap-1 font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">The Laboratories Suite</span>
          </div>

          <LaboratoriesHub 
            onSelectLab={setCurrentTab} 
            user={user}
            progress={progress}
            onToggleComplete={handleToggleComplete}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenCertificate={(labId) => setCertificateModal({ isOpen: true, labId })}
          />
        </main>
      ) : (
        /* Dedicated Focused Lab / Tool View with rich breadcrumb and quick lab switcher */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => setCurrentTab('laboratories')}
                className="hover:text-slate-900 transition flex items-center gap-1.5 font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-[#0077c8]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Labs</span>
              </button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-900 font-display-bold font-bold text-sm">
                {pageTitles[currentTab]}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Lab Completion & Certificate actions inside active lab */}
              {isLabView && (
                <div className="flex items-center gap-2">
                  <CompletionCheckbox
                    isCompleted={progress[currentTab]?.status === 'completed'}
                    onToggle={() => handleToggleComplete(currentTab)}
                    size="standard"
                    label="Mark Lab Completed"
                    completedLabel="Lab Completed ✓"
                  />

                  {progress[currentTab]?.status === 'completed' && (
                    <button
                      type="button"
                      onClick={() => setCertificateModal({ isOpen: true, labId: currentTab })}
                      className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 flex items-center gap-1.5 shadow-sm transition active:scale-95"
                      title="Download official completion certificate"
                    >
                      <Award className="w-3.5 h-3.5 text-slate-950" />
                      <span>Download Certificate</span>
                    </button>
                  )}
                </div>
              )}

              {/* Quick lab switcher when inside labs */}
              {isLabView && (
                <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl text-xs shadow-2xs">
                  {(
                    [
                      { id: 'graphing', label: 'Graphing' },
                      { id: 'geometry', label: 'Geometry' },
                      { id: 'calculus', label: 'Calculus' },
                      { id: 'linear-algebra', label: 'Linear Alg' },
                      { id: 'probability', label: 'Probability' },
                      { id: 'discrete', label: 'Discrete' },
                    ] as const
                  ).map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setCurrentTab(l.id as LabTab)}
                      className={`px-3 py-1.5 rounded-lg transition text-xs font-bold ${
                        currentTab === l.id
                          ? 'bg-[#0077c8] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {currentTab === 'education' && <StudentLearningHub onNavigateToLab={setCurrentTab} user={user} />}
          {currentTab === 'graphing' && <GraphingLab />}
          {currentTab === 'geometry' && <GeometryLab />}
          {currentTab === 'calculus' && <CalculusLab />}
          {currentTab === 'linear-algebra' && <LinearAlgebraLab />}
          {currentTab === 'probability' && <ProbabilityLab />}
          {currentTab === 'discrete' && <DiscreteMathLab />}
          {currentTab === 'formulas' && <FormulaReference onNavigateToLab={setCurrentTab} />}
          {currentTab === 'challenges' && <DailyChallenge />}
          {currentTab === 'notebook' && <LabNotebook />}
          {currentTab === 'about' && <AboutSection />}
        </main>
      )}

      {/* 4. Polished Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-500/40 shadow-xs bg-[#0a192f]">
                  <img
                    src="/assets/aistudio/unnamed_7f1902d3.jpg"
                    alt="Math Lab Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display-bold text-lg font-extrabold text-slate-900 block leading-tight">
                      MATH LAB
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Non-Profit
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Non-Profit Research Suite
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The official non-profit visual workspace for competition mathematics, geometry invariants, and tactile calculus simulations.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Laboratories
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li><button onClick={() => setCurrentTab('graphing')} className="hover:text-[#0077c8]">Function & Graphing Studio</button></li>
                <li><button onClick={() => setCurrentTab('geometry')} className="hover:text-[#0077c8]">Geometry & Unit Circle</button></li>
                <li><button onClick={() => setCurrentTab('calculus')} className="hover:text-[#0077c8]">Calculus & Riemann Sandbox</button></li>
                <li><button onClick={() => setCurrentTab('linear-algebra')} className="hover:text-[#0077c8]">Linear Algebra Grid</button></li>
                <li><button onClick={() => setCurrentTab('probability')} className="hover:text-[#0077c8]">Probability & Buffon π</button></li>
                <li><button onClick={() => setCurrentTab('discrete')} className="hover:text-[#0077c8]">Discrete Math & Primes</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Students & Resources
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li><button onClick={() => setCurrentTab('education')} className="hover:text-[#0077c8] font-bold text-[#0077c8]">Student Learning Center ★</button></li>
                <li><button onClick={scrollToExploration} className="hover:text-[#0077c8]">AIME Two Chords Theorem</button></li>
                <li><button onClick={() => setCurrentTab('overview')} className="hover:text-[#0077c8]">Schur’s Inequality Invariant</button></li>
                <li><button onClick={() => setCurrentTab('formulas')} className="hover:text-[#0077c8]">Formula Reference Handbook</button></li>
                <li><button onClick={() => setCurrentTab('challenges')} className="hover:text-[#0077c8]">Daily Math Challenge</button></li>
                <li><button onClick={() => setCurrentTab('notebook')} className="hover:text-[#0077c8]">Scratchpad & Notes</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Non-Profit & Community
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] space-y-1.5">
                <div className="font-mono text-slate-900 font-semibold">Educational Non-Profit Organization</div>
                <div className="text-emerald-700 flex items-center gap-1 font-mono font-medium">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Apache-2.0 Open Source</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                Tuition-free educational access for every student, school, and competition team worldwide.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>© {new Date().getFullYear()} Math Lab (mathlabofficial). All rights reserved.</div>
            <div className="italic text-xs text-[#0077c8] font-medium">
              "A way of seeing, before a way of solving."
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Utility Modals (Search, Support, Newsletter) */}
      <SearchAndUtilityModals
        activeModal={utilityModal}
        onClose={() => setUtilityModal(null)}
        onSelectTab={setCurrentTab}
      />

      {/* 6. Polished Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setProgress(getStoredProgress(userData.email));
        }}
      />

      {/* 7. Official Math Lab Mastery Certificate Modal */}
      <CertificateModal
        isOpen={certificateModal.isOpen}
        onClose={() => setCertificateModal((prev) => ({ ...prev, isOpen: false }))}
        user={user}
        initialLabId={certificateModal.labId}
        completedLabIds={Object.keys(progress).filter((k) => progress[k as LabTab]?.status === 'completed') as LabTab[]}
      />
    </div>
  );
};

export default App;
