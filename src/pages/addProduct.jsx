import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MediaUpload from '../utils/MediaUpload.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaTrash } from 'react-icons/fa';

export default function AddProductPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        toast.error("You are not logged in");
        return null;
    }

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState([]);
    const [description, setDescription] = useState("");
    const [imageFiles, setImageFiles] = useState([]); 
    const [labelledPrice, setLabelledPrice] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

   async function handleAddProduct() {
        if (imageFiles.length <= 0) {
            toast.error("Please select an image");
            return;
        }

        if (!productId || !name || !description || !labelledPrice || !price || !stock) {
            toast.error("Please fill in all the fields");
            return;
        }

        setIsUploading(true);
        try {
            const imageUrls = await Promise.all(
                imageFiles.map((file) => MediaUpload(file))
            );

            const product = {
                productId,
                name,
                altNames,
                description,
                image: imageUrls,
                labelledPrice: Number(labelledPrice),
                price: Number(price),
                stock: Number(stock),
                isAvailable,
            };

            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/products",
                product,
                {
                    headers: { "Authorization": 'Bearer ' + token },
                }
            );

            toast.success("Product added successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product");
        } finally {
            setIsUploading(false);
        }
    }

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
                    <h1 className="text-2xl font-bold text-primary">Add New Product</h1>
                    <p className="text-gray-400">Create a new entry in your collection</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Media */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-primary block">Product Media</label>
                        {!isUploading ? (
                            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-accent/40 transition-colors group cursor-pointer relative">
                                <FaCloudUploadAlt className="text-4xl text-gray-300 group-hover:text-accent transition-colors" />
                                <div className="text-xs text-gray-400">
                                    <span className="text-accent font-bold">Click to upload</span> or drag and drop<br/>
                                    (PNG, JPG, WEBP)
                                </div>
                                <input 
                                  type="file" 
                                  multiple 
                                  className="absolute inset-0 opacity-0 cursor-pointer" 
                                  onChange={(e) => setImageFiles([...imageFiles, ...Array.from(e.target.files)])}
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-black/5">
                                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-accent w-1/2 animate-loadingBar"></div>
                                </div>
                                <div className="text-xs font-bold text-accent uppercase tracking-widest animate-pulse">
                                    Uploading to Storage...
                                </div>
                            </div>
                        )}
                        {imageFiles.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected Images</label>
                                    <button 
                                        onClick={() => setImageFiles([])}
                                        className="text-[10px] text-red-400 hover:text-red-500 font-bold uppercase transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {imageFiles.map((file, i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-gray-50 border border-black/5 overflow-hidden group/img relative">
                                            <img 
                                                src={URL.createObjectURL(file)} 
                                                alt="" 
                                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
                                            />
                                            <button 
                                                onClick={() => setImageFiles(imageFiles.filter((_, idx) => idx !== i))}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer shadow-lg z-10"
                                            >
                                                <FaTrash size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product ID</label>
                                <input
                                    type="text"
                                    placeholder="e.g. LC-001"
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter product title..."
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alt Names (SEO)</label>
                            <input
                                type="text"
                                placeholder="Comma separated keywords..."
                                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                value={altNames.join(",")}
                                onChange={(e) => setAltNames(e.target.value.split(",").map((s) => s.trim()))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                            <textarea
                                placeholder="Tell the story of this product..."
                                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all h-32 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Label Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                    value={labelledPrice}
                                    onChange={(e) => setLabelledPrice(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-accent">Selling Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all font-bold text-primary"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inventory</label>
                                <input
                                    type="number"
                                    placeholder="Qty in stock"
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-black/5">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-primary">Availability</span>
                                <span className="text-xs text-gray-400 italic">Toggle visibility on the website</span>
                            </div>
                            <input
                                type="checkbox"
                                className="w-12 h-6 bg-gray-200 checked:bg-accent rounded-full appearance-none relative cursor-pointer transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 checked:before:translate-x-6 before:transition-transform"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                            />
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button
                                onClick={() => navigate("/admin/products")}
                                className="flex-1 bg-white border border-black/5 text-gray-500 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleAddProduct}
                                disabled={isUploading}
                                className={`flex-1 flex items-center justify-center gap-3 bg-secondary text-lite font-bold py-4 rounded-2xl shadow-lg shadow-secondary/20 hover:translate-y-[-2px] transition-all cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
                            >
                                <FaSave /> {isUploading ? 'Uploading...' : 'Publish Product'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isUploading && (
                <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center text-lite space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 border-4 border-lite/20 border-t-accent rounded-full animate-spin"></div>
                    <div className="flex flex-col items-center gap-1">
                        <h3 className="text-xl font-bold tracking-tight">Uploading Media</h3>
                        <p className="text-lite/60 text-sm animate-pulse">Please wait while we secure your images...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
