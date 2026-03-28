import React, { useState, useEffect } from 'react';
import { FaSave, FaStore, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaInstagram, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function StoreSettings() {
  const [settings, setSettings] = useState({
    storeName: 'LittleCharm',
    contactEmail: 'hello@littlecharm.com',
    contactPhone: '+94 77 123 4567',
    address: '123 Clay Lane, Colombo, Sri Lanka',
    instagram: '@littlecharm_miniatures',
    facebook: 'LittleCharmMiniatures',
    currency: 'LKR',
    announcement: 'Welcome to our handcrafted world!',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage if exists
  useEffect(() => {
    const saved = localStorage.getItem('store_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    // Mimic API call
    setTimeout(() => {
      localStorage.setItem('store_settings', JSON.stringify(settings));
      setIsLoading(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-primary">Store Settings</h1>
          <p className="text-gray-400 text-sm">Manage your brand identity and contact information</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-secondary text-lite px-8 py-3 rounded-2xl font-bold hover:translate-y-[-2px] transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 text-accent rounded-lg">
              <FaStore />
            </div>
            <h3 className="font-bold text-primary">General Information</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Name</label>
              <input 
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                placeholder="Enter store name"
                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Announcement Banner</label>
              <input 
                name="announcement"
                value={settings.announcement}
                onChange={handleChange}
                placeholder="Enter announcement text"
                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm italic"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
              <FaEnvelope />
            </div>
            <h3 className="font-bold text-primary">Contact Details</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                  <input 
                    name="contactEmail"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-black/5 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                  <input 
                    name="contactPhone"
                    value={settings.contactPhone}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-black/5 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Business Address</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-300 text-xs" />
                <textarea 
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full bg-gray-50 border border-black/5 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Presence */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
           <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
              <FaGlobe />
            </div>
            <h3 className="font-bold text-primary">Social Presence</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instagram Handle</label>
              <div className="relative">
                <FaInstagram className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input 
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-black/5 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facebook Page</label>
              <div className="relative">
                <FaFacebook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input 
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-black/5 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance & Localization */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6 uppercase opacity-50 pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 text-green-500 rounded-lg">
              <FaGlobe />
            </div>
            <h3 className="font-bold text-primary">Appearance (Coming Soon)</h3>
          </div>
          <p className="text-xs text-center py-4 border-2 border-dashed border-gray-100 rounded-2xl">Theme customization and localization settings will be available in the next version.</p>
        </div>
      </div>
    </div>
  );
}
