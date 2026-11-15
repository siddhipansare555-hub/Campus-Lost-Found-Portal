import React from 'react';

const Navbar = ({ currentUser, onLogout, onNavigate }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 mb-8 border border-white/20 flex flex-wrap items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <img 
          src="/mitlogo.png" 
          alt="MIT-WPU Logo" 
          className="h-16 sm:h-20 w-auto object-contain hover:opacity-90 transition-opacity"
        />
        <div className="hidden sm:block text-left">
          <h1 className="text-lg font-black text-white tracking-wide leading-tight">Lost & Found</h1>
          <p className="text-[10px] text-slate-200 font-semibold uppercase tracking-wider">MIT World Peace University</p>
        </div>
      </div>

      <nav className="flex items-center gap-3">
        {currentUser && (
          <button 
            onClick={onLogout} 
            className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;