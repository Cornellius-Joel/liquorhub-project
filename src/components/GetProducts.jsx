import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const GetProducts = ({ searchTerm }) => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  const navigate = useNavigate()
  const img_url = "https://cornellius.alwaysdata.net/static/images/"

  const getProducts = async () => {
    setError("")
    setLoading("wait as we load products...⏳")
    try {
      const response = await axios.get("https://cornellius.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // filter products live
  const filtered = products.filter(product => {
    const lower = searchTerm.toLowerCase()
    return (
      product.product_name.toLowerCase().includes(lower) ||
      product.product_description.toLowerCase().includes(lower) ||
      product.product_cost.toString().includes(lower)
    )
  })

  return (
    <div className="container mt-4">
      <h2 className="text-warning text-center">Available Products</h2>
      <h5 className="text-info">{loading}</h5>
      <h5 className="text-danger">{error}</h5>

      {/* Product Grid */}
      <div className="row mt-4">
        {filtered.map((product, index) => (
          <div key={index} className="justify-content-center col-md-3 mb-4">
            <div className="card shadow p-4 text-center card-margin bg-dark">
              <img src={img_url + product.product_photo} alt="" className="product_img mt-2" />
              <div className="card-body ">
                <h5 className="mt-2 text-info">{product.product_name}</h5> <hr />
                <h5 className="text-info">{product.product_description}</h5>
                <h5 className="text-warning mb-3">ksh {product.product_cost}</h5>
                <button
                  className="btn btn-dark text-warning "
                  onClick={() => navigate("/makepayment", { state: { product } })}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetProducts
