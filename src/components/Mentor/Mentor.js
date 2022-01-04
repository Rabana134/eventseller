import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import app from '../../firebase';
import Footer from '../Footer/Footer'
import NavbarDA from '../Navbar/NavbarDA'
import { Link } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';

function Mentor() {
    const[list, setList] = useState([]);
    const history = useHistory()
    useEffect(() => {
       
        app.database().ref("mentor").orderByChild("name").on("value", snapshot => {
            let memberlist = [];
            snapshot.forEach(snap => {
                memberlist.push(snap.val());
            });
            setList(memberlist)
          });
    }, [])
    return (
        <div>
        <NavbarDA></NavbarDA>
            <div>
            
        <div>
        <button  className="book-event" type='submit' style={{margin:"1rem",float:"right"}} onClick={()=>{history.push("/create_m")}}>
                   Create Mentor
        </button>
        {list.map(data => {
                
                return (
                    <div className="dashboard-stats2">
                   <img src={data.prof || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="200" height="200"/>
    
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.username}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.email}</b></p>
                   <p style={{textAlign:"center", marginTop:"1rem"}}><b>{data.desc}</b></p>
                   <button  className="book-event" type='submit' style={{marginBottom:"1rem"}}>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/edit_m',
            state: {
            id: data.id}
    }}> Edit </Link>
        </button>
        <button  className="book-event" type='submit' onClick={()=>{
            confirm({
    title: 'This mentor will be permanently deleted?',
    onOk() {
        app.database().ref("mentor/"+data.id).remove()
    },
    onCancel() {
      
    },
  }) 
        }}>
        Delete
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

export default Mentor
