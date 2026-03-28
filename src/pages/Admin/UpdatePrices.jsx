import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSave, FaTags, FaSearch } from 'react-icons/fa';

export default function UpdatePrices() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [changes, setChanges] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.productId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceChange = (productId, field, value) => {
    const numValue = parseFloat(value) || 0;
    setChanges(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: numValue
      }
    }));
  };

  const saveChanges = async () => {
    const productIds = Object.keys(changes);
    if (productIds.length === 0) return;

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    setIsLoading(true);
    try {
      await Promise.all(
        productIds.map(id => 
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, changes[id], config)
        )
      );
      toast.success("All prices updated successfully!");
      setChanges({});
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update some prices");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Price Management</h1>
          <p className="text-gray-400 text-sm">Quickly update product prices and discounts</p>
        </div>
        <button 
          onClick={saveChanges}
          disabled={Object.keys(changes).length === 0 || isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg w-full sm:w-auto justify-center text-sm ${
            Object.keys(changes).length > 0 
              ? 'bg-secondary text-lite hover:translate-y-[-2px] active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <FaSave /> Save {Object.keys(changes).length} Changes
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-black/5 flex items-center gap-4">
        <FaSearch className="text-gray-300" />
        <input 
          type="text" 
          placeholder="Search product by name or ID..." 
          className="flex-1 outline-none text-sm bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4 w-40 text-right">Labelled (Rs.)</th>
                <th className="px-6 py-4 w-40 text-right">Selling (Rs.)</th>
                <th className="px-6 py-4 w-28 text-right text-accent">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredProducts.map(product => {
                const currentLabel = changes[product.productId]?.labelledPrice !== undefined ? changes[product.productId].labelledPrice : product.labelledPrice;
                const currentPrice = changes[product.productId]?.price !== undefined ? changes[product.productId].price : product.price;
                const margin = currentLabel > 0 ? ((currentLabel - currentPrice) / currentLabel * 100).toFixed(1) : 0;
  
                return (
                  <tr key={product.productId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-black/5 shrink-0">
                          {product.image?.[0] && <img src={product.image[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-primary truncate max-w-[150px] md:max-w-[200px] text-xs md:text-sm">{product.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-mono tracking-tighter">ID: {product.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center">
                        <input 
                          type="number" 
                          step="0.01"
                          placeholder="0.00"
                          className={`w-24 text-right border rounded-lg px-2 py-1.5 focus:ring-1 transition-all text-xs font-bold ${
                            changes[product.productId]?.labelledPrice !== undefined ? 'border-secondary ring-1 ring-secondary/20 bg-secondary/5' : 'border-black/5'
                          }`}
                          defaultValue={product.labelledPrice}
                          onChange={(e) => handlePriceChange(product.productId, 'labelledPrice', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center">
                        <input 
                          type="number" 
                          step="0.01"
                          placeholder="0.00"
                          className={`w-24 text-right border rounded-lg px-2 py-1.5 focus:ring-1 transition-all text-xs font-bold ${
                            changes[product.productId]?.price !== undefined ? 'border-accent ring-1 ring-accent/20 bg-accent/5' : 'border-black/5'
                          }`}
                          defaultValue={product.price}
                          onChange={(e) => handlePriceChange(product.productId, 'price', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-xs md:text-sm font-bold ${margin < 10 ? 'text-red-500' : 'text-accent'}`}>
                        {margin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
