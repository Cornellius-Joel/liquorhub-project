import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetProducts from "./GetProducts"; // import your GetProducts component

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const isAdmin = true  // later replace with auth logic

  // fetch products
  const fetchProducts = async () => {
    setLoading("Loading products...")
    try {
      const res = await axios.get("https://cornellius.alwaysdata.net/api/get_products")
      setProducts(res.data)
      setLoading("")
    } catch (err) {
      setError("")
      setLoading("")
    }
  }



  // 🗑️ DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const data = new FormData();
      data.append("product_id", id);

      const res = await axios.post("https://cornellius.alwaysdata.net/api/delete_product", data);

      if (res.data.success) {
        toast.success(res.data.message || "Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed - check console for details");
    }
  };

  // ✏️ EDIT
  const editProduct = async (product) => {
    const newName = prompt("Enter new product name", product.product_name)
    const newCost = prompt("Enter new price", product.product_cost)

    if (!newName || !newCost) return

    try {
      const data = new FormData()
      data.append("product_id", product.product_id)
      data.append("product_name", newName)
      data.append("product_cost", newCost)

      await axios.post("https://cornellius.alwaysdata.net/api/update_product", data)

      toast.success("Product updated successfully")
      fetchProducts()
    } catch (err) {
      console.error(err);
      toast.error("Update failed")
    }
  }

  return (
    <div className='container mt-4'>
      <h2>Admin Dashboard</h2>

      <p className='text-info'>{loading}</p>
      <p className='text-danger'>{error}</p>
      <p className='text-success'>{success}</p>


      {/* Product list with admin controls */}
      <GetProducts
        searchTerm={""}
        isAdmin={isAdmin}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default AdminDashboard
