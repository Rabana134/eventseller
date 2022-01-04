import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/AuthContext';
import app from '../firebase';
import NavbarUs from './Navbar/NavbarUs';
import Footer from './Footer/Footer';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements
  } from "@stripe/react-stripe-js";
import useResponsiveFontSize from './Forms/useResponsiveFontSize';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Forms/Payment';

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      [fontSize]
    );
  
    return options;
  };

  const PUBLIC_KEY = "pk_test_51JnlBpDsCGjgZ0CD1Pb8a89AxfDvIjyQu4DThAycZpXhWGXf8504CxSECN895ZxsZzqjguh5i8lTTlWBiXxjAWPL00OzZxIbqa"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
function Book(props) {
    

    var [name,setName] = useState("")
    var [image,setImage] = useState("")
    const { currentUser } = useAuth()
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
  
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
    }, [])
 
    
   
    return (
        <div>
        <NavbarUs name={name} img={image}></NavbarUs>
        <img src={props.location.state.img || 'http://via.placeholder.com/400x300'} alt="logo" width="400" height="300" style={{display:"table",margin:"0 auto"}}/>
              <h2 style={{textAlign:"center", marginTop:"2rem"}}>{props.location.state.title}</h2>
              <p style={{textAlign:"center", display:"table",margin:"0 auto", width:"800px"}}>{props.location.state.desc}</p>
        <Elements stripe={stripeTestPromise}> <Payment 
        startD={props.location.state.startD} 
        startT={props.location.state.startT} 
        price={props.location.state.price}
        title={props.location.state.title.toUpperCase()}></Payment></Elements>
        </div>
    )
}



export default Book

