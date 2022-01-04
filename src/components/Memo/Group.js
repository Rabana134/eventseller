import React, { useEffect, useRef, useState } from 'react'
import Footer from '../Footer/Footer'
import NavbarDA from '../Navbar/NavbarDA'
import emailjs from 'emailjs-com';
import background from '../Forms/background.png';
import app from '../../firebase';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

function Group(props) {
  const form = useRef();

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
          <div >
 <div className='dashboard-stats' style={{display:"table", margin:"0 auto"}}>
 <b>selected Emails</b>
             <p>{emailist[0]}</p>
             <p>{emailist[1]}</p>
             <p>{emailist[2]}</p>
             <p>{emailist[3]}</p>
             <p>{emailist[4]}</p>
             <p>{emailist[5]}</p>
             <p>{emailist[6]}</p>
             <p>{emailist[7]}</p>
             <p>{emailist[8]}</p>
             <p>{emailist[9]}</p>
             <p>{emailist[10]}</p>
             <form ref={form} onSubmit={sendEmail}>
      <textarea name="message" placeholder="Message" style={{width:"50rem",height:"10rem"}}/>
      <input type="submit" value="Send" />
    </form>  
    <div >
            {list.map(data => {
                
                return (
                    <div className="dashboard-stats2">
                   <img src={data.prof || 'http://via.placeholder.com/400x300'} class="rounded-circle" alt="logo" width="50" height="50"/>
    
                   <p style={{textAlign:"center"}}><b>{data.username}</b></p>
                   <p style={{textAlign:"center"}}><b>{data.email}</b></p>
                   <button  className="book-event" type='submit' onClick={()=>{
                     setEList(oldArray => [...oldArray,data.email])
                   }}>
                  Add
        </button>
                   </div>
                );
               
                })}
              
            </div>
             </div>
          </div>
        <Footer/>
        </div>
    )
}

export default Group
