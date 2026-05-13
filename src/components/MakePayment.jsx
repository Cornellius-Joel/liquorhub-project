import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const MakePayment = ({ user }) => {
  const { product, cartItems } = useLocation().state || {}
  const [phone, setPhone] = useState("")
  const [delivery, setDelivery] = useState("")   // delivery address
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const img_url = "https://cornellius.alwaysdata.net/static/images/"

  // ✅ Fixed delivery fee (can be dynamic later)
  const DELIVERY_FEE = 200

  // ✅ Calculate subtotal (without delivery)
  const calculateSubtotal = () => {
    if (cartItems) {
      return cartItems.reduce((acc, item) => acc + item.product_cost * item.quantity, 0)
    }
    return product ? product.product_cost : 0
  }

  // ✅ Grand total = subtotal + delivery fee
  const calculateTotal = () => {
    return calculateSubtotal() + DELIVERY_FEE
  }

  // 🚫 Block non-logged users
  if (!user) {
    return (
      <div className="alert alert-warning text-center mt-5">
        <h3>You must create an account to make purchases.</h3>
        <Link to="/signup" className="btn btn-primary mt-3">Sign Up</Link>
        <Link to="/signin" className="btn btn-secondary mt-3">Sign In</Link>
      </div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage("Please wait as we process payment...")
    try {
      const data = new FormData()
      data.append("amount", calculateTotal()) // ✅ includes delivery fee
      data.append("phone", phone)
      data.append("delivery_address", delivery)

      await axios.post("http://cornellius.alwaysdata.net/api/mpesa_payment", data)
      setMessage("Payment request sent successfully ✅")
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

      <div className='col-md-8 text-center'>
        <div className="card shadow p-3">
          <h4 className="text-warning">Items to Pay</h4>

          {/* ✅ Show cart items if present */}
          {cartItems && cartItems.map((item) => (
            <div key={item.id} className="mb-3">
              <img
                src={img_url + item.product_photo}
                alt={item.product_name}
                width="80"
              />
              <p>{item.product_name} — ksh {item.product_cost} × {item.quantity}</p>
            </div>
          ))}

          {/* ✅ Show single product if present */}
          {product && (
            <div className="mb-3">
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                width="80"
              />
              <p>{product.product_name} — ksh {product.product_cost}</p>
            </div>
          )}

          {/* ✅ Show breakdown */}
          <h3 className="text-success">Subtotal: ksh {calculateSubtotal()}</h3>
          <h4 className="text-info">Delivery Fee: ksh {DELIVERY_FEE}</h4>
          <h2 className="text-success">Grand Total: ksh {calculateTotal()}</h2>

          <form onSubmit={submit}>
            <p>Phone that will make Payment</p>
            <input
              type="tel"
              placeholder='+254...'
              className='form-control'
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <p>Delivery Address</p>
            <input
              type="text"
              placeholder='Enter delivery location'
              className='form-control'
              value={delivery}
              required
              onChange={(e) => setDelivery(e.target.value)}
            />
            <button type='submit' className='btn btn-success mt-3'>Pay now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MakePayment
