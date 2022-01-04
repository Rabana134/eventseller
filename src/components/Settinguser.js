import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {getAuth, updateEmail } from "firebase/auth";
import app, { storage } from '../firebase'
import Footer from './Footer/Footer'
import  './Forms/Form.css'
import NavbarUs from './Navbar/NavbarUs'
import '../App.css'
import { Link } from 'react-router-dom'
import background from './Forms/background.png';

function Settinguser() {
    var [name,setName] = useState("")
    var [email,setEmail] = useState("")
    var [phone,setPhone] = useState("")
    var [image,setImage] = useState("")
    var [imagef,setImagef] = useState("")
    const { currentUser } = useAuth()
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const [url, setUrl] = useState(null)
    const auth = getAuth();
    
    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
   
          app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/email').on('value', snapshot => {
            
          setEmail(snapshot.val()) 
           
      })
      app.database().ref().child('users/'+Uid+'/phone').on('value', snapshot => {
            
        setPhone(snapshot.val()) 
         
    })
    app.database().ref().child('users/'+Uid+'/profile/url/').on('value', snapshot => {
            
      setImage(snapshot.val()) 
       
  })
    }, [])
    async function handleSubmit(e){
      e.preventDefault()
      updateEmail(auth.currentUser, emailRef.current.value).then(() => {
        app.database().ref("users/"+Uid).update({
          username: nameRef.current.value,
          phone: phoneRef.current.value,
          email: emailRef.current.value,
          profile: url
        })
          e.reset()
      }).catch((error) => {
        // An error occurred
        // ...
      });
       
    }
    const onImagechange= (event) =>
    {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImagef(event.target.files[0])

            const uploadTask = storage.ref(`images/${Uid}.png`).put(imagef);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(Uid+".png").getDownloadURL().then(url => {
            setUrl({url});
        })
        
    });
          }
    }
    return (
        <div >
        <NavbarUs name={name}></NavbarUs>
        <div style={{ backgroundImage: `url(${background})` ,
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             width: '100vw',
             height: '100vh' }}>
             <div className='sett-form' >
            <form onSubmit={handleSubmit} className="form-input">
            <div className="form-content-right">
            <b>Change Profile</b>
            <input type="file" onChange={onImagechange}/>
            <img src={image || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="100" height="100"/>
            <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            defaultValue= {email}
            ref={emailRef} required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Account Name</label>
          <input
            className='form-input'
              placeholder='Username'
              defaultValue= {name}
              ref={nameRef}
            />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Telephone</label>
          <input
            className='form-input'
              placeholder='Telephone'
              defaultValue= {phone}
              ref={phoneRef}
            />
        </div>
        <div style={{margin:"1rem 0"}}>
           <Link to="/forgot-password">Reset password?</Link>
        </div>
            
<button  className="settings-input-btn" type='submit'>
          Save
        </button>
      </div>
      
            </form>
            </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Settinguser
