import React, { useRef } from 'react'
import Footer from '../Footer/Footer'
import NavbarDA from '../Navbar/NavbarDA'
import emailjs from 'emailjs-com';
import background from '../Forms/background.png';

function Single(props) {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        var templateParams = {
          email: props.location.state.email
        };  
        emailjs.sendForm('service_xdq5h0e', 'template_09qddsa', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
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
             <img src={props.location.state.img || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="100" height="100"/>
             <b>{props.location.state.name}</b>
             <form ref={form} onSubmit={sendEmail}>
      <textarea name="message" placeholder="Message" style={{width:"50rem",height:"10rem"}}/>
      <input type="submit" value="Send" />
    </form>  
             </div>
            
           </div>
            
        <Footer/> 
        </div>
    )
}

export default Single
