import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import app from '../firebase';
import './dashboard.css'
import Calendar from 'react-calendar';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

function User() {
    var [name,setName] = useState("")
    const { currentUser } = useAuth()
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
    const[list, setList] = useState([]);
    const[cvlist, setCVList] = useState([]);
    const[callist, setCallist] = useState([]);
    const[ceolist2, setCEOList] = useState([]);
    var[mark2, setMark2] = useState([]);
    var[mark, setMark] = useState([]);
    const history = useHistory()

    useEffect(() => {
        app.database().ref("online/"+time+"/"+Uid).set(true)
   
          app.database().ref().child('users/'+Uid+'/username').on('value', snapshot => {
            
            setName(snapshot.val()) 
             
        })
        app.database().ref("events-online").orderByChild("title").on("value", snapshot => {
            let memberlist = [];
            snapshot.forEach(snap => {
                memberlist.push(snap.val());
            });
            setList(memberlist)
          });
          app.database().ref("events-online").orderByChild("search")
          .startAt("CV")
      .endAt("CV"+"\uf8ff").on("value", snapshot => {
            let cvlist = [];
            snapshot.forEach(snap => {
                cvlist.push(snap.val());
            });
            setCVList(cvlist)
            cvlist.map(data => { 
               
                setMark([
                moment( data.statedate).format('DD-MM-YYYY')]) 
            })
          });
          app.database().ref("events-online").orderByChild("search")
          .startAt("CEO")
      .endAt("CEO"+"\uf8ff").on("value", snapshot => {
            let ceolist = [];
            snapshot.forEach(snap => {
                ceolist.push(snap.val());
            });
            setCEOList([ceolist])
            ceolist.map(data2 => { 
               
                setMark2([
                moment( data2.statedate).format('DD-MM-YYYY')]) 
            })
           
          });
    }, [])
    const handleChange = value => {
       var d = moment( value).format('LL')
       app.database().ref("events-online").orderByChild("statedate").equalTo(d).on("value", snapshot => {
        let event = [];
        snapshot.forEach(snap => {
            event.push(snap.val());
        });
        event.map(data => { 
            if(data.search.startsWith("CEO"))
            {
                history.push({
                    pathname: '/event-book',
                    state: { id: data.id,
                    img: data.img,
                    desc: data.desc,
                    startD: data.statedate,
                    startT: data.starttime,
                    title: data.title,
                    price:data.price}
                });
            }
            else if(data.search.startsWith("CV"))
            {
                history.push({
                    pathname: '/event-book',
                    state: { id: data.id,
                    img: data.img,
                    desc: data.desc,
                    startD: data.statedate,
                    startT: data.starttime,
                    title: data.title,
                    price:data.price}
                });
            }
            
        })
       
      });
      };

    return (
        <div>
        <h2 style={{textAlign:"center", color:"#4B0083"}}>BOOK AN EVENT</h2>
        <div >
        {list.map(data => {
                
                return (
                    <div className="display-stats" style={{display:"inline-block"}}>
                   <img src={data.img || 'http://via.placeholder.com/400x300'} alt="logo" width="400" height="300" style={{display:"inline-block",margin:"0"}}/>
                   <p style={{textAlign:"center", marginTop:"2rem"}}><b>{data.title}</b></p>
                   <p style={{textAlign:"center"}}>{data.statedate} {data.starttime}-{data.endtime} (BST) Location  - {data.type}      Price: £{data.price}</p>
                   <p style={{textAlign:"center",  width:"100%"}}>{data.desc}</p>
                   <button  className="book-event" type='submit'>
                   <Link style={{color:"white", textDecoration: "none"}} to={{
     pathname: '/event-book',
            state: { id: data.id,
            img: data.img,
            desc: data.desc,
            startD: data.statedate,
            startT: data.starttime,
            title: data.title,
            price:data.price}
    }}> Book </Link>
        </button>
                   </div>
                );
               
                })}
        </div>
        <h2 style={{textAlign:"center", color:"#4B0083"}}>BOOK CEO MEETING OR CV CONSULTING</h2>
        
        <div style={{display:"table",margin:"0 auto"}}>
        
                <Calendar
         tileClassName={({ date, view }) => {
      if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
       return  'highlight'
      }
      if(mark2.find(x=>x===moment(date).format("DD-MM-YYYY"))){
       return  'highlight1'
      }
    }} 
   
    onChange={handleChange}
/*maxDate={new Date(2020, 1, 0)}</div>*/
 minDate={
  new Date()
}
    />
        <div className="form-input-event" >
                <div>
                <label >
                <div style={{backgroundColor:"red",padding:"10px",width:"10px"}}></div>
      CEO Meeting
    </label>
                </div>
                <div>
                <label >
                <div style={{backgroundColor:"blue",padding:"10px",width:"10px"}}></div>
      CV Consultation
    </label>
                </div>
                <div>
                <label >
                <div style={{backgroundColor:"white",padding:"10px",width:"10px"}}></div>
      Unavailable
    </label>
                </div> 
            </div>
            </div>
        </div>
    )
}

export default User
