import React from 'react';
import { Search, User, LogOut, Heart, HelpCircle, Mail, CheckCircle2 } from 'lucide-react';

interface TopUtilityBarProps {
  user: { email: string; name: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenSearch: () => void;
  onOpenSupport: () => void;
  onOpenNewsletter: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  user,
  onOpenLogin,
  onLogout,
  onOpenSearch,
  onOpenSupport,
  onOpenNewsletter,
}) => {
  return (
    <div className="bg-[#4a044e] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left tagline / status */}
        <div className="hidden sm:flex items-center gap-2 text-purple-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">
            Math Lab &bull; Educational Non-Profit Initiative
          </span>
        </div>

        {/* Right utility links */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto font-medium">
          <button
            onClick={onOpenSupport}
            className="hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-300" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={onOpenNewsletter}
            className="hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-purple-300" />
            <span>Newsletter Signup</span>
          </button>

          <a
            href="https://github.com/mathlabofficial/math-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>Open Source</span>
          </a>

          <span className="text-purple-400 font-light">|</span>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
            title="Search laboratories and formulas"
          >
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span>Search</span>
          </button>

          {/* User Log-in Status */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="flex items-center gap-1.5 bg-purple-900/60 px-2 py-0.5 rounded-full border border-purple-400/30 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-semibold truncate max-w-28 sm:max-w-36 text-[11px]">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-purple-300 hover:text-white transition p-1"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-white font-semibold"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
