import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Form.css';
import background from "./background.png";
import logo from "../Navbar/triteklogo.png"
import { Link, useHistory } from 'react-router-dom';


export default function Loginform() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
   

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          history.push("/dashboard")
          
        } catch {
          setError("Failed to log in")
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
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            ref={passwordRef}
            required
          />
        </div>
        <div>
        <input type="checkbox" />
            <p style={{fontSize:"13px", display:"inline"}}><b>Remember me</b></p>
        </div>
        <button className="form-inputlogin-btn" type='submit' disabled={loading} style={{
            width: "100px",
            float: "right",
            margin:"2rem 0",
            display:"block"
           
        }}>
          Log in
        </button> 
        
        <div>
         <p className="form-content-right" style ={{ width:"100%"}}><Link to="/">Sign Up</Link> | <Link to="/forgot-password">Forgotten your password?</Link></p>   
        </div> 
        <div>
         <p className="form-content-right" style ={{ width:"100%", marginTop:"1rem"}}><a href="">← Go to Tritek Consulting Ltd LMS</a></p>   
        </div>  
      </form>
    </div>
    
        </div>
    )
}
