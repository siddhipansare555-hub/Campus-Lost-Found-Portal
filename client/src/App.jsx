import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lostportal from './pages/Lostportal';
import Foundportal from './pages/Foundportal';
import Reportlost from './pages/Reportlost';
import Reportfound from './pages/Reportfound';

// Initial items mapped directly to your public folder images
const initialItems = [
  // --- LOST ITEMS (2) ---
  {
    id: 'lost-1',
    title: 'MIT-WPU Student ID Card',
    category: 'ID Cards',
    type: 'lost',
    location: 'Central Library',
    date: '2026-10-24',
    description: 'Faculty of Engineering and Technology ID card with blue lanyard. Name: Pansare Siddhi Narendra.',
    prn: '1272250552',
    email: '1272250552@mitwpu.edu.in',
    image: '/idcard.jpeg'
  },
  {
    id: 'lost-2',
    title: 'Black Wired Earphones',
    category: 'Electronics',
    type: 'lost',
    location: 'Cafeteria',
    date: '2026-10-25',
    description: 'Black wired in-ear headphones with 3.5mm jack and inline microphone.',
    prn: '1272250552',
    email: '1272250552@mitwpu.edu.in',
    image: '/wiredearphones.jpeg'
  },

  // --- FOUND ITEMS (3) ---
  {
    id: 'found-1',
    title: 'Type-C Laptop Charger',
    category: 'Electronics',
    type: 'found',
    location: 'Main Gate',
    date: '2026-10-26',
    description: 'White power adapter with Type-C cable wrapped around it. Deposited at Security Gate 1.',
    prn: '1032210889',
    email: '1032210889@mitwpu.edu.in',
    image: '/charger.jpeg'
  },
  {
    id: 'found-2',
    title: 'Grey Fabric Backpack',
    category: 'Bags',
    type: 'found',
    location: 'Vyas',
    date: '2026-10-26',
    description: 'Grey textured fabric laptop bag with front horizontal zipper pocket. Handed over to security desk.',
    prn: '1272250888',
    email: '1272250888@mitwpu.edu.in',
    image: '/bag.jpeg'
  },
  {
    id: 'found-3',
    title: 'Black Eyeglasses Case',
    category: 'Accessories',
    type: 'found',
    location: 'Chanakya',
    date: '2026-10-27',
    description: 'Hard matte black glasses case with minimal glasses logo outline on corner. Found on classroom bench.',
    prn: '1272250777',
    email: '1272250777@mitwpu.edu.in',
    image: '/glasses.jpeg'
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  // Using v2 storage key so it forces loading of the new image paths
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('mitwpu_lost_found_items_v2');
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  useEffect(() => {
    localStorage.setItem('mitwpu_lost_found_items_v2', JSON.stringify(items));
  }, [items]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleAddItem = (newItem) => {
    setItems([{ ...newItem, id: Date.now().toString() }, ...items]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => (item._id || item.id) !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#701c38] to-[#2b3a82] p-4 sm:p-8 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto">
        {currentUser && (
          <Navbar 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            onNavigate={setCurrentView} 
          />
        )}

        {currentView === 'login' && (
          <Login onLogin={handleLogin} />
        )}

        {currentView === 'dashboard' && currentUser && (
          <Dashboard 
            currentUser={currentUser} 
            onNavigate={setCurrentView} 
            onLogout={handleLogout} 
          />
        )}

        {currentView === 'lost_portal' && (
          <Lostportal 
            items={items} 
            onNavigate={setCurrentView} 
            onDeleteItem={handleDeleteItem} 
          />
        )}

        {currentView === 'found_portal' && (
          <Foundportal 
            items={items} 
            onNavigate={setCurrentView} 
            onDeleteItem={handleDeleteItem} 
          />
        )}

        {currentView === 'report_lost' && (
          <Reportlost 
            currentUser={currentUser} 
            onAddItem={handleAddItem} 
            onNavigate={setCurrentView} 
          />
        )}

        {currentView === 'report_found' && (
          <Reportfound 
            currentUser={currentUser} 
            onAddItem={handleAddItem} 
            onNavigate={setCurrentView} 
          />
        )}
      </div>
    </div>
  );
}

export default App;