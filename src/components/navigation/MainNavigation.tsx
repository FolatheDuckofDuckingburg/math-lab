import React, { useState } from 'react';
import { LabTab } from '../../types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Activity, 
  CircleDot, 
  Layers, 
  Grid, 
  Compass, 
  Binary, 
  BookOpen, 
  Award, 
  FileText,
  Info,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

interface MainNavigationProps {
  currentTab: LabTab;
  onSelectTab: (tab: LabTab) => void;
  onScrollToExploration?: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  currentTab,
  onSelectTab,
  onScrollToExploration,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const labsList = [
    { id: 'graphing' as LabTab, title: 'Function & Graphing Studio', icon: Activity, desc: 'Dynamic curves, instantaneous derivatives & Riemann areas' },
    { id: 'geometry' as LabTab, title: 'Geometry & Unit Circle', icon: CircleDot, desc: 'Trigonometric projections & SSS triangle solver' },
    { id: 'calculus' as LabTab, title: 'Calculus & Riemann Sandbox', icon: Layers, desc: 'Partition convergence rules & Taylor polynomial series' },
    { id: 'linear-algebra' as LabTab, title: 'Linear Algebra Grid', icon: Grid, desc: '2D matrix coordinate warping & determinant area' },
    { id: 'probability' as LabTab, title: 'Probability & Distributions', icon: Compass, desc: 'Normal bell curves & Buffon’s needle π estimation' },
    { id: 'discrete' as LabTab, title: 'Discrete Math & Primes', icon: Binary, desc: 'Sieve of Eratosthenes, Euclidean GCD & modular clock' },
  ];

  const toolsList = [
    { id: 'formulas' as LabTab, title: 'Formula Handbook', icon: BookOpen, desc: 'Indexed theorems, definitions & LaTeX equations' },
    { id: 'challenges' as LabTab, title: 'Daily Math Challenges', icon: Award, desc: 'Competition problem sets with verified solutions' },
    { id: 'notebook' as LabTab, title: 'Lab Scratchpad', icon: FileText, desc: 'Expression evaluator and persistent research notes' },
  ];

  const handleNavClick = (tab: LabTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm border border-amber-500/40 group-hover:scale-105 transition-transform bg-[#0a192f]">
              <img
                src="/assets/aistudio/unnamed_7f1902d3.jpg"
                alt="Math Lab Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/30 rounded-xl pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display-bold text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#0077c8] transition-colors leading-none">
                  MATH LAB
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Non-Profit
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
                Visual Intuition & Research Engine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-bold text-slate-700">
            {/* Home / Overview */}
            <button
              onClick={() => handleNavClick('overview')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'overview'
                  ? 'text-[#0077c8] bg-sky-50/80 font-extrabold'
                  : 'hover:text-[#0077c8] hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            {/* Student Learning Center */}
            <button
              onClick={() => handleNavClick('education')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'education'
                  ? 'text-[#0077c8] bg-sky-50/80 font-extrabold'
                  : 'hover:text-[#0077c8] hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#0077c8]" />
              <span>Student Center</span>
            </button>

            {/* Laboratories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('labs')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('laboratories')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'laboratories' || ['graphing', 'geometry', 'calculus', 'linear-algebra', 'probability', 'discrete'].includes(currentTab)
                    ? 'text-[#0077c8] bg-sky-50/80 font-extrabold'
                    : 'hover:text-[#0077c8] hover:bg-slate-50'
                }`}
              >
                <span>Laboratories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'labs' && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>6 Simulation Engines</span>
                    <button
                      onClick={() => handleNavClick('laboratories')}
                      className="text-[#0077c8] hover:underline normal-case font-semibold"
                    >
                      View All →
                    </button>
                  </div>
                  {labsList.map((lab) => {
                    const Icon = lab.icon;
                    return (
                      <button
                        key={lab.id}
                        onClick={() => handleNavClick(lab.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-3 ${
                          currentTab === lab.id ? 'bg-sky-50 text-[#0077c8]' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-100/60 text-[#0077c8] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs">{lab.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {lab.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Interactive Invariants Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('invariants')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => {
                  if (currentTab !== 'overview') {
                    onSelectTab('overview');
                  }
                  setTimeout(() => {
                    onScrollToExploration?.();
                  }, 100);
                }}
                className="px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 hover:text-[#0077c8] hover:bg-slate-50"
              >
                <span>Visual Invariants</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'invariants' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Live Proof Visualizers
                  </div>
                  <button
                    onClick={() => {
                      if (currentTab !== 'overview') onSelectTab('overview');
                      setTimeout(() => onScrollToExploration?.(), 100);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition text-slate-800"
                  >
                    <div className="font-bold text-xs text-[#0077c8]">AIME Two Chords Theorem</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      Explore power-of-a-point and inscribed angle circular invariants
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      if (currentTab !== 'overview') onSelectTab('overview');
                      setTimeout(() => {
                        window.scrollTo({ top: 1200, behavior: 'smooth' });
                      }, 100);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition text-slate-800"
                  >
                    <div className="font-bold text-xs text-[#b86822]">Schur’s Inequality Invariant</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      Real-time algebraic non-negativity boundary verification
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Handbook & Tools */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('resources')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  ['formulas', 'challenges', 'notebook'].includes(currentTab)
                    ? 'text-[#0077c8] bg-sky-50/80 font-extrabold'
                    : 'hover:text-[#0077c8] hover:bg-slate-50'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {openDropdown === 'resources' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Handbooks & Practice
                  </div>
                  {toolsList.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleNavClick(tool.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-3 ${
                          currentTab === tool.id ? 'bg-sky-50 text-[#0077c8]' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs">{tool.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {tool.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* About */}
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentTab === 'about'
                  ? 'text-[#0077c8] bg-sky-50/80 font-extrabold'
                  : 'hover:text-[#0077c8] hover:bg-slate-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Button - Bold High-Impact Pill */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('laboratories')}
              className="px-6 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore Labs</span>
              <span className="text-sky-200">→</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('overview')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('education')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-[#0077c8] bg-sky-50 rounded-lg flex items-center justify-between"
            >
              <span>Student Learning Center</span>
              <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Non-Profit</span>
            </button>
            <button
              onClick={() => handleNavClick('laboratories')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              All Laboratories (6)
            </button>
            <button
              onClick={() => handleNavClick('formulas')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Formula Handbook
            </button>
            <button
              onClick={() => handleNavClick('challenges')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Daily Challenges
            </button>
            <button
              onClick={() => handleNavClick('notebook')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Lab Notebook
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2 text-sm font-bold text-slate-800 rounded-lg hover:bg-slate-100"
            >
              About Math Lab
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('laboratories')}
              className="w-full py-3 bg-[#0077c8] text-white font-bold text-center rounded-xl shadow-md uppercase tracking-wider text-xs"
            >
              Explore Laboratories Suite
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
