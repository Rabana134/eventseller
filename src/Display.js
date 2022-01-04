import React, { useEffect, useState } from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import banner from './components/Navbar/banner2.jpg';
import app from './firebase';
import { useHistory } from 'react-router';
import './App.css';
import { Link } from 'react-router-dom';

function Display() {
    var Uid =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    const[list, setList] = useState([]);
    const history = useHistory()
    useEffect(() => {
        setInterval(() => {
            app.database().ref("online/"+time+"/"+Uid).set(true)
        }, 3000);
        app.database().ref("events-online").orderByChild("title").on("value", snapshot => {
            let memberlist = [];
            snapshot.forEach(snap => {
                memberlist.push(snap.val());
            });
            setList(memberlist)
          });
    }, [])
    const divStyle = {
        width: '100%',
        height: '30rem',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        marginTop:'0.5rem' 
      };
    return (
        <div>
            <Navbar></Navbar>
            <div  style={divStyle}>
    </div>
    <div>
    <div>
        {list.map(data => {
                
                return (
                    <div className="display-stats" style={{display:"inline-block"}}>
                   <img src={data.img || 'http://via.placeholder.com/400x300'} alt="logo" width="100%" height="300" />
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.title}</b></p>
                   <p style={{textAlign:"center"}}>{data.statedate} {data.starttime}-{data.endtime} (BST) Location  - {data.type}      Price: £{data.price}</p>
                   <p style={{textAlign:"center",  width:"100%"}}>{data.desc}</p>
                   <button  className="book-event" type='submit'>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/signup',
            state: {
            title: data.title,
            price: data.price}
    }}> Book </Link>
        </button>
                   </div>
                );
               
                })}
        </div>
    </div>
            <Footer></Footer>
        </div>
    )
}

export default Display
