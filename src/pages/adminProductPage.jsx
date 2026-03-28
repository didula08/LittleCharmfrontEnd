import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrash, 
  FaEdit, 
  FaPlus, 
  FaSearch, 
  FaBoxOpen, 
  FaCheck, 
  FaTimes,
  FaCheckSquare,
  FaSquare,
  FaEllipsisV
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingStock, setEditingStock] = useState(null); // productId
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.productId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'all') {
      const targetStatus = statusFilter === 'active';
      result = result.filter(p => p.isAvailable === targetStatus);
    }

    setFilteredProducts(result);
  }, [searchTerm, products, statusFilter]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    performDelete([productId]);
  };

  const performDelete = async (ids) => {
    const token = localStorage.getItem("token");
    try {
      // Assuming individual delete calls or backend supports bulk
      await Promise.all(ids.map(id => 
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, {
          headers: { "Authorization": "Bearer " + token }
        })
      ));
      toast.success(`${ids.length} product(s) deleted successfully`);
      setSelectedProducts([]);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete some products");
    }
  };

  const toggleStatus = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/${product.productId}`, 
        { ...product, isAvailable: !product.isAvailable },
        { headers: { "Authorization": "Bearer " + token } }
      );
      toast.success("Status updated");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const updateStock = async (product, newStock) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/${product.productId}`, 
        { ...product, stock: Number(newStock) },
        { headers: { "Authorization": "Bearer " + token } }
      );
      toast.success("Stock updated");
      setEditingStock(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update stock");
    }
  };

  const toggleSelect = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const selectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.productId));
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Products</h1>
          <p className="text-gray-400 text-sm">Manage your product catalog and inventory</p>
        </div>
        <Link
          to="/admin/addProduct"
          className="flex items-center gap-2 bg-secondary text-lite px-6 py-3 rounded-2xl font-bold hover:translate-y-[-2px] transition-all shadow-lg active:scale-95 w-full sm:w-auto justify-center text-sm md:text-base"
        >
          <FaPlus size={14} /> Add New Product
        </Link>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-black/5 shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full">
           <div className="relative flex-1 w-full">
             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
             <input 
               type="text" 
               placeholder="Search by name or ID..." 
               className="w-full bg-gray-50 border border-black/5 pl-11 pr-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <select 
             className="w-full sm:w-auto bg-gray-50 border border-black/5 px-4 py-2.5 rounded-xl outline-none text-sm font-bold text-gray-500 cursor-pointer focus:ring-2 focus:ring-accent/20"
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
           >
             <option value="all">All Status</option>
             <option value="active">Active Only</option>
             <option value="inactive">Inactive Only</option>
           </select>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-accent/5 rounded-xl border border-accent/10 whitespace-nowrap animate-fadeIn w-full lg:w-auto justify-center sm:justify-start">
            <span className="text-xs font-black text-accent mr-2">{selectedProducts.length} SELECTED</span>
            <button 
              onClick={() => performDelete(selectedProducts)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Selected"
            >
              <FaTrash size={14} />
            </button>
            <div className="h-4 w-px bg-accent/20 mx-1"></div>
            <button 
               onClick={() => setSelectedProducts([])}
               className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <FaTimes size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px] md:min-w-0">
            <thead>
              <tr className="bg-gray-50/50 border-b border-black/5">
                <th className="px-6 py-4 w-12 text-center">
                  <button 
                    onClick={selectAll}
                    className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 bg-white text-accent transition-colors mx-auto"
                  >
                    {selectedProducts.length > 0 && selectedProducts.length === filteredProducts.length ? <FaCheckSquare /> : (selectedProducts.length > 0 ? <div className="w-2.5 h-0.5 bg-accent"></div> : null)}
                  </button>
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Pricing</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Inventory</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="w-5 h-5 bg-gray-100 rounded mx-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-12 w-48 bg-gray-100 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-12 bg-gray-100 rounded ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-16 bg-gray-100 rounded-full mx-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-8 w-20 bg-gray-100 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr key={item.productId} className={`hover:bg-gray-50/50 transition-colors group ${selectedProducts.includes(item.productId) ? 'bg-secondary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleSelect(item.productId)}
                        className={`w-5 h-5 flex items-center justify-center rounded border transition-colors mx-auto ${
                          selectedProducts.includes(item.productId) 
                            ? 'bg-secondary border-secondary text-lite' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        {selectedProducts.includes(item.productId) && <FaCheck size={10} />}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-100 overflow-hidden border border-black/5 shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                          {item.image?.[0] ? (
                            <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300"><FaBoxOpen /></div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-primary truncate max-w-[150px] md:max-w-[200px] leading-tight text-xs md:text-sm">{item.name}</p>
                          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-mono tracking-tighter mt-1">ID: {item.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-extrabold text-primary text-xs md:text-sm">Rs. {item.price?.toLocaleString()}</p>
                      <p className="text-[9px] md:text-[10px] text-gray-400 line-through opacity-50">Rs. {item.labelledPrice?.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingStock === item.productId ? (
                        <div className="flex items-center justify-end gap-2">
                           <input 
                             type="number" 
                             autoFocus
                             className="w-16 bg-white border border-secondary rounded-lg px-2 py-1 text-xs font-bold text-right outline-none"
                             defaultValue={item.stock}
                             onKeyDown={(e) => {
                               if (e.key === 'Enter') updateStock(item, e.target.value);
                               if (e.key === 'Escape') setEditingStock(null);
                             }}
                             onBlur={(e) => updateStock(item, e.target.value)}
                           />
                        </div>
                      ) : (
                        <button 
                          onClick={() => setEditingStock(item.productId)}
                          className={`inline-block px-3 py-1 rounded-lg transition-colors cursor-pointer group/stock ${
                            item.stock < 10 ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                          }`}
                          title="Click to edit stock"
                        >
                          <span className="font-black text-xs md:text-sm">{item.stock}</span>
                          <FaEdit className="inline ml-2 opacity-0 group-hover/stock:opacity-100 transition-opacity text-[10px]" />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toggleStatus(item)}
                        className={`inline-flex px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 ${
                          item.isAvailable 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {item.isAvailable ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 md:gap-2">
                        <button 
                          onClick={() => navigate("/admin/editProduct", { state: item })}
                          className="p-2 md:p-2.5 text-blue-500 hover:bg-blue-50 rounded-lg md:rounded-xl transition-all cursor-pointer active:scale-90"
                          title="Edit Details"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => deleteProduct(item.productId)}
                          className="p-2 md:p-2.5 text-red-400 hover:bg-red-50 rounded-lg md:rounded-xl transition-all cursor-pointer active:scale-90"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                      <FaBoxOpen size={30} />
                    </div>
                    <div className="text-gray-400">
                      <p className="font-bold">No products matching your search</p>
                      <button onClick={() => {setSearchTerm(''); setStatusFilter('all');}} className="text-accent text-xs hover:underline mt-1 font-bold font-primary cursor-pointer">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
