import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // hooks using usestate that will be updated later in the program
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("") 
  // hook to store the error status
  const [error, setError]=useState("")
  const [loading, setLoading]=useState("")
  const [success,setSuccess]=useState("")
  const submit=async(e)=>{

    // this prevents the page from reloading on clicking the submitting button
    // The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be

    
  
    e.preventDefault()
    setSuccess("")
    setError("")
    setLoading("wait as you get Registered")
    try {
      // prepare our data- FormData
      // create FormData object which allow the key value pairs
      const data=new FormData()
      // append key
      data.append("username",username) 
      data.append("email",email)
      data.append("phone",phone)
      data.append("password",password)
      // axios is a library that help in sending/making different types of http requests to our api ie post, get,delete & patch

      const response=await axios.post("https://cornellius.alwaysdata.net/api/signup",data)
      setLoading("")
      setSuccess(response.data.message)
      // clear our hook start after a successful submission
      setUsername("")
      setEmail("")
      setPhone("")
      setPassword("")

    } catch (error) {
      setLoading("")
      setSuccess("")
      setError(error.message)
    }
  }  

  return (
    <div className='row mt-4 justify-content-center'>
      <div className="card shadow col-md-6 p-3 text-center ">
        <h1>Sign up</h1>
        <h5 className='text-danger'>{error}</h5>
        <h5 className='text-info'>{loading}</h5>
        <h5 className='text-success'>{success}</h5>
        <form onSubmit={submit}>
          {username}

          <input type='text' placeholder='Enter username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} /> <br />

          {email}
          <input type='email' placeholder='Enter email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

          {phone}
          <input type='tel' placeholder='Enter phone' className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} /> <br />

          {password}
          <input type='password' placeholder='Enter password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <button type="submit" class="btn btn-primary">Sign Up</button>
                       
          <p>Already have an Account? <Link to={'/signin'}>Sign In</Link></p>
        </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

      </div>

    </div>




  )
}

export default Signup

