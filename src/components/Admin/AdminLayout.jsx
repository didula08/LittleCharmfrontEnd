import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { FaUserCircle, FaBell, FaBars } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Get admin name from localStorage or token if available
  const adminName = "Admin User"; // Fallback

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 md:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden text-primary text-xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars />
            </button>
            <div className="flex flex-col">
              <h2 className="text-base md:text-xl font-bold text-primary truncate max-w-[150px] sm:max-w-none">Admin Dashboard</h2>
              <p className="text-[10px] md:text-xs text-gray-400 hidden sm:block">Welcome back to LittleCharm Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative p-2 text-gray-400 hover:text-secondary cursor-pointer transition-colors">
              <FaBell className="text-lg md:text-xl" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-black/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-primary">{adminName}</p>
                <p className="text-[10px] text-accent uppercase font-bold tracking-wider">Super Admin</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-lite/50 flex items-center justify-center text-secondary border border-secondary/20">
                <FaUserCircle className="text-xl md:text-2xl" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
