import React, { useState, useRef } from 'react';
import { LabTab } from './types';
import { LandingHeader } from './components/landing/LandingHeader';
import { LandingHero } from './components/landing/LandingHero';
import { ChordsExploration } from './components/landing/ChordsExploration';
import { SchurSection } from './components/landing/SchurSection';
import { LandingModals } from './components/landing/LandingModals';
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
  Shield
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<LabTab>('overview');
  const [activeModal, setActiveModal] = useState<'take-a-moment' | 'how-it-works' | 'plans' | 'signin' | 'signup' | null>(null);

  const explorationRef = useRef<HTMLDivElement | null>(null);

  const scrollToExploration = () => {
    if (explorationRef.current) {
      explorationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const labTitles: Record<LabTab, string> = {
    overview: 'Overview',
    graphing: 'Function & Graphing Studio',
    geometry: 'Geometry & Unit Circle',
    calculus: 'Calculus & Riemann Sandbox',
    'linear-algebra': 'Linear Algebra Grid',
    probability: 'Statistics & Probability Lab',
    discrete: 'Number Theory & Discrete Math',
    formulas: 'Formula Reference Library',
    challenges: 'Daily Math Challenge',
    notebook: 'Lab Notebook & Scratchpad',
    about: 'About Math Lab',
  };

  const isLabView = ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab);

  const labCatalog = [
    { id: 'graphing' as LabTab, num: '01', title: 'Function & Graphing Studio', desc: '2D Cartesian plotter, instantaneous numerical derivatives, tangent equations & Riemann areas.', icon: Activity },
    { id: 'geometry' as LabTab, num: '02', title: 'Geometry & Unit Circle', desc: 'Continuous angle unit circle, live trigonometric projections, and SSS triangle solver.', icon: CircleDot },
    { id: 'calculus' as LabTab, num: '03', title: 'Calculus & Riemann Sandbox', desc: 'Partition convergence rules (Left, Right, Midpoint, Trapezoid) and Taylor series expansions.', icon: Layers },
    { id: 'linear-algebra' as LabTab, num: '04', title: 'Linear Algebra Grid', desc: 'Visual coordinate plane deformation under 2x2 matrices, determinant signed area & eigenvalues.', icon: Grid },
    { id: 'probability' as LabTab, num: '05', title: 'Statistics & Probability Lab', desc: 'Normal Gaussian bell curves, Binomial distributions, and Monte Carlo Buffon’s needle π estimation.', icon: Compass },
    { id: 'discrete' as LabTab, num: '06', title: 'Number Theory & Discrete Math', desc: 'Sieve of Eratosthenes prime grid, step-by-step Euclidean algorithm GCD & modular clock.', icon: Binary },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1c2430] flex flex-col font-sans selection:bg-[#2d5868]/20 selection:text-[#182029]">
      {/* Editorial Landing Header matching Screenshot 1 */}
      <LandingHeader
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenModal={setActiveModal}
        onScrollToExploration={scrollToExploration}
      />

      {/* Main Content Body */}
      {currentTab === 'overview' ? (
        <div className="flex-1 flex flex-col">
          {/* Hero Section matching Screenshot 1 */}
          <LandingHero
            onScrollToExploration={scrollToExploration}
            onSelectTab={setCurrentTab}
          />

          {/* Interactive AIME Two Chords Exploration matching Screenshot 2 */}
          <div ref={explorationRef}>
            <ChordsExploration />
          </div>

          {/* Schur's Inequality Section matching Screenshot 3 */}
          <SchurSection />

          {/* Interactive Laboratories Suite */}
          <div className="bg-[#faf7f2] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#e7e1d5]">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#b86822] font-semibold">
                    Interactive Tools
                  </span>
                  <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#182029] mt-1">
                    The Math Lab Laboratories
                  </h2>
                  <p className="text-sm text-[#475467] mt-2 max-w-xl">
                    Every theorem is an interactive sandbox. Dive into function analysis, coordinate plane warping, Riemann sums, or probability simulations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('formulas')}
                    className="px-4 py-2 text-xs font-semibold text-[#254553] bg-white border border-[#ded5c5] rounded-lg hover:bg-[#f4efe4] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Formula Handbook
                  </button>
                  <button
                    onClick={() => setCurrentTab('challenges')}
                    className="px-4 py-2 text-xs font-semibold text-[#254553] bg-white border border-[#ded5c5] rounded-lg hover:bg-[#f4efe4] transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    Daily Challenges
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {labCatalog.map((lab) => {
                  const Icon = lab.icon;
                  return (
                    <div
                      key={lab.id}
                      onClick={() => setCurrentTab(lab.id)}
                      className="group cursor-pointer bg-white rounded-2xl border border-[#ded5c5] p-6 shadow-xs hover:shadow-md hover:border-[#2d5868]/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#b86822]">
                            LAB {lab.num}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-[#faf7f2] border border-[#e8dfcf] flex items-center justify-center text-[#2d5868]">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="font-serif-editorial text-xl font-bold text-[#182029] group-hover:text-[#2d5868] transition-colors">
                          {lab.title}
                        </h3>

                        <p className="text-xs text-[#475467] leading-relaxed">
                          {lab.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#f0e8da] flex items-center justify-between text-xs font-semibold text-[#2d5868]">
                        <span>Launch Laboratory</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Focused Lab / Tool View with clean breadcrumb */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#475467]">
              <button
                onClick={() => setCurrentTab('overview')}
                className="hover:text-[#182029] transition flex items-center gap-1 font-medium bg-white px-2.5 py-1.5 rounded-lg border border-[#ded5c5] shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Overview
              </button>
              <ChevronRight className="w-3 h-3 text-[#98a2b3]" />
              <span className="text-[#182029] font-serif-editorial font-bold text-sm">
                {labTitles[currentTab]}
              </span>
            </div>

            {/* Quick lab switcher when inside labs */}
            {isLabView && (
              <div className="hidden sm:flex items-center gap-1 bg-white border border-[#ded5c5] p-1 rounded-lg text-xs shadow-xs">
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
                    className={`px-2.5 py-1 rounded transition text-xs font-medium ${
                      currentTab === l.id
                        ? 'bg-[#254553] text-white font-semibold shadow-xs'
                        : 'text-[#475467] hover:text-[#182029]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

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

      {/* Editorial Footer */}
      <footer className="border-t border-[#e7e1d5] bg-[#faf7f2] text-[#475467] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ded5c5] shadow-xs">
                  <img
                    src="/assets/aistudio/unnamed_7f1902d3.jpg"
                    alt="Math Lab Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif-editorial text-lg font-bold text-[#182029]">
                  Math Lab
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                The official interactive workspace for competition mathematics, geometry invariants, and exploratory calculus.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#182029] uppercase tracking-wider text-[11px]">
                Laboratories
              </h4>
              <ul className="space-y-1.5 text-xs text-[#475467]">
                <li><button onClick={() => setCurrentTab('graphing')} className="hover:text-[#182029]">Function & Graphing Studio</button></li>
                <li><button onClick={() => setCurrentTab('geometry')} className="hover:text-[#182029]">Geometry & Unit Circle</button></li>
                <li><button onClick={() => setCurrentTab('calculus')} className="hover:text-[#182029]">Calculus & Riemann Sandbox</button></li>
                <li><button onClick={() => setCurrentTab('linear-algebra')} className="hover:text-[#182029]">Linear Algebra Grid</button></li>
                <li><button onClick={() => setCurrentTab('probability')} className="hover:text-[#182029]">Probability & Buffon π</button></li>
                <li><button onClick={() => setCurrentTab('discrete')} className="hover:text-[#182029]">Discrete Math & Primes</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-[#182029] uppercase tracking-wider text-[11px]">
                Explorations
              </h4>
              <ul className="space-y-1.5 text-xs text-[#475467]">
                <li><button onClick={scrollToExploration} className="hover:text-[#182029]">AIME Two Chords Theorem</button></li>
                <li><button onClick={() => setCurrentTab('overview')} className="hover:text-[#182029]">Schur’s Inequality Invariant</button></li>
                <li><button onClick={() => setCurrentTab('formulas')} className="hover:text-[#182029]">Formula Reference Handbook</button></li>
                <li><button onClick={() => setCurrentTab('challenges')} className="hover:text-[#182029]">Daily Math Challenge</button></li>
                <li><button onClick={() => setCurrentTab('notebook')} className="hover:text-[#182029]">Scratchpad & Notes</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[#182029] uppercase tracking-wider text-[11px]">
                License & Attribution
              </h4>
              <div className="bg-white border border-[#ded5c5] rounded-lg p-3 text-[11px] space-y-1">
                <div className="font-mono text-[#182029]">mathlabofficial/math-lab</div>
                <div className="text-emerald-700 flex items-center gap-1 font-mono font-medium">
                  <Shield className="w-3 h-3" />
                  Apache-2.0 Open Source
                </div>
              </div>
              <p className="text-[11px] text-[#667085]">
                Built for students, educators, and competition mathematicians worldwide.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#ded5c5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
            <div>© {new Date().getFullYear()} Math Lab (mathlabofficial). All rights reserved.</div>
            <div className="font-serif-editorial italic text-xs text-[#2d5868]">
              "A way of seeing, before a way of solving."
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LandingModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default App;
