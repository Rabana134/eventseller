import React,{ useEffect, useState} from 'react'
import '../App.css';
import NavbarDA from './Navbar/NavbarDA'
import banner from './Navbar/banner.jpg';
import { useAuth } from '../contexts/AuthContext';
import app from '../firebase';
import Footer from './Footer/Footer';
import User from './User';
import NavbarUs from './Navbar/NavbarUs';
import { Link } from 'react-router-dom';


export default function Dashboard() {
    var [type, setType] = useState(false);
    const { currentUser } = useAuth()
    var[regs, setReg] = useState(0);
    var[online, setOnline] = useState(0);
    var[mentor, setMentor] = useState(0);
    var[coupon, setCoupon] = useState(0);
    var[events, setEvent] = useState(0);
    var[report, setReport] = useState(0);
    const[list, setList] = useState([]);
    var [name,setName] = useState("")
    var [image,setImage] = useState("")
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
   
    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
        app.database().ref().child('users/'+currentUser.uid+"/tor").on('value', snapshot => {
            if (snapshot.val() == "admin")
               setType(true)
            else setType(false)

        })
        app.database().ref("events").orderByChild("title").on("value", snapshot => {
            let memberlist = [];
            snapshot.forEach(snap => {
                memberlist.push(snap.val());
            });
            setList(memberlist)
          });
          app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/profile/url/').on('value', snapshot => {
            
            setImage(snapshot.val()) 
             
        })
       app.database().ref().child('users/').on('value', snapshot => {
           
           setReg(snapshot.numChildren())
            
       })
       app.database().ref().child('mentor/').on('value', snapshot => {
           
           setMentor(snapshot.numChildren())
            
       })
       app.database().ref().child('coupon/').on('value', snapshot => {
           
           setCoupon(snapshot.numChildren())
            
       })
       app.database().ref().child('events/').on('value', snapshot => {
           
           setEvent(snapshot.numChildren())
            
       })
       app.database().ref().child('report/').on('value', snapshot => {
           
           setReport(snapshot.numChildren())
            
       })
       app.database().ref().child('online/'+time).on('value', snapshot => {
           
           setOnline(online = snapshot.numChildren()) 
       })
    }, [])
    
   function searchuser(event)
    {
      
        app.database().ref("events").orderByChild("search").startAt(event.target.value.toUpperCase())
      .endAt(event.target.value.toUpperCase()+"\uf8ff")
      .on("value", snapshot => {
        let memberlist = [];
        snapshot.forEach(snap => {
            memberlist.push(snap.val());
        });
        setList(memberlist)
      });
      event.preventDefault()

    }
    const divStyle = {
        width: '100%',
        height: '30rem',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        marginTop:'0.5rem' 
      };
    return (
        
        <div>
        
    {type ?
    <div>
    <NavbarDA name={name} img={image}/>
    <div  style={divStyle}>
    </div>
    <div className="dashboard-stats">

<div  style={{display:"inline-table"}}>
<div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"7.5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}><p>{online}</p></div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"7.5rem",borderRadius: "30%"}}>USERS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"7rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{regs}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"5rem",borderRadius: "30%"}}>REGISTRATIONS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{mentor}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"4rem",borderRadius: "30%"}}>MENTORS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{coupon}</div>
</div>
<div  style={{display:"block"}}>
    <Link to="/coupon55"><b style={{padding:"10px",color:"black",marginLeft:"4rem",borderRadius: "30%"}}>COUPONS</b></Link>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>{events}</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black",marginLeft:"4.5rem",borderRadius: "30%"}}>EVENTS</b>
</div>
  </div>
  <div  style={{display:"inline-table"}}>
  <div  style={{display:"block"}}>
<div className="circle" style={{marginLeft:"5rem",marginBottom:"0.8rem",fontStyle:"bold",fontSize:"20px"}}>3</div>
</div>
<div  style={{display:"block"}}>
    <b style={{padding:"10px",color:"black" ,margin:"4.5rem",borderRadius: "30%"}}>REPORTS</b>
</div>
  
  </div>
  </div>
  <div>
      <div style={{float:"right", marginRight:"10rem"}}>
      <input type = "text" placeholder = "Search..."  onChange = {searchuser}/>
      </div>
  </div>
  <div style={{background:"#4B0083",padding:"10px", display:"block", margin:"5rem 1rem 0"}}>
  <p style={{color:"white"}}><b> UPCOMING EVENTS</b></p>
</div>
<div   >
{list.map(data => {
                
                return (
                   <div className="display-stats" style={{display:"inline-block"}}>
                   <img src={data.img || 'http://via.placeholder.com/400x300'} alt="logo" width="100%" height="300" />
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.title}</b></p>
                   <p style={{textAlign:"center"}}>{data.statedate} {data.starttime}-{data.endtime} (BST) Location  - {data.type}      Price: £{data.price}</p>
                   <p style={{textAlign:"center", width:"100%"}}>{data.desc}</p>
                   <button className='form-input-btn-event' type='submit'  style={{display:"inline-block",margin:"0"}}>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/edit1',
            state: {
            key: data.id}
    }}> Edit </Link>
        </button>
        <button className='form-input-btn-event' type='submit' onClick={()=>
        {app.database().ref("events-online").child(data.id).remove()
        app.database().ref("events/"+data.id).update({type: "CLOSED"})}} style={{display:"inline-block",margin:"0 1rem"}}>
        Close Event
        </button>  
                   </div>
                );
               
                })}
</div>
</div>
:
<div>
<NavbarUs name={name} img={image}></NavbarUs>
<div  style={divStyle}>
    </div>
<User></User>
</div>
}
<Footer></Footer>
        </div>
    )
}
