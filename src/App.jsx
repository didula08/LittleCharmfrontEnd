// App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Login from './pages/login';
import SignUp from './pages/UserRegister';
import TestPage from './pages/testPage';
import MediaUpload from './utils/MediaUpload';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          {/* ⬇️ Make Home catch nested routes like /products, /about, etc. */}
          <Route path="/*" element={<Home />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path="/upload" element={<MediaUpload />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
