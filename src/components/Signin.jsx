import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = ({ setUser }) => {   // ✅ accept setUser from App.js
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading("Please wait as we sign you in...")
    setError("")

    try {
      const data = new FormData()
      data.append("email", email)
      data.append("password", password)

      const response = await axios.post("https://cornellius.alwaysdata.net/api/signin", data)
      setLoading("")

      if (response.data.user) {
        // ✅ store in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // ✅ update React state immediately
        setUser(response.data.user)
        // ✅ redirect
        navigate("/")
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }

  return (
    <div className='row mt-4 justify-content-center'>
      <div className='card shadow col-md-6 p-3 text-center'>
        <h1>Signin</h1>
        <h5 className='text-info'>{loading}</h5>
        <h5 className='text-danger'>{error}</h5>
        <form onSubmit={submit}>
          <input 
            type="email" 
            className='form-control' 
            placeholder='Enter email' 
            required 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
          /><br />
          
          <input 
            type="password" 
            className='form-control' 
            placeholder='Enter Password' 
            required 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
          /><br />
          
          <button type="submit" className='btn btn-primary'>Sign In</button>
        </form>
        <p>Don't have an Account? <Link to={'/signup'}>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Signin
