import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)   // send term up to App
  }

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
              <Link to={"/addproduct"} className="nav-link text-warning">Add Product</Link>
              <Link to={"/signin"} className="nav-link text-warning">Signin</Link>
              <Link to={"/signup"} className="nav-link text-warning">Signup</Link>
            </div>

            {/* Live search bar */}
            <input 
              className="form-control ms-auto" 
              type="search" 
              placeholder="Search products..." 
              aria-label="Search" 
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
