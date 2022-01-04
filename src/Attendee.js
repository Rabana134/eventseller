import React, { useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import NavbarDA from './components/Navbar/NavbarDA'
import app from './firebase';
import { useHistory } from 'react-router';
import './App.css';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function Attendee() {
    const { currentUser } = useAuth()
    var Uid =  currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    var [name,setName] = useState("")
    var [image,setImage] = useState("")
    const[list, setList] = useState([]);
    const[emailist, setEList] = useState([]);
    const history = useHistory()
    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
        app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref().child('users/'+Uid+'/profile/url/').on('value', snapshot => {
            
            setImage(snapshot.val()) 
             
        })
        app.database().ref("regs").orderByChild("name").on("value", snapshot => {
            let memberlist = [];
            snapshot.forEach(snap => {
                memberlist.push(snap.val());
            });
            setList(memberlist)
          });
    }, [])
    return (
        <div>
            <NavbarDA name={name} img={image}/>
            <div >
            {list.map(data => {
                
                return (
                    <div className="dashboard-stats2">
                   <img src={data.prof || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="200" height="200"/>
    
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.username}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.email}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.tor}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.date}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>£{data.price}</b></p>
                   <button  className="book-event" type='submit' style={{marginBottom:"1rem"}}>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/single',
            state: {
            email: data.email,
            img:data.prof,
            name:data.username}
    }}> Send Memo </Link>
        </button>
        <button  className="book-event" type='submit'>
        <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/cancel_reg',
            state: {
            key: data.reg_id,
            id: data.id,
            prof:data.prof,
            name:data.username,
            title:data.tor}
    }}> Cancel Registration </Link>
                  
        </button>
                   </div>
                );
               
                })}
              
            </div>
            <div>
                <button  className="book-event" type='submit' style={{marginTop:"2rem",marginBottom:"2rem"}}>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/group',
    }}> Send Group Memo </Link>
        </button>
                </div>
            <Footer/>
        </div>
    )
}

export default Attendee
