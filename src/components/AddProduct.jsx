import axios from 'axios'
import React, { useState } from 'react'

const AddProduct = () => {
  const [product_name,setProductName]=useState("")
  const [product_description, setProductDescription]=useState("")
  const [product_cost,setProductCost]=useState("")
  const [product_photo,setProductPhoto]=useState("")

  // hooks for storing error
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")
  const[loading,setLoading]=useState("")

  const submit=async (e)=>{

    e.preventDefault()
    setSuccess("")
    setError("")
    setLoading("wait as product is being uploaded...⏳")
    try {
      const data=new FormData()
      // appending
      data.append("product_name",product_name)
      data.append("product_description",product_description)
      data.append("product_cost",product_cost)
      data.append("product_photo",product_photo)

      const response=await axios.post("https://cornellius.alwaysdata.net//api/add_product",data)
      setLoading("")
      setSuccess(response.data.message)

      setProductName("")
      setProductDescription("")
      setProductCost("")
      
    
      
    } catch (error) {
      setLoading("")
      setSuccess("")
      setError(error.message)
      
    }

  }
  return (
    <div className='row mt-4 justify-content-center'>
      <div className="card shadow col-md-6 p-5 text-center">
        <h1>Add Product</h1>
        <h5 className='text-danger'>{error}</h5>
        <h5 className='text-info'>{loading}</h5>
        <h5 className='text-success'>{success}</h5>
         <form onSubmit={submit}>
          
         <input type="text" className='form-control' placeholder='Enter Product name' value={product_name} onChange={(e) => setProductName(e.target.value)} /> <br />

         <input type="text" className='form-control' placeholder='Describe your product.' required value={product_description} onChange={(e) => setProductDescription(e.target.value)} /> <br />
         <input type="number" className='form-control' placeholder='Product cost.'value={product_cost} onChange={(e) => setProductCost(e.target.value)}/><br />
         <b className='text-center text-primary'>Browse/upload product photo</b><br />
         <input type="file"  className='form-control' required accept='image/*' onChange={(e)=>setProductPhoto(e.target.files[0])} /> <br />
         <button type="submit" className="btn btn-primary">upload Product</button>
         </form>
      </div>
    </div>
   
  )
}

export default AddProduct