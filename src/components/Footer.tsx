import React from 'react';
import { LabTab } from '../types';
import { GitBranch, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: LabTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-serif text-sm font-bold text-indigo-300">
                ∫
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">Math Lab</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The official interactive laboratory for exploring calculus, geometry, matrix algebra, probability, and discrete mathematics.
            </p>
            <div className="text-[11px] text-slate-500 italic">
              "Mathematics is the language in which God has written the universe." — Galileo
            </div>
          </div>

          {/* Col 2: Interactive Labs */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Laboratories
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('graphing')} className="hover:text-white transition">
                  Function & Graphing Studio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('geometry')} className="hover:text-white transition">
                  Geometry & Unit Circle
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calculus')} className="hover:text-white transition">
                  Calculus & Riemann Sandbox
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('linear-algebra')} className="hover:text-white transition">
                  Linear Algebra Grid
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('probability')} className="hover:text-white transition">
                  Statistics & Probability
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('discrete')} className="hover:text-white transition">
                  Discrete Math & Primes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Resources */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Resources
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('formulas')} className="hover:text-white transition">
                  Formula Reference Library
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('challenges')} className="hover:text-white transition">
                  Daily Problem Challenges
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('notebook')} className="hover:text-white transition">
                  Lab Notebook & Scratchpad
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-white transition">
                  About Math Lab Platform
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Repository & License */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Project
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1.5 text-[11px]">
              <div className="text-slate-300 font-mono">mathlabofficial/math-lab</div>
              <div className="text-emerald-400 flex items-center gap-1 font-mono">
                <Shield className="w-3 h-3" />
                Apache-2.0 License
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Open source under Apache License 2.0. Built for students, educators, and researchers worldwide.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} Math Lab (mathlabofficial). All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => onSelectTab('about')} className="hover:text-slate-300 transition">
              About
            </button>
            <button onClick={() => onSelectTab('formulas')} className="hover:text-slate-300 transition">
              Formulas
            </button>
            <button onClick={() => onSelectTab('notebook')} className="hover:text-slate-300 transition">
              Scratchpad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
