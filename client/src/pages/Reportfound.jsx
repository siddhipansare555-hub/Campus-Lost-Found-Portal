import React, { useState } from 'react';

const Reportfound = ({ currentUser, onAddItem, onNavigate }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    location: 'Central Library',
    customLocation: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    secret: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'location' && value !== 'Other') {
        updated.customLocation = '';
      }
      return updated;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalLocation = formData.location === 'Other' ? formData.customLocation : formData.location;

    if (!finalLocation.trim()) {
      alert('Please specify the location found.');
      return;
    }

    onAddItem({
      title: formData.title,
      category: formData.category,
      location: finalLocation,
      date: formData.date,
      description: formData.description,
      secret: formData.secret,
      image: formData.image,
      type: 'found',
      prn: currentUser?.prn,
      email: currentUser?.email
    });
    onNavigate('found_portal');
  };

  return (
    <div className="bg-[#ededf2] rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl border border-slate-200 my-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-[#1e2b6e]">Report Found Item</h2>
        <button 
          onClick={() => onNavigate('found_portal')} 
          className="bg-white text-[#1e2b6e] border border-[#1e2b6e] px-4 py-1.5 rounded-xl font-semibold text-xs hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Title */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Item Title *</label>
          <input 
            name="title" 
            required 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g., Black Leather Wallet, Student ID" 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/20"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          >
            <option value="Electronics">Electronics</option>
            <option value="ID Cards">ID Cards</option>
            <option value="Bags">Bags</option>
            <option value="Accessories">Accessories</option>
            <option value="Books">Books</option>
            <option value="Personal Belongings">Personal Belongings</option>
          </select>
        </div>

        {/* Location Found Dropdown + Custom Field */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Location Found</label>
          <select 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none mb-2"
          >
            <option value="Vyas">Vyas</option>
            <option value="Chanakya">Chanakya</option>
            <option value="Dhruv">Dhruv</option>
            <option value="Kashyap">Kashyap</option>
            <option value="Maitri">Maitri</option>
            <option value="Dronacharya">Dronacharya</option>
            <option value="Central Library">Central Library</option>
            <option value="Film School">Film School</option>
            <option value="Gargi">Gargi</option>
            <option value="Hostel">Hostel</option>
            <option value="Main Gate">Main Gate</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Amphitheatre">Amphitheatre</option>
            <option value="Parking Area">Parking Area</option>
            <option value="Ground">Ground</option>
            <option value="Other">Other</option>
          </select>

          {formData.location === 'Other' && (
            <input 
              name="customLocation" 
              required 
              value={formData.customLocation} 
              onChange={handleChange} 
              placeholder="Type specific building or area..." 
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/20"
            />
          )}
        </div>

        {/* Date Found */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Date Found</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          />
        </div>

        {/* Finder PRN */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Finder PRN</label>
          <input 
            disabled 
            value={currentUser?.prn || ''} 
            className="w-full bg-slate-200 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-600 font-mono"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Description / Location deposited</label>
          <textarea 
            name="description" 
            rows="3" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="e.g., Handed over to Gate 1 security guard..." 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          ></textarea>
        </div>

        {/* Upload Image */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Upload Image of Found Item</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:text-[#1e2b6e]"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#1e2b6e] hover:bg-[#162054] text-white py-3 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all mt-4"
        >
          Submit Found Report
        </button>
      </form>
    </div>
  );
};

export default Reportfound;