import React from 'react';

const ItemCard = ({ item, onDelete, onClaim }) => {
  const isLost = item.type === 'lost';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col justify-between">
      <div>
        <div className={`h-2 ${isLost ? 'bg-amber-600' : 'bg-emerald-600'}`}></div>
        <div className="p-5">
          {item.image && (
            <div className="h-44 w-full bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider mb-2 ${
            isLost ? 'bg-pink-100 text-pink-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {item.type}
          </span>

          <h3 className="text-lg font-extrabold text-[#1e2b6e] mb-2">{item.title}</h3>

          <div className="space-y-1 text-xs text-slate-600 font-medium mb-3">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            {item.description && (
              <p className="text-slate-500 italic mt-2 border-t pt-2 border-slate-100">{item.description}</p>
            )}
            <p className="text-slate-700 font-mono text-[11px] mt-1">PRN: {item.prn}</p>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 space-y-2">
        <button 
          onClick={() => onClaim(item)} 
          className="w-full bg-[#8b0000] hover:bg-[#6a0000] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
        >
          {isLost ? 'I Found This Item! 🔍' : 'Claim This Item'}
        </button>

        {onDelete && (
          <button 
            onClick={() => onDelete(item._id || item.id)} 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            Delete Listing
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;