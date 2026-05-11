import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../components/CartContext'   // 🛒 Import CartContext

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { cartItems } = useContext(CartContext)        // 🛒 Access cart state

  // 🔐 Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"))

  // ⚠️ TEMP admin check (since your API has no role)
  const isAdmin = user?.role === "admin"

  const handleChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  // 🛒 Calculate total quantity (not just item count)
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <nav className='navbar navbar-expand-md bg-dark'>
          <Link to={'/'} className='navbar-brand text-warning'>
            <img src="/images/logo.png" alt="logo" className="img-fluid" style={{ maxHeight: "80px" }} />
            Liquor Hub
          </Link>

          <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarcollapse">
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarcollapse'>
            <div className='navbar-nav me-auto'>
              <Link to={"/"} className="nav-link active text-warning">Home</Link>

              {/* 🔒 Show ONLY for admin */}
              {isAdmin && (
                <Link to={"/addproduct"} className="nav-link text-warning">
                  Add Product
                </Link>
              )}

              {!user && (
                <>
                  <Link to={"/signin"} className="nav-link text-warning">Signin</Link>
                  <Link to={"/signup"} className="nav-link text-warning">Signup</Link>
                </>
              )}

              {user && (
                <>
                  <span className="nav-link text-warning">
                    Welcome, {user.email}
                  </span>
                  {isAdmin && (
                    <Link to="/admin" className="nav-link text-warning">Admin Dashboard</Link>
                  )}
                  <button
                    className="btn btn-sm btn-outline-warning ms-2"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/signin"; // redirect to signin
                    }}
                  >
                    Logout
                  </button>
                </>
              )}

              {/* 🛒 Cart link */}
              <Link to="/cart" className="nav-link text-warning">
                Cart ({totalQuantity})
              </Link>
            </div>

            {/* 🔍 Live search */}
            <input
              className="form-control ms-auto"
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
