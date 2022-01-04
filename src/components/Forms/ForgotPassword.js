import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import './Form.css';
import background from "./background.png";
import logo from "../Navbar/triteklogo.png"

export default function ForgotPassword() {
    const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("We just sent you your password reset link")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }
    return (
        <div style={{ backgroundImage: `url(${background})` ,
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             width: '100vw',
             height: '100vh' }}>
 <div className='login-form'>
   <div className="form-content-right" style={{marginBottom:"2rem"}}><img src={logo} alt="logo" /></div> 
      <form onSubmit={handleSubmit} className='form' noValidate>
      <p style={{color: "red"}}>{error}</p>
      <p style={{color: "green"}}>{message}</p>
      <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            ref={emailRef} required
          />
        </div>
        <button className="form-inputlogin-btn" type='submit' disabled={loading} style={{
            width: "100%",
            
            margin:"2rem 0",
            display:"block"
           
        }}>
          Reset Password
        </button> 
        
        <div>
         <p className="form-content-right" style ={{ width:"100%"}}><Link to="/">Sign Up</Link> | <Link to="/login">Login</Link></p>   
        </div> 
        <div>
         <p className="form-content-right" style ={{ width:"100%", marginTop:"1rem"}}><a href="">← Go to Tritek Consulting Ltd LMS</a></p>   
        </div>  
      </form>
    </div>
    
        </div>
    )
}
