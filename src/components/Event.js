import React, { useEffect, useRef, useState } from 'react'
import NavbarDA from './Navbar/NavbarDA'
import './Event.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import moment from 'moment';
import { TimePicker } from 'antd';
import "antd/dist/antd.css";
import { useAuth } from '../contexts/AuthContext';
import app from '../firebase';
import Switch from "react-switch";
import { Redirect } from 'react-router';
import Footer from './Footer/Footer';


function Event() {
    const eventNameRef = useRef()
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [loading, setLoading] = useState(false)
    const contactNameRef = useRef()
    const emailNameRef = useRef()
    const eventDesRef = useRef()
    const { currentUser } = useAuth()
    var Uid = currentUser.uid; var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    const [name,setName] = useState("")
    const [url,setUrl] = useState("")
    var [date, setDate] = useState(new Date());
    var [date2, setDate2] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [selectedTime2, setSelectedTime2] = useState("00:00");
    const [zoneRef, setZone] = useState("Europe/London");
    var key = app.database().ref().push().key;
    const dateend = moment(date2).format('LL')
    const datestart = moment(date).format('LL')
    const [image, setImage] = useState(null)
    const [imagef, setImagef] = useState(null)
    const[list, setList] = useState([]);
    const[emaillist, setEList] = useState([]);

    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
        app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/img').on('value', snapshot => {
           
           setUrl(snapshot.val()) 
            
       })
       app.database().ref("mentor").orderByChild("name").on("value", snapshot => {
        let memberlist = [];
        snapshot.forEach(snap => {
            memberlist.push(snap.val());
        });
        setList(memberlist)
      });
      }, []);
    function handleSubmit(e){
        e.preventDefault();
        
        app.database().ref().child('users/'+Uid+'/key').set(key)
         setLoading(true)
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
            <NavbarDA name= {name}/>
            {!loading ? 
            <>
            <div style={{display:"inline-block",margin:"3rem"}}>
            <div>
                <b>Cover Photo</b>
                <div style={{display:"inline", float:"right"}}>
                <input type="file" onChange={onImagechange}/>
            </div>
            </div>
            <img src={image || 'http://via.placeholder.com/400x300'} alt="logo" width="400" height="300"/>
            </div>
            <div style={{display:"inline-block"}}>
            <form onSubmit={handleSubmit}>
            <div style={{display:"inline-block",width: "300px",marginLeft:"1rem"}}>
            <label className='form-label-event'>Events Name & Title</label>
          <input
            className='form-input-event'
            type='text'
            name='name'
            placeholder='Enter your title'
            ref={eventNameRef} required
          />
            </div>
             <div style={{display:"inline-block",width: "300px",marginLeft:"1rem"}}>
            <label className='form-label-event'>Start date</label>
            <DatePicker className='form-input-event' selected={date}
      onChange={(date) => setDate(date)} placeholderText="pick date" />
            </div>
            </form>
            <div style={{display:"inline-block",width: "300px",marginLeft:"1rem"}}>
            <label className='form-label-event'>End date</label>
            <DatePicker className='form-input-event' selected={date2}
      onChange={(date2) => setDate2(date2)} placeholderText="pick date"/>
      
            </div>
            <div className="form-input-event" style={{marginLeft:"1rem"}}>
                Repeat
                 <form onSubmit={handleSubmit}>
                <div>
                
                <label >
      <input type="checkbox"
        onChange={() => setChecked4(!checked4)}
      />
      Daily
    </label>
                </div>
                <div>
                <label >
      <input type="checkbox"
        onChange={() => setChecked5(!checked5)}
      />
      Monthly
    </label>
                </div>
                <div>
                <label >
      <input type="checkbox"
        onChange={() => setChecked6(!checked6)}
      />
     Yearly
    </label>
                </div> 
                </form>
            </div>
            </div>
      
            <form onSubmit={handleSubmit}>
               <div style={{marginLeft:"3rem",marginBottom:"1rem", display:"inline-block"}}>
            <TimezonePicker absolute = {false} defaultValue  = "Europe/London"  onChange={(zone) => setZone(zone)} placeholder="Select timezone..."required/>
            </div> 
            <div style={{display:"inline-block",width: "300px",marginLeft:"1rem"}}>
            <label className='form-label-event'>Start time</label>
            <TimePicker
            format="HH:mm a"  
    value={moment(selectedTime, "HH:mm a")}
    onSelect={(value) => {
      const timeString = moment(value).format("HH:mm a");
      setSelectedTime(timeString)
}} />
            </div>
            <div style={{display:"inline-block",width: "270px"}}>
            <label className='form-label-event'>End time</label>
            <TimePicker format="HH:mm a" 
    value={moment(selectedTime2, "HH:mm a")}
    onSelect={(value) => {
      const timeString = moment(value).format("HH:mm a");
      setSelectedTime2(timeString)
}} />
            </div>
            <div className="form-input-event" >
                Select Mentors
                {list.map(data => {
                
                return (
                  <form onSubmit={handleSubmit}>
                <div>
                
                <label >
      <input type="checkbox"
        onChange={() => setChecked1(!checked1)}
      />
      {data.username}
    </label>
                </div>
                </form>
                 
                );
               
                })}
               
            </div>
            </form>
            <div className="form-input-event" style={{marginLeft:"3rem",display:"intent-block"}}>
            Events Contact Information
            <form onSubmit={handleSubmit}>
            <div style={{marginTop:"2rem"}}>
            <label className='form-label-event' >Contact Name & Position</label>
          <input
            className='form-input-event'
            type='text'
            name='name'
            placeholder='Moni Blogs '
            ref={contactNameRef} 
          />
            </div>
            <div >
            <label className='form-label-event'>Public Email Adresss</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Mblogs@qmatic.com'
            ref={emailNameRef}
          />
            </div>
           <button style={{float:"right", color:"blue",background:"white",border:"none"}} onClick={()=>{
             if(emailNameRef.current.value!="")
             {
                setEList(oldArray => [...oldArray,emailNameRef.current.value])
             emailNameRef.current.value="";
             console.log(emaillist)
             }
           }}><b>+Add</b></button>
           <div>
             <p>{emaillist[0]}</p>
             <p>{emaillist[1]}</p>
             <p>{emaillist[2]}</p>
             <p>{emaillist[3]}</p>
             <p>{emaillist[4]}</p>
             <p>{emaillist[5]}</p>
             <p>{emaillist[6]}</p>
             <p>{emaillist[7]}</p>
             <p>{emaillist[8]}</p>
             <p>{emaillist[9]}</p>
           </div>
            </form>
            </div>
            <div style={{marginLeft:"3rem",marginRight:"3rem"}}>
                Event Description
                <div>
                <form  onSubmit={handleSubmit}>
                <input
                style={{height:"10rem",width:"100%"}}
            type='text'
            name='name'
            placeholder='Event Description'
            ref={eventDesRef} required
          /> 
          </form>
                </div>
            </div>
           
            
            <div >
    <form onSubmit={handleSubmit}>
        <button className='form-input-btn' type='submit' >
          Continue
        </button>
        </form>
        </div> 
        <Footer></Footer>
        </>
        :
        <>
        <Redirect to={{ pathname: '/events2',  state: { event: eventNameRef.current.value, id:key,
        statedate: datestart,
            enddate: dateend,
            zone: zoneRef,
            starttime: selectedTime,
            endtime: selectedTime2,
            search: eventNameRef.current.value.toUpperCase(),
            desc:eventDesRef.current.value,
            file:imagef,
            imgurl:image,
            contact: contactNameRef.current.value,
            contactMail: emaillist}  }}     
        />
        </>
        }
        </div>
    )
}

export default Event
