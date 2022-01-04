import React, { useRef, useState } from 'react'
import Footer from '../Footer/Footer'
import NavbarDA from '../Navbar/NavbarDA'
import background from '../Forms/background.png'
import app, { storage } from '../../firebase'
import { useHistory } from 'react-router'

function CreateM() {
    const nameRef = useRef()
    const emailRef = useRef()
    const descRef = useRef()
    var [image,setImage] = useState("")
    var Uid =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var [imagef,setImagef] = useState("")
    const [url, setUrl] = useState(null)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
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
            app.database().ref().child('mentor/'+Uid).set({
              username: nameRef.current.value,
              email:emailRef.current.value,
              prof: url,
              desc: descRef.current.value,
              id:Uid
  
          })
          history.push("/mentor")
          })
          
      });
       
        
    }
    const onImagechange= (event) =>
    {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImagef(event.target.files[0])

           
} 
    }
    
    return (
        <div>
        <NavbarDA></NavbarDA>
        <div style={{ backgroundImage: `url(${background})` ,
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundRepeat: 'no-repeat',
             width: '100vw',
             height: '100vh' }}>
             <div className='sett-form' >
            <form onSubmit={handleSubmit} className="form-input">
            <div className="form-content-right">
            <b>Mentor Profile</b>
            <input type="file" onChange={onImagechange}/>
            <img src={image || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="100" height="100"/>
            <div className='form-inputs'>
          <label className='form-label'>Mentor Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter mentor email'
            ref={emailRef} required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Mentor Name</label>
          <input
            className='form-input'
              placeholder='Username'
              ref={nameRef}
            />
        </div>
        <div className='form-inputs'>
          <label className='form-label' >Mentor Description</label>
          <input
            className='form-input'
            style={{height:"5rem"}}
              placeholder='Description'
              ref={descRef}
            />
        </div>
            
<button  className="settings-input-btn" type='submit'>
          Create
        </button>
      </div>
      
            </form>
            </div>
            </div>
        <Footer></Footer>
        </div>
    )
}

export default CreateM
