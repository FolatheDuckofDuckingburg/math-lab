import React, { useState } from 'react';
import { LabTab, UserProgressMap } from '../../types';
import { getProgressSummary, formatTimeAgo } from '../../utils/progress';
import { 
  Activity, 
  CircleDot, 
  Layers, 
  Grid, 
  Compass, 
  Binary, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  CheckCircle,
  Clock,
  RotateCcw,
  Play,
  User,
  GraduationCap
} from 'lucide-react';

interface LaboratoriesHubProps {
  onSelectLab: (tab: LabTab) => void;
  user: { email: string; name: string; role?: string } | null;
  progress: UserProgressMap;
  onToggleComplete: (labId: LabTab) => void;
  onOpenLogin: () => void;
}

export const LaboratoriesHub: React.FC<LaboratoriesHubProps> = ({
  onSelectLab,
  user,
  progress,
  onToggleComplete,
  onOpenLogin,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');

  const summary = getProgressSummary(progress);

  const categories = [
    { id: 'all', label: 'All Laboratories (6)' },
    { id: 'analysis', label: 'Calculus & Functions' },
    { id: 'geometry', label: 'Geometry & Linear Algebra' },
    { id: 'discrete', label: 'Discrete & Probability' },
  ];

  const labs = [
    {
      id: 'graphing' as LabTab,
      num: '01',
      title: 'Function & Graphing Studio',
      badge: 'Continuous Analysis',
      category: 'analysis',
      accentColor: 'border-l-sky-500 text-sky-600',
      tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Activity,
      desc: 'High-precision 2D Cartesian plotter with instantaneous numerical derivatives f\'(x), tangent line visualizer, and live numerical Riemann integration.',
      features: ['Dynamic polynomial & trigonometric equations', 'Instantaneous tangent line & slope readout', 'Live shaded numerical definite integral'],
      preset: 'Explore f(x) = x³ - 3x',
    },
    {
      id: 'geometry' as LabTab,
      num: '02',
      title: 'Geometry & Unit Circle Studio',
      badge: 'Trigonometry & Invariants',
      category: 'geometry',
      accentColor: 'border-l-amber-500 text-amber-600',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: CircleDot,
      desc: 'Interactive continuous angle unit circle with live projections of sin θ, cos θ, tan θ, exact fraction angle snaps (π/6, π/4, π/3), and SSS triangle solver.',
      features: ['Live continuous angle slider with rad/deg sync', 'Visual color-coded orthogonal projections', 'SSS Triangle law of cosines solver'],
      preset: 'Examine θ = 5π/6 radians',
    },
    {
      id: 'calculus' as LabTab,
      num: '03',
      title: 'Calculus & Riemann Sandbox',
      badge: 'Integration & Series',
      category: 'analysis',
      accentColor: 'border-l-purple-500 text-purple-600',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Layers,
      desc: 'Partition convergence visualizer supporting Left-endpoint, Right-endpoint, Midpoint, and Trapezoidal approximation rules, alongside live Taylor series expansions.',
      features: ['Adjust partition count N from 2 to 100', 'Exact definite integral vs approximation delta', 'Taylor polynomial series up to degree 11'],
      preset: 'Simulate eˣ Taylor approximation',
    },
    {
      id: 'linear-algebra' as LabTab,
      num: '04',
      title: 'Linear Algebra Grid Studio',
      badge: 'Matrix Transformations',
      category: 'geometry',
      accentColor: 'border-l-blue-600 text-blue-600',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Grid,
      desc: 'Real-time coordinate space deformation under arbitrary 2x2 matrices. Witness basis vector rotation, determinant signed area scaling, and eigenvalue axes.',
      features: ['Interactive basis vectors i-hat and j-hat', 'Signed parallelogram area for det(A)', 'Presets for Shear, Reflection, and Rotation'],
      preset: 'Test 45° rotation with shear',
    },
    {
      id: 'probability' as LabTab,
      num: '05',
      title: 'Statistics & Probability Lab',
      badge: 'Distributions & Monte Carlo',
      category: 'discrete',
      accentColor: 'border-l-emerald-500 text-emerald-600',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Compass,
      desc: 'Interactive Gaussian normal distribution with empirical rule 68-95-99.7% intervals, Binomial PMF charts, and Buffon’s needle Monte Carlo estimation of π.',
      features: ['Dynamic mean μ and standard deviation σ', 'Binomial probability mass distribution', 'Buffon needle needle-drop π simulator'],
      preset: 'Run 1,000 Monte Carlo needle drops',
    },
    {
      id: 'discrete' as LabTab,
      num: '06',
      title: 'Number Theory & Discrete Math',
      badge: 'Primes & Modular Rings',
      category: 'discrete',
      accentColor: 'border-l-rose-500 text-rose-600',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Binary,
      desc: 'Interactive Sieve of Eratosthenes prime grid (1-100), step-by-step Euclidean algorithm GCD demonstrator, modular arithmetic dial clock, and Pascal’s triangle.',
      features: ['Animated composite number elimination sieve', 'Euclidean remainder step trace with quotients', 'Modular ring dial clock for Z/nZ'],
      preset: 'Compute GCD(252, 105) step-by-step',
    },
  ];

  // Filtering by category and progress status
  const filteredLabs = labs.filter((lab) => {
    const matchesCategory = activeCategory === 'all' || lab.category === activeCategory;
    if (!matchesCategory) return false;

    if (user && statusFilter !== 'all') {
      const rec = progress[lab.id];
      const status = rec ? rec.status : 'not_started';
      if (status !== statusFilter) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 py-6">
      {/* 1. Page Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#0077c8]/20 rounded-full blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute -left-10 -top-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Research Laboratories</span>
          </div>

          <h1 className="font-display-bold text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            THE SIMULATION SUITE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every laboratory in Math Lab is a standalone, hardware-accelerated exploration engine. Manipulate parameters with fluid sliders, inspect mathematical readouts in real-time, and gain tactile intuition for competitive and higher mathematics.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0077c8] text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. User Progress Dashboard Banner */}
      {user ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5 text-[#4a044e]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display-bold text-base font-bold text-slate-900">
                    Researcher Progress: {user.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wide">
                    {user.role || 'Scholar'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track your mastery across all interactive simulation modules.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900">
                  {summary.completed} of {summary.total} Completed
                </div>
                <div className="text-xs text-slate-500">
                  {summary.inProgress} in progress &bull; {summary.notStarted} remaining
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0077c8] font-mono px-3 py-1 bg-sky-50 rounded-xl border border-sky-100">
                {summary.percentage}%
              </div>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="mt-4 space-y-3">
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#0077c8] via-sky-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(summary.percentage, 4)}%` }}
              />
            </div>

            {/* Filter by Progress Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  Filter by status:
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({summary.total})
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    statusFilter === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Completed ({summary.completed})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('in_progress')}
                  className={`px-3 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    statusFilter === 'in_progress'
                      ? 'bg-sky-600 text-white'
                      : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>In Progress ({summary.inProgress})</span>
                </button>
                <button
                  onClick={() => setStatusFilter('not_started')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    statusFilter === 'not_started'
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Not Started ({summary.notStarted})
                </button>
              </div>

              {summary.completed === 6 && (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mastery Certificate Earned! All 6 completed.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Prompt when user is not logged in */
        <div className="bg-gradient-to-r from-sky-50 via-white to-amber-50 rounded-2xl border border-sky-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0077c8]/10 text-[#0077c8] flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display-bold text-sm font-bold text-slate-900">
                Want to track your simulation progress?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Log in or launch a guest student profile to mark completed labs, record interaction history, and save personal notes.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenLogin}
            className="px-5 py-2.5 bg-[#0077c8] hover:bg-[#005fa3] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-xs transition shrink-0"
          >
            Sign In / Try Demo →
          </button>
        </div>
      )}

      {/* 3. Laboratories Grid with Interactive Progress Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredLabs.map((lab) => {
          const Icon = lab.icon;
          const rec = progress[lab.id];
          const isCompleted = rec?.status === 'completed';
          const isInProgress = rec?.status === 'in_progress';
          const interactionCount = rec?.interactionCount || 0;
          const lastActive = rec?.lastInteractedAt ? formatTimeAgo(rec.lastInteractedAt) : null;

          return (
            <div
              key={lab.id}
              className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                isCompleted 
                  ? 'border-emerald-300 ring-1 ring-emerald-400/20' 
                  : 'border-slate-200 hover:border-[#0077c8]/40 shadow-xs'
              }`}
            >
              {/* Card Header & Content */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 tracking-wider">
                    LAB {lab.num}
                  </span>

                  {/* Progress Status Badge */}
                  {user ? (
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500">
                          <span>Not Started</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${lab.tagColor}`}>
                      {lab.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                    isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 group-hover:bg-sky-50 text-[#0077c8]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display-bold text-xl font-bold text-slate-900 group-hover:text-[#0077c8] transition-colors">
                      {lab.title}
                    </h3>
                    {user && lastActive && (
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                        Active {lastActive} &bull; Studied {interactionCount} time{interactionCount === 1 ? '' : 's'}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lab.desc}
                </p>

                {/* Key features checklist */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100">
                  {lab.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-500">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Dual Action: Launch & Mark Completed */}
              <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2.5">
                {user && (
                  <div className="pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Status</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(lab.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Marked Complete</span>
                          <RotateCcw className="w-3 h-3 opacity-60 ml-0.5" />
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Mark as Completed</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => onSelectLab(lab.id)}
                  className={`w-full py-3 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 group-hover:translate-x-0.5 ${
                    isCompleted ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-[#0077c8] hover:bg-[#005fa3]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCompleted ? 'Revisit Simulation' : 'Launch Laboratory'}</span>
                  <ArrowRight className="w-4 h-4 text-sky-200" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLabs.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <p className="text-slate-500 text-sm">
            No laboratories match the selected category & status filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setStatusFilter('all');
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
