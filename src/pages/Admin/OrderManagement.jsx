import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FaClock, 
  FaCheckCircle, 
  FaTruck, 
  FaBoxOpen, 
  FaEye, 
  FaPrint, 
  FaTimes,
  FaFilter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Sort by date descending
      const sortedOrders = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}/${newStatus}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders(); 
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => (o.status || 'pending').toLowerCase() === filter);

  const stats = {
    all: orders.length,
    pending: orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending').length,
    shipped: orders.filter(o => o.status?.toLowerCase() === 'shipped').length,
    delivered: orders.filter(o => o.status?.toLowerCase() === 'delivered').length,
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-primary">Order Management</h1>
          <p className="text-gray-400">Track and manage customer orders</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-black/5 pb-1">
        {[
          { id: 'all', label: 'All Orders', count: stats.all },
          { id: 'pending', label: 'Pending', count: stats.pending },
          { id: 'shipped', label: 'Shipped', count: stats.shipped },
          { id: 'delivered', label: 'Delivered', count: stats.delivered },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              filter === tab.id 
                ? 'border-secondary text-secondary' 
                : 'border-transparent text-gray-400 hover:text-primary hover:bg-gray-50'
            }`}
          >
            {tab.label} <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${filter === tab.id ? 'bg-secondary text-lite' : 'bg-gray-100 text-gray-500'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] md:min-w-0">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-40 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 bg-gray-100 rounded-full mx-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-8 w-24 bg-gray-100 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary font-mono text-sm leading-none">#{order.orderId}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-bold text-gray-800">{order.name}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1"><FaEnvelope className="text-[8px]" /> {order.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        {order.products.map((p, idx) => (
                          <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-accent/10 flex items-center justify-center overflow-hidden" title={p.productInfo.name}>
                            {p.productInfo.images?.[0] ? (
                              <img src={p.productInfo.images[0]} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <FaBoxOpen className="text-xs opacity-40" />
                            )}
                          </div>
                        )).slice(0, 3)}
                        {order.products.length > 3 && (
                          <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                            +{order.products.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-extrabold text-primary">
                      Rs. {order.total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button 
                           onClick={() => setSelectedOrder(order)}
                           className="p-2 text-primary hover:bg-lite rounded-lg transition-colors cursor-pointer"
                           title="View Details"
                         >
                           <FaEye />
                         </button>
                         <select 
                          className="text-[10px] font-bold border border-black/5 rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-accent bg-gray-50"
                          value={order.status || 'pending'}
                          onChange={(e) => updateStatus(order.orderId, e.target.value)}
                        >
                          <option value="pending">PENDING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">No {filter !== 'all' ? filter : ''} orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-primary p-4 md:p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-lg md:text-xl font-bold">Order Details</h3>
                <p className="text-[10px] md:text-xs text-lite/60 font-mono">ID: #{selectedOrder.orderId}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* Customer Info */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400">Customer Details</h4>
                  <div className="space-y-2">
                    <p className="font-bold text-primary text-base md:text-lg">{selectedOrder.name}</p>
                    <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><FaEnvelope className="text-accent" /> {selectedOrder.email}</p>
                    <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2"><FaPhoneAlt className="text-accent" /> {selectedOrder.phone}</p>
                    <p className="text-xs md:text-sm text-gray-500 flex items-start gap-2 pt-1"><FaMapMarkerAlt className="text-accent mt-1 shrink-0" /> <span className="leading-tight">{selectedOrder.address}</span></p>
                  </div>
                </div>

                {/* Status & Date */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400">Order Info</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400">Placement Date</p>
                      <p className="text-sm md:text-base font-bold text-primary">{new Date(selectedOrder.date).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1.5">Status</p>
                      <select 
                        className={`text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full outline-none border-none cursor-pointer ${getStatusColor(selectedOrder.status)}`}
                        value={selectedOrder.status || 'pending'}
                        onChange={(e) => updateStatus(selectedOrder.orderId, e.target.value)}
                      >
                        <option value="pending">PENDING</option>
                        <option value="shipped">SHIPPED</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400">Ordered Items</h4>
                <div className="border border-black/5 rounded-xl md:rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left min-w-[500px] md:min-w-0">
                    <thead className="bg-gray-50 border-b border-black/5">
                      <tr className="text-[10px] text-gray-400 font-bold uppercase">
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {selectedOrder.products.map((item, idx) => (
                        <tr key={idx} className="text-xs md:text-sm">
                          <td className="px-4 py-3 font-medium text-primary">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                                <img src={item.productInfo.images?.[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <span className="truncate max-w-[150px]">{item.productInfo.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-500 font-bold">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-gray-500">Rs. {item.productInfo.price?.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-bold text-primary">Rs. {(item.productInfo.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-secondary/5 font-bold">
                       <tr>
                         <td colSpan="3" className="px-4 py-3 text-right text-primary uppercase text-[8px] md:text-[10px]">Total Amount</td>
                         <td className="px-4 py-3 text-right text-secondary text-base md:text-lg">Rs. {selectedOrder.total?.toLocaleString()}</td>
                       </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 md:p-6 bg-gray-50 border-t border-black/5 flex justify-end gap-2 md:gap-3 shrink-0">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-lg md:rounded-xl border border-black/10 text-gray-600 font-bold text-xs md:text-sm hover:bg-white transition-all cursor-pointer"
              >
                <FaPrint /> <span className="hidden sm:inline">Print Invoice</span>
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 rounded-lg md:rounded-xl bg-primary text-white font-bold text-xs md:text-sm hover:translate-y-[-2px] transition-all shadow-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
