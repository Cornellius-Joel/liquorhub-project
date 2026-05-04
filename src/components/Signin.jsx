import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()

  const [loading,setLoading]=useState()
  const [error,setError]=useState()

  // hook for navigate
  const navigate=useNavigate()
  // function to handle signin
  const submit=async (e)=>{
    e.preventDefault()
    // console.log("Sign in function")
    setLoading("Please wait as we sign you in...")
    setError("")

    try {
      // create formdata object to hold our key-value pairs
      const data=new FormData()
      // use append method to attach/put the key-value pairs in the data object
      data.append("email",email)
      data.append("password",password)

      // send the data object to the flask api via the endpoint.
      // axios- library that allows us to send http requests post/get etc
      // await- used in an asychronous function it anebles to wait for response to reach before proceeding with execution of other lines of code
      // response- any request must have a response so response form api is stored in the respons variable.
      const response=await axios.post("https://cornellius.alwaysdata.net/api/signin",data)
      setLoading("")
      // making decision based on the
      if (response.data.user) {
        // storing the logged in user in the local storage
        localStorage.setItem("user",JSON.stringify(response.data.user))
         // redirect to get products component
         navigate("/")
      }else{
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
          {email}
          <input type="email" className='form-control' placeholder='Enter email' required value={email} onChange={(e)=>setEmail(e.target.value)} /><br />
          {password}
          <input type="password" className='form-control' placeholder='Enter Password' required value={password} onChange={(e)=>setPassword(e.target.value)} /><br />
          <button type="submit" className='btn btn-primary'>Sign In</button>
        </form>
        <p>Don't have an Account? <Link to={'/signup'}>Sign Up</Link></p>

      </div>
    </div>
  )
}


export default Signin;