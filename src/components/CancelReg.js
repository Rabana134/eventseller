import React from 'react'
import Footer from './Footer/Footer'
import NavbarDA from './Navbar/NavbarDA'
import background from './Forms/background.png'
import app from '../firebase'
import { useHistory } from 'react-router-dom'

function CancelReg(props) {
    const history = useHistory()
    return (
        <div>
             <NavbarDA/>
          <div style={{ backgroundImage: `url(${background})` ,
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             width: '100vw',
             height: '100vh' }}>
<div className='login-form'>
<img src={props.location.state.prof || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="100" height="100"/>
<b>{props.location.state.name}</b>
    <h3>Are you sure?</h3>
    <p>Are you sure you want to cancel this users registration?</p>
    <button  className="book-event" type='submit'  onClick={()=>
        {app.database().ref("regs").child(props.location.state.id).remove()
        app.database().ref(props.location.state.title).child(props.location.state.key).remove()
        history.push("/attendee")}} style={{display:"inline-block",margin:"0"}}>
        Yes          
        </button>
        <button  className="book-event" type='submit'  onClick={()=>
        {
            history.push("/attendee")}} style={{display:"inline-block",margin:"0 1rem"}}>
        No          
        </button>
</div>
          </div>
        <Footer/> 
        </div>
    )
}

export default CancelReg
