import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../utils/MediaUpload";
import axios from "axios";
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaTrash } from 'react-icons/fa';

export default function EditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const st = location.state ?? null;

  useEffect(() => {
    if (!st) navigate("/admin/products", { replace: true });
  }, [st, navigate]);

  const [productId, setProductId] = useState(st?.productId ?? "");
  const [name, setName] = useState(st?.name ?? "");
  const [altNames, setAltNames] = useState(
    Array.isArray(st?.altNames) ? st.altNames.join(",") : (st?.altNames ?? "")
  );
  const [description, setDescription] = useState(st?.description ?? "");
  const [imageFiles, setImageFiles] = useState([]); 
  const [currentImages, setCurrentImages] = useState(st?.image || []);
  const [labelledPrice, setLabelledPrice] = useState(st?.labelledPrice ?? "");
  const [price, setPrice] = useState(st?.price ?? "");
  const [stock, setStock] = useState(st?.stock ?? "");
  const [isUploading, setIsUploading] = useState(false);

  const handleDeleteImage = (index) => {
    const updated = currentImages.filter((_, i) => i !== index);
    setCurrentImages(updated);
    toast.success("Image removed from gallery (remember to save changes)");
  };

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrls = [...currentImages];

      if (imageFiles && imageFiles.length > 0) {
        const uploaded = await Promise.all(
          [...imageFiles].map((f) => MediaUpload(f))
        );
        imageUrls = [...imageUrls, ...uploaded];
      }

      const product = {
        productId: String(productId).trim(),
        name: String(name).trim(),
        altNames: String(altNames).split(",").map((s) => s.trim()).filter(Boolean),
        description: String(description).trim(),
        image: imageUrls,
        labelledPrice: Number(labelledPrice),
        price: Number(price),
        stock: Number(stock),
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Update failed");
    } finally {
      setIsUploading(false);
    }
  }

  if (!st) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white border border-black/5 rounded-xl text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          >
              <FaArrowLeft />
          </button>
          <div>
              <h1 className="text-2xl font-bold text-primary">Edit Product</h1>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-tight">Product ID: {productId}</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-6">
                  <div className="space-y-4">
                      <label className="text-sm font-bold text-primary block">Update Media</label>
                        {!isUploading ? (
                            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-accent/40 transition-colors group cursor-pointer relative">
                                <FaCloudUploadAlt className="text-4xl text-gray-300 group-hover:text-accent transition-colors" />
                                <div className="text-xs text-gray-400 leading-relaxed">
                                    Select new images to<br/>
                                    <span className="text-accent font-bold italic">add</span> to the gallery
                                </div>
                                <input 
                                  type="file" 
                                  multiple 
                                  className="absolute inset-0 opacity-0 cursor-pointer" 
                                  onChange={(e) => setImageFiles(e.target.files || [])}
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-black/5">
                                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-accent w-1/2 animate-loadingBar"></div>
                                </div>
                                <div className="text-xs font-bold text-accent uppercase tracking-widest animate-pulse">
                                    Updating Gallery...
                                </div>
                            </div>
                        )}
                  </div>

                  {currentImages.length > 0 && (
                      <div className="space-y-4">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Gallery</label>
                          <div className="grid grid-cols-2 gap-3">
                              {currentImages.map((url, i) => (
                                  <div key={i} className="aspect-square rounded-xl bg-gray-50 border border-black/5 overflow-hidden group/img relative">
                                      <img src={url} alt="" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                                      <button 
                                        onClick={() => handleDeleteImage(i)}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer shadow-lg z-10"
                                        title="Remove Image"
                                      >
                                        <FaTrash className="text-[10px]" />
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Title</label>
                      <input
                          type="text"
                          className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-primary"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>

                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alt Names / Keywords</label>
                      <input
                          type="text"
                          className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                          value={altNames}
                          onChange={(e) => setAltNames(e.target.value)}
                      />
                  </div>

                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea
                          className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all h-32 resize-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Label Price</label>
                          <input
                              type="number"
                              className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                              value={labelledPrice}
                              onChange={(e) => setLabelledPrice(e.target.value)}
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-accent">Selling Price</label>
                          <input
                              type="number"
                              className="w-full bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-primary"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Initial Stock</label>
                          <input
                              type="number"
                              className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                              value={stock}
                              onChange={(e) => setStock(e.target.value)}
                          />
                      </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                      <Link
                          to="/admin/products"
                          className="flex-1 text-center bg-white border border-black/5 text-gray-500 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
                      >
                          Cancel
                      </Link>
                      <button
                          className={`flex-1 flex items-center justify-center gap-3 bg-secondary text-lite font-bold py-4 rounded-2xl shadow-lg shadow-secondary/20 hover:translate-y-[-2px] transition-all cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
                          onClick={updateProduct}
                          disabled={isUploading}
                      >
                          <FaSave /> {isUploading ? 'Saving...' : 'Update Product'}
                      </button>
                  </div>
              </div>
          </div>
          {isUploading && (
              <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center text-lite space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 border-4 border-lite/20 border-t-accent rounded-full animate-spin"></div>
                  <div className="flex flex-col items-center gap-1">
                      <h3 className="text-xl font-bold tracking-tight">Syncing Product Changes</h3>
                      <p className="text-lite/60 text-sm animate-pulse">Wait a moment while we update your collection...</p>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}
