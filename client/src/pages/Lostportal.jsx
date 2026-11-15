import React, { useState } from 'react';
import ItemCard from '../components/Itemcard';

const Lostportal = ({ items, onNavigate, onDeleteItem }) => {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'my_reports', 'matches', 'chat', 'claims'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [customLocation, setCustomLocation] = useState('');
  const [notification, setNotification] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'other', text: 'Hi! I saw your post about the missing earphones. Did they have a red pouch?' },
    { sender: 'me', text: 'Yes! Black wired earphones in a small red zippered case.' }
  ]);
  const [messageInput, setMessageInput] = useState('');

  // Claim Modal State
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimStep, setClaimStep] = useState(1);
  const [claimForm, setClaimForm] = useState({
    proofType: 'Details',
    proofDescription: '',
    pickupTimeSlot: '10:00 AM - 12:00 PM',
    agreedToTerms: false
  });

  const currentUserPrn = '1272250552'; // Active user PRN context

  const lostItems = items.filter(item => item.type === 'lost');
  const foundItems = items.filter(item => item.type === 'found');
  const myUploadedLostItems = lostItems.filter(item => item.prn === currentUserPrn);

  // Smart Matching Logic: Match lost items with found items by category or location keyword
  const matches = lostItems.map(lost => {
    const potentialFound = foundItems.filter(found => 
      found.category === lost.category || 
      found.location.toLowerCase().includes(lost.location.toLowerCase()) ||
      lost.title.toLowerCase().includes(found.title.toLowerCase())
    );
    return { lost, potentialFound };
  }).filter(m => m.potentialFound.length > 0);

  const filteredItems = lostItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    
    let matchesLocation = true;
    if (locationFilter === 'All') {
      matchesLocation = true;
    } else if (locationFilter === 'Other') {
      matchesLocation = customLocation ? item.location.toLowerCase().includes(customLocation.toLowerCase()) : true;
    } else {
      matchesLocation = item.location.toLowerCase().includes(locationFilter.toLowerCase());
    }

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleOpenClaimModal = (item) => {
    setClaimingItem(item);
    setClaimStep(1);
    setClaimForm({
      proofType: 'Details',
      proofDescription: '',
      pickupTimeSlot: '10:00 AM - 12:00 PM',
      agreedToTerms: false
    });
  };

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    setNotification({
      type: 'info',
      title: 'Claim Verification Booked',
      message: `Claim submitted successfully for "${claimingItem.title}". Security Desk reference #CLM-${Math.floor(1000 + Math.random() * 9000)} generated.`
    });
    setClaimingItem(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'me', text: messageInput }]);
    setMessageInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'other', 
        text: 'Got it! Let us meet at Security Gate 1 with student IDs.' 
      }]);
    }, 1000);
  };

  return (
    <div className="bg-[#f1f1f5] rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
      {/* Toast Banner Notification */}
      {notification && (
        <div className="mb-6 bg-white border-l-4 border-[#1e2b6e] p-4 rounded-r-xl shadow-md flex justify-between items-center transition-all">
          <div>
            <h4 className="text-xs font-bold text-[#1e2b6e]">{notification.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{notification.message}</p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-700 ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1e2b6e] tracking-tight">Lost Items Portal</h1>
          <p className="text-xs text-slate-500 mt-1">Browse active lost reports, manage your missing item submissions, or connect with finders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('report_lost')} 
            className="bg-[#1e2b6e] hover:bg-[#162054] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
          >
            + Report Lost Item
          </button>
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="bg-white text-[#1e2b6e] border border-[#1e2b6e] px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-300 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'listings'
              ? 'border-[#1e2b6e] text-[#1e2b6e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Lost Listings ({lostItems.length})
        </button>
        <button
          onClick={() => setActiveTab('my_reports')}
          className={`pb-3 px-4 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'my_reports'
              ? 'border-[#1e2b6e] text-[#1e2b6e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Lost Reports ({myUploadedLostItems.length})
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-3 px-4 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'matches'
              ? 'border-[#1e2b6e] text-[#1e2b6e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Smart Match Reports ({matches.length})
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`pb-3 px-4 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'chat'
              ? 'border-[#1e2b6e] text-[#1e2b6e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Direct Student Chat
        </button>
        <button
          onClick={() => setActiveTab('claims')}
          className={`pb-3 px-4 font-bold text-xs border-b-2 transition-all ${
            activeTab === 'claims'
              ? 'border-[#1e2b6e] text-[#1e2b6e]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Verification Procedures
        </button>
      </div>

      {/* TAB 1: ALL LOST LISTINGS */}
      {activeTab === 'listings' && (
        <>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-6 items-center">
            <input 
              type="text" 
              placeholder="Search lost items by title..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/3 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/20"
            />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-1/4 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="ID Cards">ID Cards</option>
              <option value="Bags">Bags</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select 
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                if (e.target.value !== 'Other') setCustomLocation('');
              }}
              className="w-full sm:w-1/4 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
            >
              <option value="All">All Locations</option>
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

            {locationFilter === 'Other' && (
              <input 
                type="text" 
                placeholder="Type custom location..." 
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full sm:w-1/4 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]/20"
              />
            )}
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              No lost items match your search filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item._id || item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <ItemCard 
                      item={item} 
                      onDelete={onDeleteItem} 
                      onClaim={() => handleOpenClaimModal(item)} 
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenClaimModal(item)}
                      className="w-full bg-[#1e2b6e] hover:bg-[#162054] text-white py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      Claim This Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* TAB 2: MY REPORTED LOST ITEMS */}
      {activeTab === 'my_reports' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs text-slate-700">
            <strong>My Lost Reports:</strong> Below are the missing items you have submitted to the portal.
          </div>

          {myUploadedLostItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              You have not registered any missing items yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myUploadedLostItems.map(item => (
                <div key={item._id || item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <ItemCard 
                      item={item} 
                      onDelete={onDeleteItem} 
                      onClaim={() => handleOpenClaimModal(item)} 
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => {
                        onDeleteItem(item._id || item.id);
                        setNotification({ type: 'info', title: 'Report Closed', message: 'Your lost report has been successfully resolved and removed.' });
                      }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      Mark as Resolved / Found
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SMART MATCHES */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          <div className="bg-slate-100 border border-slate-300 rounded-2xl p-4 text-xs text-slate-800">
            <strong>Smart Item Reconciler:</strong> The portal automatically compares lost item reports with found items logged at Security Gate 1 or KRC.
          </div>

          {matches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              No automatic matches detected right now. Check back soon!
            </div>
          ) : (
            matches.map(({ lost, potentialFound }, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                  <span className="text-xs font-bold text-[#1e2b6e] bg-slate-100 px-3 py-1 rounded-full">
                    Lost Report: {lost.title}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">PRN: {lost.prn}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-700">Lost Item Notes</p>
                    <p className="text-slate-500">Location: {lost.location}</p>
                    <p className="text-slate-500">Category: {lost.category}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">Potential Matches Found in System:</p>
                    {potentialFound.map(found => (
                      <div key={found.id || found._id} className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{found.title}</p>
                          <p className="text-[11px] text-slate-500">Found at: {found.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedChatUser(found.email);
                              setActiveTab('chat');
                            }}
                            className="bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-300"
                          >
                            Connect Finder
                          </button>
                          <button
                            onClick={() => handleOpenClaimModal(found)}
                            className="bg-[#1e2b6e] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#162054]"
                          >
                            Claim Verification
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: CHAT / DIRECT CONTACT */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 h-[500px] overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="border-r border-slate-200 p-4 space-y-3 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Conversations</h3>
            <div 
              onClick={() => setSelectedChatUser('1032210889@mitwpu.edu.in')} 
              className={`p-3 rounded-xl cursor-pointer border text-xs transition-all ${
                selectedChatUser === '1032210889@mitwpu.edu.in' 
                  ? 'bg-white border-[#1e2b6e] shadow-sm' 
                  : 'bg-slate-100 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">Finder (PRN 1032210889)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">Re: Black Boat Earphones</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs opacity-60">
              <span className="font-bold text-slate-700">Security Gate 1 Desk</span>
              <p className="text-[11px] text-slate-500">Verified official desk</p>
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 flex flex-col h-full bg-white">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h4 className="text-xs font-bold text-[#1e2b6e]">Chatting with: Finder (1032210889@mitwpu.edu.in)</h4>
                <p className="text-[10px] text-slate-400">Item: Black Boat Earphones</p>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.sender === 'me' 
                      ? 'bg-[#1e2b6e] text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#1e2b6e] hover:bg-[#162054] text-white font-bold text-xs px-5 py-2.5 rounded-xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY DESK & VERIFICATION */}
      {activeTab === 'claims' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-[#1e2b6e]">Security Gate 1 Lost Item Recovery Checklist</h3>
            <p className="text-xs text-slate-500 mt-1">Steps required to claim a reported missing item once matched on campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800 text-sm">Step 1: Identity Check</p>
              <p className="text-slate-600">Present your valid MIT-WPU Physical Student ID card matching your registered PRN.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800 text-sm">Step 2: Verification Details</p>
              <p className="text-slate-600">Provide the secret verification mark or unlock security passwords in front of the gate officer.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <p className="font-bold text-slate-800 text-sm">Step 3: Signature Log</p>
              <p className="text-slate-600">Complete the physical register sign-off to formally close the lost item record.</p>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-STEP CLAIM MODAL */}
      {claimingItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1e2b6e]">Claim Item Verification</h3>
                <p className="text-xs text-slate-500">{claimingItem.title}</p>
              </div>
              <button onClick={() => setClaimingItem(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">X</button>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
              <span className={`text-xs font-bold ${claimStep === 1 ? 'text-[#1e2b6e]' : 'text-slate-400'}`}>1. Proof Type</span>
              <span className="text-slate-300">&gt;</span>
              <span className={`text-xs font-bold ${claimStep === 2 ? 'text-[#1e2b6e]' : 'text-slate-400'}`}>2. Details</span>
              <span className="text-slate-300">&gt;</span>
              <span className={`text-xs font-bold ${claimStep === 3 ? 'text-[#1e2b6e]' : 'text-slate-400'}`}>3. Gate 1 Schedule</span>
            </div>

            <form onSubmit={handleSubmitClaim}>
              {claimStep === 1 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-700">Select Ownership Proof Method</label>
                  <select
                    value={claimForm.proofType}
                    onChange={(e) => setClaimForm({ ...claimForm, proofType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]"
                  >
                    <option value="Details">Specific Identifying Markings / Engravings</option>
                    <option value="Invoice">Purchase Bill / Digital Invoice</option>
                    <option value="Serial">Serial Number / Device Unique ID</option>
                    <option value="Photo">Reference Photo of the Item</option>
                  </select>
                  <p className="text-[11px] text-slate-500">Choose how you will prove ownership to Security Gate 1 staff upon pickup.</p>
                  <button
                    type="button"
                    onClick={() => setClaimStep(2)}
                    className="w-full bg-[#1e2b6e] text-white py-2.5 rounded-xl text-xs font-bold mt-2"
                  >
                    Next Step: Enter Details
                  </button>
                </div>
              )}

              {claimStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Identifying Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Specify unique marks, stickers, wallpaper, contents inside, or distinguishing features..."
                      value={claimForm.proofDescription}
                      onChange={(e) => setClaimForm({ ...claimForm, proofDescription: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClaimStep(1)}
                      className="w-1/3 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setClaimStep(3)}
                      disabled={!claimForm.proofDescription.trim()}
                      className="w-2/3 bg-[#1e2b6e] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-50"
                    >
                      Next Step: Pickup Schedule
                    </button>
                  </div>
                </div>
              )}

              {claimStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Retrieval Timeslot (Security Desk Gate 1)</label>
                    <select
                      value={claimForm.pickupTimeSlot}
                      onChange={(e) => setClaimForm({ ...claimForm, pickupTimeSlot: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1e2b6e]"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning Slot (10:00 AM - 12:00 PM)</option>
                      <option value="01:30 PM - 03:30 PM">Afternoon Slot (01:30 PM - 03:30 PM)</option>
                      <option value="04:00 PM - 06:00 PM">Evening Slot (04:00 PM - 06:00 PM)</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      required
                      id="agreed"
                      checked={claimForm.agreedToTerms}
                      onChange={(e) => setClaimForm({ ...claimForm, agreedToTerms: e.target.checked })}
                      className="mt-0.5"
                    />
                    <label htmlFor="agreed" className="text-[11px] text-slate-600 leading-tight">
                      I confirm that I am the true owner of this item and agree to present my MIT-WPU Physical Student ID Card at Gate 1 for verification.
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClaimStep(2)}
                      className="w-1/3 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!claimForm.agreedToTerms}
                      className="w-2/3 bg-[#1e2b6e] text-white py-2.5 rounded-xl text-xs font-bold disabled:opacity-50"
                    >
                      Confirm & Submit Claim
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Lostportal;