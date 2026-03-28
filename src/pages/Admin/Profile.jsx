import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserShield, FaKey, FaSave, FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
    confirmPassword: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsUpdating(true);
    try {
      const updatePayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      if (formData.password) {
        updatePayload.password = formData.password;
      }

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.email}`, updatePayload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Profile updated! Please log in again for changes to take effect.");
      // Optionally logout or refresh token here
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-primary">Account Settings</h1>
        <p className="text-gray-400">Manage your administrative profile and security</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-8 bg-primary text-lite flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-lite/20 flex items-center justify-center text-4xl">
            <FaUserCircle />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
            <p className="text-lite/60 text-sm">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase rounded-full">
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">First Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 space-y-6">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <FaKey />
              <span>Change Password</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                <input 
                  type="password" 
                  placeholder="Leave blank to keep current"
                  className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-mono"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-mono"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={isUpdating}
              className={`w-full flex items-center justify-center gap-3 bg-secondary text-lite font-bold py-4 rounded-2xl shadow-lg shadow-secondary/20 hover:translate-y-[-2px] transition-all cursor-pointer ${isUpdating ? 'opacity-50' : ''}`}
            >
              <FaSave /> {isUpdating ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {user?.email === "admin@littlecharm.com" && (
        <div className="p-6 bg-lite/30 rounded-2xl border border-secondary/20 flex items-start gap-4">
          <FaUserShield className="text-xl text-secondary mt-1" />
          <div className="text-xs text-secondary leading-relaxed">
            <p className="font-bold uppercase tracking-wider mb-1">Super Admin Account</p>
            <p>You are logged in as the Super Admin. This account has full access and cannot be deleted for security reasons. Remember to use a strong, unique password.</p>
          </div>
        </div>
      )}
    </div>
  );
}
