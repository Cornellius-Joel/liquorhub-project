import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Signin from './components/Signin';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import MakePayment from './components/MakePayment';
import GetProducts from './components/GetProducts';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Footer from './components/Footer';   // ✅ ensure filename matches

import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './components/AdminDashboard';

// 🛒 Import Cart + CartProvider
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

// ✅ Import ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Liquor Hub.co.ke</h1>
          </header>

          {/* Navbar gets user + setUser */}
          <Navbar onSearch={setSearchTerm} user={user} setUser={setUser} />
          
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin setUser={setUser} />} />
            
            {/* Protected routes */}
            <Route 
              path='/addproduct' 
              element={
                <AdminRoute user={user}>
                  <AddProduct />
                </AdminRoute>
              } 
            />
            <Route 
              path='/admin' 
              element={
                <AdminRoute user={user}>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />  

            {/* ✅ Protect MakePayment */}
            <Route 
              path='/makepayment' 
              element={
                <ProtectedRoute user={user}>
                  <MakePayment user={user} />
                </ProtectedRoute>
              } 
            />

            <Route path='/cart' element={<Cart />} />   
            <Route path='/' element={<GetProducts searchTerm={searchTerm} />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Chatbot />
        <Footer/>
      </Router>
    </CartProvider>
  );
}

export default App;
