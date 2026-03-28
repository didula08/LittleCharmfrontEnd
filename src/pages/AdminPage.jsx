import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import AdminProductPage from './adminProductPage';
import AddProductPage from './addProduct';
import EditProductPage from './editProductPage';
import AdminStats from './Admin/AdminStats';
import UserManagement from './Admin/UserManagement';
import OrderManagement from './Admin/OrderManagement';
import UpdatePrices from './Admin/UpdatePrices';
import Profile from './Admin/Profile';
import StoreSettings from './Admin/StoreSettings';

export default function AdminPage() {
  // Check if user is admin (this should be handled by a higher level auth wrapper too)
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminStats />} />
        <Route path="/products" element={<AdminProductPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="/editProduct" element={<EditProductPage />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/price-updates" element={<UpdatePrices />} />
        <Route path="/settings" element={<StoreSettings />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Redirect any other admin sub-routes to dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
