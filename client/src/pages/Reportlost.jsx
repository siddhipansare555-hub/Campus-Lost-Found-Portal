import React, { useState } from 'react';

const Reportlost = ({ currentUser, onAddItem, onNavigate }) => {
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
      // Clear custom location if switching away from 'Other'
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

    // Determine final location value based on selection
    const finalLocation = formData.location === 'Other' ? formData.customLocation : formData.location;

    if (!finalLocation.trim()) {
      alert('Please specify the lost location.');
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
      type: 'lost',
      prn: currentUser?.prn || '1272250552',
      email: currentUser?.email || 'student@mitwpu.edu.in'
    });

    onNavigate('lost_portal');
  };

  return (
    <div className="bg-[#ededf2] rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl border border-slate-200 my-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-[#1e2b6e]">Report Lost Item</h2>
        <button 
          onClick={() => onNavigate('lost_portal')} 
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
            placeholder="e.g., Blue Boat Airdopes, HP Charger" 
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

        {/* Approximate Lost Location Dropdown + Custom Field */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Approximate Lost Location</label>
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

          {/* Render text input when "Other" is selected */}
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

        {/* Date Lost */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Date Lost</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Description</label>
          <textarea 
            name="description" 
            rows="3" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Key identifiable details..." 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          ></textarea>
        </div>

        {/* Secret Verification Mark */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Secret Verification Mark</label>
          <input 
            name="secret" 
            value={formData.secret} 
            onChange={handleChange} 
            placeholder="e.g., Wallpaper image, scratch mark on back" 
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
          />
        </div>

        {/* Upload Reference Photo */}
        <div>
          <label className="block text-xs font-bold text-[#1e2b6e] mb-1">Upload Reference Photo</label>
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
          Submit Lost Item Report
        </button>
      </form>
    </div>
  );
};

export default Reportlost;