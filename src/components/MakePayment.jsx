import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const MakePayment = () => {

    const {product}=useLocation().state|| {}
    const [phone,setPhone]=useState("")
    const [message,setMessage]=useState("")
    const [error,setError]=useState("")

    const img_url="https://cornellius.alwaysdata.net/static/images/"

    const submit=async (e)=>{
        e.preventDefault()
        setMessage("Please wait as we process payment...")
        try {
            const data=new FormData()
            data.append("amount",product.product_cost)
            data.append("phone",phone)

            const response=await axios.post("http://cornellius.alwaysdata.net/api/mpesa_payment")
        } catch (error) {
            setMessage("")
            setError(error.message)
            
        }
    }

  return (
   <div className='row justify-content-center mt-5 text-center'>
    <h1 className='text-success'>Lipa na M-Pesa</h1>
        <h5 className='text-danger'>{error}</h5>
        <h5 className='text-success'>{message}</h5>
        
    <div className='col-md-6 text-center'>
        <div className="card shadow p-3">
           < img src={img_url+product.product_photo} alt="" className='product_img'/>
            <div className="card-body"> 
                <h5>product Name:{product.product_name}</h5>
                <p className='text-muted'>Description:{product.product_description}</p>
                <p className='text-warning'>cost:Ksh{product.product_cost}</p>
                <form onSubmit={submit}>
                    <p>Phone that will make Payment</p>
                    <input type="tel"placeholder='+254...' className='form-control' value={phone} required onChange={(e)=>setPhone(e.target.value)}/>

                    <button type='submit' className='btn btn-success'>Pay now</button>
                </form>

            </div>

        </div>

    </div>

   </div>
  )
}

export default MakePayment