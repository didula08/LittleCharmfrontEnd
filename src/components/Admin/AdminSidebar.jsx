import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBox, 
  FaUsers, 
  FaShoppingCart, 
  FaChartLine, 
  FaTags,
  FaSignOutAlt,
  FaHome,
  FaUserCircle,
  FaCog,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: <FaChartLine /> },
  { name: 'Products', path: '/admin/products', icon: <FaBox /> },
  { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
  { name: 'Orders', path: '/admin/orders', icon: <FaShoppingCart /> },
  { name: 'Price Updates', path: '/admin/price-updates', icon: <FaTags /> },
  { name: 'Store Settings', path: '/admin/settings', icon: <FaCog /> },
  { name: 'Profile', path: '/admin/profile', icon: <FaUserCircle /> },
];

export default function AdminSidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen bg-primary text-white flex flex-col shadow-2xl z-20 overflow-hidden transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-accent rounded-full text-primary flex items-center justify-center text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform z-30"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Logo Section */}
      <div className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-10 h-10 rounded-xl bg-accent overflow-hidden flex items-center justify-center shrink-0">
          <img src="/logo1.png" alt="LC" className="w-8 h-8 object-contain" />
        </div>
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-tight animate-fadeIn">
            LittleCharm <span className="text-xs block font-normal opacity-60 font-mono">ADMIN v1.0</span>
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar mt-4">
        {!isCollapsed && (
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-lite/30 mb-6 px-3 animate-fadeIn">Management</p>
        )}
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 px-4'} py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-secondary text-lite shadow-lg shadow-black/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="font-bold text-sm tracking-wide animate-fadeIn">{item.name}</span>
              )}
              {!isCollapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-lite animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className={`p-4 border-t border-white/10 space-y-2 ${isCollapsed ? 'items-center' : ''}`}>
        <Link 
          to="/" 
          title={isCollapsed ? 'Main Website' : ''}
          className={`flex items-center ${isCollapsed ? 'justify-center border border-white/5 shadow-inner' : 'gap-4 px-4'} py-3 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all w-full`}
        >
          <FaHome />
          {!isCollapsed && <span className="font-bold text-xs uppercase tracking-widest">Store Front</span>}
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          title={isCollapsed ? 'Logout' : ''}
          className={`flex items-center ${isCollapsed ? 'justify-center bg-red-500/10' : 'gap-4 px-4'} py-3 rounded-xl text-red-400 hover:bg-red-400/20 transition-all w-full cursor-pointer group`}
        >
          <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-black text-xs uppercase tracking-widest">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
