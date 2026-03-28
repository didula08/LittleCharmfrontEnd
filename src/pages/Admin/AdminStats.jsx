import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaExclamationTriangle,
  FaHistory
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import axios from 'axios';

const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-2xl border border-black/5 hover:shadow-xl transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
          {trendValue}%
        </div>
      )}
    </div>
    <p className="text-gray-400 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold text-primary mt-1">{value}</h3>
  </div>
);

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: [],
    recentOrders: [],
    salesData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(import.meta.env.VITE_BACKEND_URL + "/users", config),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/products", config),
          axios.get(import.meta.env.VITE_BACKEND_URL + "/orders", config)
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;

        const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
        
        // Group sales by date for the chart
        const groupedSales = orders.reduce((acc, order) => {
          const date = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const existing = acc.find(item => item.date === date);
          if (existing) {
            existing.revenue += order.total;
          } else {
            acc.push({ date, revenue: order.total });
          }
          return acc;
        }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

        // Get low stock products
        const lowStock = products.filter(p => p.stock < 10).slice(0, 5);

        setStats({
          totalUsers: usersRes.data.length,
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue: totalRevenue.toFixed(2),
          lowStockProducts: lowStock,
          recentOrders: orders.slice(0, 5),
          salesData: groupedSales.length > 0 ? groupedSales : [{ date: 'No Data', revenue: 0 }]
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-primary">Overview</h1>
        <p className="text-gray-400">Current business performance snapshot</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<FaUsers />} 
          color="bg-blue-500 text-blue-500"
          trend="up"
          trendValue="12"
        />
        <StatCard 
          title="Products" 
          value={stats.totalProducts} 
          icon={<FaBoxOpen />} 
          color="bg-purple-500 text-purple-500"
          trend="up"
          trendValue="4"
        />
        <StatCard 
          title="New Orders" 
          value={stats.totalOrders} 
          icon={<FaShoppingCart />} 
          color="bg-orange-500 text-orange-500"
          trend="down"
          trendValue="2"
        />
        <StatCard 
          title="Total Revenue" 
          value={`Rs. ${parseFloat(stats.totalRevenue).toLocaleString()}`}
          icon={<FaDollarSign />} 
          color="bg-green-500 text-green-500"
          trend="up"
          trendValue="18"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-primary">Revenue Overview</h3>
              <p className="text-xs text-gray-400">Sales performance over time</p>
            </div>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B7E74" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B7E74" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 10}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 10}}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '11px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8B7E74" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Widget */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-red-100 text-red-500 rounded-lg shrink-0">
              <FaExclamationTriangle />
            </div>
            <div>
              <h3 className="font-bold text-primary">Low Stock Alerts</h3>
              <p className="text-xs text-gray-400">Inventory attention</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {stats.lowStockProducts.length > 0 ? stats.lowStockProducts.map((product) => (
              <div key={product.productId} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-black/5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-white p-1 shrink-0">
                    <img src={product.image[0]} alt="" className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-primary truncate">{product.name}</p>
                    <p className="text-[10px] text-gray-400">Stock: {product.stock}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold shrink-0 ${product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  {product.stock === 0 ? 'Out' : 'Low'}
                </div>
              </div>
            )) : (
              <div className="py-12 text-center text-gray-300 italic text-sm">
                Levels healthy
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <FaHistory className="text-gray-400" />
            <h3 className="font-bold text-primary">Recent Orders</h3>
          </div>
          <button onClick={() => navigate('/admin/orders')} className="text-[10px] md:text-xs font-bold text-accent hover:underline cursor-pointer uppercase tracking-widest">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] md:min-w-0">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-black/5">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-primary">#{order.orderId}</td>
                  <td className="px-6 py-4 font-medium text-xs text-gray-600 truncate max-w-[150px]">{order.name}</td>
                  <td className="px-6 py-4 font-bold text-xs text-primary">Rs. {order.total?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[10px] text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400 italic text-sm">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
