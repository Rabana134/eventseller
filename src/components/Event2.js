import React, { useEffect, useRef, useState } from 'react'
import NavbarDA from './Navbar/NavbarDA'
import './Event.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import "antd/dist/antd.css";
import { useAuth } from '../contexts/AuthContext';
import app, { storage } from '../firebase';
import Switch from "react-switch";
import { Redirect } from 'react-router';
import Footer from './Footer/Footer';
import LocationPicker from 'react-location-picker';
import emailjs from 'emailjs-com';



const defaultPosition = {
    lat: 27.9878,
    lng: 86.9250
  };
function Event2(props) {

  
    const [switch8, setSwitch8] = useState(false);
   
    const [switch10, setSwitch10] = useState(false);
    const [switch11, setSwitch11] = useState(false);
    const [switch12, setSwitch12] = useState(false);

    const [loading, setLoading] = useState(false)
    const eventDesRef = useRef()
    const linkDesRef = useRef()
    const priceRef = useRef()
    const DpriceRef = useRef()
    const { currentUser } = useAuth()
    var Uid = currentUser.uid; 
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    var [name,setName] = useState("")
    var [key,setKey] = useState("")
    const [image, setImage] = useState(null)
    const [imagef, setImagef] = useState(null)
    const [url, setUrl] = useState(null)
    const [dateD, setDateD] = useState(new Date());
    const mountedRef = useRef(true)
    const address= "Kala Pattar Ascent Trail, Khumjung 56000, Nepal"
    const position= {
       lat: 0,
       lng: 0
    }
    let month1 = myCurrentDate.getMonth();
let year = myCurrentDate.getFullYear();
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthName = monthNames[month1];
var graphid =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
var templateParams = {
  email: props.location.state.contactMail
};  

    useEffect(() => {
    if (!mountedRef.current)    
        app.database().ref("online/"+time+"/"+Uid).set(true)
        app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/key').on('value', snapshot => {
           
           setKey(snapshot.val()) 
            
       })
       setImage(props.location.state.imgurl);
       setImagef(props.location.state.file)
       mountedRef.current = false
      }, []);
  
    const onImagechange= (event) =>
    {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setImagef(event.target.files[0])
          }
    }
    
    async function handleSubmit2(e){
        e.preventDefault();
        const uploadTask = storage.ref(`images/${key}.png`).put(imagef);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
           // error function ....
        console.log(error);
        setLoading(false)
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(key+".png").getDownloadURL().then(url => {
            setUrl({url});
            const eventData = app.database().ref("events").child(key);
            const eventUser = app.database().ref("events-online").child(key);
        eventData.update({
            img: url,
            price: priceRef.current.value,
            type: "online",
            title: props.location.state.event,
            statedate: props.location.state.statedate,
            enddate:  props.location.state.enddate,
            zone:  props.location.state.zone,
            starttime:  props.location.state.starttime,
            endtime:  props.location.state.endtime,
            search: props.location.state.event.toUpperCase(),
            desc: eventDesRef.current.value,
            id: key,
            contact: props.location.state.contact,
            contactMail: props.location.state.contactMail
        })
        eventUser.update({
            img: url,
            price: priceRef.current.value,
            type: "online",
            title: props.location.state.event,
            statedate: props.location.state.statedate,
            enddate:  props.location.state.enddate,
            zone:  props.location.state.zone,
            starttime:  props.location.state.starttime,
            endtime:  props.location.state.endtime,
            search: props.location.state.event.toUpperCase(),
            desc: eventDesRef.current.value,
            id: key,
            contact: props.location.state.contact,
            contactMail: props.location.state.contactMail
        })

        app.database().ref().child('users/'+Uid).child("img").set(url)
        app.database().ref("graph_e/"+year+"/"+monthName+"/"+graphid).set(true)
        emailjs.send('service_xdq5h0e', 'template_09qddsa', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        setLoading(true)
        })
        
    });
       
        
      }
      async function saveHandle(e){
        e.preventDefault();
        const uploadTask = storage.ref(`images/${key}.png`).put(imagef);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
           // error function ....
        console.log(error);
        setLoading(false)
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(key+".png").getDownloadURL().then(url => {
            setUrl({url});
            const eventData = app.database().ref("events").child(key);
        eventData.update({
            img: url,
            price: priceRef.current.value,
            type: "draft",
            title: props.location.state.event,
            statedate: props.location.state.statedate,
            enddate:  props.location.state.enddate,
            zone:  props.location.state.zone,
            starttime:  props.location.state.starttime,
            endtime:  props.location.state.endtime,
            search: props.location.state.event.toUpperCase(),
            desc: eventDesRef.current.value,
            id: key,
            contact: props.location.state.contact,
            contactMail: props.location.state.contactMail
        })
        app.database().ref().child('users/'+Uid).child("img").set(url)

        setLoading(true)
        })
        
    });
       
        
      }
     function  handleLocationChange ( position, address, places ) {

        this.setState({ position, address });
      }
    

    return (
              <div>
              {!loading ? 
              <div>
              <NavbarDA name={name}/>
              
        <h3 style={{margin:"1rem"}}>Setting Price and Payments</h3>
            <div style={{marginLeft:"5rem"}}>
                <b>Price</b>
            </div>
            <form  onSubmit={handleSubmit2}>
            <div >
            <b style={{padding:"20px",borderRadius:"2px black"}}>£</b>
            <input
            style={{width:"100px"}}
            type='number'
            name='price'
            placeholder=''
            ref={priceRef}
          /> 
           <div style={{float: "right",display:"inline-table",marginRight:"5rem"}}>
           <div >
                <label >
      
     Discountable Early Bird
    </label>
                </div>
            <b style={{padding:"20px",borderRadius:"2px black"}}>£</b>
            <input
            style={{width:"100px"}}
            type='number'
            name='price'
            placeholder=''
            ref={DpriceRef}
          />
            </div>
              <div style={{float: "right",display:"inline-block"}}>
              <div style={{marginRight:"2rem"}}>
                <label >
      <input type="checkbox"/>
           Enable Early Bird Discount
    </label>
                </div>
         <DatePicker  selected={dateD}
      onChange={(dateD) => setDateD(dateD)} placeholderText="pick date"/>
         </div>
             <p style={{display:"block"}}>Enter 0 to indicate FREE</p>
             <div>
             <p style={{float: "right",display:"inline-block",marginRight:"5rem"}}>
Select the last day when this early price is offered and accepted.</p>
             </div>
            </div>
            </form>
          <div style={{display: "block",margin: "6rem 1rem"}}>
          <div>
        <div style={{marginLeft:"1rem"}}>
            <b>Reminder Email</b>
            <DatePicker  selected={dateD}
      onChange={(dateD) => setDateD(dateD)} placeholderText="pick date"/>
        </div>
          </div>

        <div style={{marginTop:"2rem"}}>
        <div style={{marginLeft:"1rem"}}>
            <b>Send reminders automatically by email to all attendees</b>
             <Switch  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            onChange={(check) => setSwitch8(check)} 
            checked={switch8}
            />
        </div>
        </div>

        <div style={{marginTop:"2rem"}}>
        
        <div style={{marginLeft:"1rem"}}>
            <b>Receive notification emails for every new registration</b>
             <Switch  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            onChange={(check) => setSwitch10(check)} 
            checked={switch10}
            />
        </div>
        </div>
          </div>

          <div>
              <h3 style={{marginLeft:"1rem"}}>Location / Virtual Meeting Link & Info</h3>
              <div style={{marginLeft:"1rem"}}>
        <b>Location</b>
        <div  style={{display: "inline"}}>
        <Switch  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            onChange={(check) => setSwitch11(check)} 
            checked={switch11}
            />
        </div>
        <div style={{display:"inline-block",marginLeft:"5rem"}}>
            <b>Virtual Meeting</b>
             <Switch  onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={10}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={40}
            onChange={(check) => setSwitch12(check)} 
            checked={switch12}
            />
        </div>
        </div>
        <form  onSubmit={handleSubmit2}>
            <div style={{marginLeft:"1rem",marginRight:"5rem"}}>
                <div>
                <input
                style={{height:"10rem",width:"100%"}}
            type='text'
            name='name'
            placeholder='Enter the  Web Meeting info and  link for this virtual event'
            ref={linkDesRef}
          />
                </div>
            </div>
            </form>
            <div>
          <LocationPicker
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '400px',width:"30rem", marginLeft:"1rem"} } /> }
            defaultPosition={defaultPosition}
            onChange={handleLocationChange}
          />
        </div>
            <div className="event-image" style={{marginTop:"5rem"}}>
            <div>
                <b>Cover Photo</b>
                <div style={{display:"inline", float:"right"}}>
                <input type="file" onChange={onImagechange}/>
                <div style={{display:"inline", float:"right"}}>
                </div>
            </div>
            </div>
            <img src={image || 'http://via.placeholder.com/400x300'} alt="logo" width="400" height="300"/>
            </div>
            <div style={{ float:"right",marginTop:"5rem"}}>
            <form  onSubmit={handleSubmit2}>
            <div style={{marginRight:"5rem"}}>
                <div>
                <input
                style={{height:"20rem",width:"500px"}}
            type='text'
            name='name'
            defaultValue={props.location.state.desc}
            placeholder='Full Detailed Description     EDIT'
            ref={eventDesRef}
          />
                </div>
            </div>
            </form>
            <div style={{marginTop:"2rem"}}>
<button className='form-input-btn-event' type='submit'  onClick={handleSubmit2}  style={{display:"inline-block",margin:"0"}}>
        Publish Online
        </button>
        <button className='form-input-btn-event' type='submit' onClick={saveHandle}  style={{display:"inline-block",margin:"0 1rem"}}>
        Save & Exit
        </button>  
            </div>
            </div>
          
        </div>
        </div>
        
              :
              <Redirect to={{ pathname: '/dashboard' }}     
        />
              }
             <Footer></Footer>
        </div>
      
    )
}

export default Event2
