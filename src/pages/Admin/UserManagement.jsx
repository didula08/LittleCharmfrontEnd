import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaTrash } from 'react-icons/fa';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (email === "admin@littlecharm.com") {
      toast.error("Super Admin cannot be deleted");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user ${email}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">User Management</h1>
          <p className="text-gray-400">View and manage all registered users</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 w-10 bg-gray-100 rounded-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-12 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-8 bg-gray-100 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary font-bold">
                          {user.img ? (
                            <img src={user.img} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <FaUserCircle className="text-2xl opacity-40" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-400 uppercase tracking-tighter">ID: {user._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm text-gray-600">
                          <FaEnvelope className="text-xs text-accent" /> {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        user.role?.toLowerCase() === 'admin' 
                          ? 'bg-primary text-lite' 
                          : 'bg-lite/30 text-secondary'
                      }`}>
                        <FaShieldAlt className="text-[10px]" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.email !== "admin@littlecharm.com" ? (
                        <button 
                          onClick={() => handleDelete(user.email)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-widest px-2">Protected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
