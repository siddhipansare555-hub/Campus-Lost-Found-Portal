import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@mitwpu.edu.in')) {
      setError('Please use your official @mitwpu.edu.in student email address.');
      return;
    }
    
    const prnMatch = email.match(/\d+/);
    const prn = prnMatch ? prnMatch[0] : '1272250234';

    onLogin({
      email,
      prn,
      token: 'mock-jwt-token'
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl border border-white/20 text-center">
        
        {/* Standalone Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/mitlogo.png" 
            alt="MIT-WPU Logo" 
            className="h-28 sm:h-32 w-auto object-contain hover:scale-105 transition-transform duration-300" 
          />
        </div>

        <h2 className="text-2xl font-black text-[#1e2b6e] tracking-tight mb-1">
          MIT-WPU Lost & Found
        </h2>
        <p className="text-xs text-slate-500 mb-6 font-medium">
          Official Student & Campus Security Portal
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 font-semibold border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#1e2b6e] mb-1 uppercase tracking-wider">
              Student Email ID
            </label>
            <input 
              type="email" 
              required 
              placeholder="e.g., 1272250234@mitwpu.edu.in" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/30 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1e2b6e] mb-1 uppercase tracking-wider">
              Password
            </label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/30 font-medium"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1e2b6e] hover:bg-[#162054] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-6">
          Authorized for MIT World Peace University Students & Staff only.
        </p>
      </div>
    </div>
  );
};

export default Login;