import React from 'react';

const Dashboard = ({ currentUser, onNavigate, onLogout }) => {
  return (
    <div className="bg-[#f1f1f5] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl border border-slate-200 my-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e2b6e] mb-2 tracking-tight">
        What would you like to do today?
      </h2>
      <p className="text-sm text-slate-500 mb-10">Select an option to access campus listings or report an item.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
        {/* Lost an Item Option */}
        <div 
          onClick={() => onNavigate('lost_portal')} 
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 group"
        >
          <div className="h-2 bg-[#8b0000]"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#1e2b6e] group-hover:text-[#8b0000] transition-colors mb-2">
              Lost an Item
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Search missing listings or register a report for your lost belongings on campus.
            </p>
          </div>
        </div>

        {/* Found an Item Option */}
        <div 
          onClick={() => onNavigate('found_portal')} 
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 group"
        >
          <div className="h-2 bg-[#1e2b6e]"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#1e2b6e] group-hover:text-[#8b0000] transition-colors mb-2">
              Found an Item
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Report an item you found on campus or assist other students in retrieving lost items.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-300/60 flex justify-center items-center gap-4 text-xs text-slate-500">
        <span>Logged in as: <strong className="text-slate-700">{currentUser?.email}</strong></span>
        <span>•</span>
        <button onClick={onLogout} className="text-red-600 font-semibold hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;