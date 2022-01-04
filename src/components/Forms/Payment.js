import React, { useEffect, useMemo, useState,useRef } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext';
import app from '../../firebase';
import NavbarUs from '../Navbar/NavbarUs';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router-dom';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    Elements
  } from "@stripe/react-stripe-js";
import useResponsiveFontSize from './useResponsiveFontSize';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import emailjs from 'emailjs-com';

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

function Payment(props) {
      
  const options = useOptions();
  const [checked, setChecked] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const [price, setPrice] = useState(0)
  var [creditCard, setCard] = useState(true);
  var [paypal, setPaypal] = useState(false);
  var [transfer, setTrans] = useState(false);
  const usernameRef = useRef()
  const phoneRef = useRef()
  const discRef = useRef()
  const emailRef = useRef()
  const [error, setError] = useState("")
    var [name,setName] = useState("")
    var [image,setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { currentUser } = useAuth()
    var Uid = currentUser.uid;
    let myCurrentDate = new Date()
    let hour = myCurrentDate.getHours()
    let minute = myCurrentDate.getMinutes()
    let time = hour+":"+minute
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let month1 = myCurrentDate.getMonth();
let year = myCurrentDate.getFullYear();
var type = props.title
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthName = monthNames[month1];
var graphid =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
      setPrice(props.price)
    }, [])
    function dischandle(e){
      app.database().ref().child('coupon/'+discRef.current.value+"/disc").on('value', snapshot => {
        if(snapshot.val()!=null)
        { 
        setPrice(snapshot.val()*props.price/100)
        }
       
    }) 
    }
    function handlePayselect(e){
        setPaypal(true)
        setCard(false)
        setTrans(false)
      }
      function handleCardselect(e){
        setPaypal(false)
        setCard(true)
        setTrans(false)
      }
      function handleOtherselect(e){
        setPaypal(false)
        setCard(false)
        setTrans(true)
      }


      async function handleSubmit(e) {
        e.preventDefault()

        if (!emailRef.current.value) {
          return setError('Email required');
        } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
          return setError('Email address is invalid');
        }
    
        if (!usernameRef.current.value) {
          return setError('Username required');
        }
       
     if (!phoneRef.current.value) {
        return setError('Telephone required'); 
        }
        if(!error) {
          var templateParams = {
            event_name: type,
            to_name: usernameRef.current.value,
            email: emailRef.current.value
          };  
          if(creditCard){
          try {
            setLoading(true)
            const {error, paymentMethod} = await stripe.createPaymentMethod({
              type: "card",
              card: elements.getElement(CardNumberElement)
          })
              const {id} = paymentMethod
              const response = await axios.post("http://localhost:4000/payment", {
                  amount: price*100,
                  id
              })
        
              if(response.data.success) {
                  console.log("Successful payment")
                  setLoading(true)
                  setError("") 
                  app.database().ref(type+"/"+Uid).set({
                    username:usernameRef.current.value,
                    email:emailRef.current.value,
                    phone:phoneRef.current.value,
                    tor: type,
                    id: Uid,
                    date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
                  })
                  var key = app.database().ref().push().key;
                  app.database().ref("regs/"+key).set({
                    username:usernameRef.current.value,
                    email:emailRef.current.value,
                    phone:phoneRef.current.value,
                    tor: type,
                    id: Uid,
                    date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`,
                    price: props.price,
                    prof:image,
                    reg_id:key
                  })
                  app.database().ref("graph/"+year+"/"+monthName+"/"+graphid).set(true)
                  emailjs.send('service_xdq5h0e', 'template_09qddsa', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
                  .then((result) => {
                      console.log(result.text);
                  }, (error) => {
                      console.log(error.text);
                  });
                  emailjs.send('service_xdq5h0e', 'template_9c2yawj', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
                  .then((result) => {
                      console.log(result.text);
                  }, (error) => {
                      console.log(error.text);
                  });
                  history.push("/dashboard")
              
              }
        
          } catch (error) {
              console.log("Error", error)
          }
        }
        else if (paypal){
        
        }
        else if(transfer){
          
            setLoading(true)
            setError("") 
            app.database().ref(type+"/"+Uid).set({
              username:usernameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              id: Uid,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
            })
            var key = app.database().ref().push().key;
            app.database().ref("regs/"+key).set({
              username:usernameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              id: Uid,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`,
              price: props.price,
              prof:image,
              reg_id:key
            })
            app.database().ref("graph/"+year+"/"+monthName+"/"+graphid).set(true)
            emailjs.send('service_xdq5h0e', 'template_09qddsa', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            emailjs.send('service_xdq5h0e', 'template_9c2yawj', templateParams, 'user_sk0pokiauywUm5E3qfJdN')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            history.push("/dashboard")
        }
        } else {
          console.log(error.message)
        }
        setLoading(false)
          
      }
    return (
        <div>
              
              <div>
              <form onSubmit={handleSubmit} style={{display:"table",margin:"2rem auto"}}>
              <p style={{color: "red"}}>{error}</p>
              <label className='form-label'>Name</label>
          <input
            className='form-input'
            type='name'
            name='name'
            placeholder='Enter your name'
            ref={usernameRef} required

           
          />
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            ref={emailRef} required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Telephone Number</label>
          <input
            className='form-input'
            type='number'
            name='number'
            placeholder='Enter your Telephone Number'
            ref={phoneRef}
            required
          />
        </div>
              </form>
              <hr/>
        <b className="text-acinfo">Choose your payment method</b>
    <hr/>
    <div style={{marginBottom:"2rem"}} >
    <div style={{display: "inline-table"}} onChange={handleCardselect}>
        <input type="radio" value="creditcard"  name="payment"  style={{transform: "scale(2)",
    marginLeft:"5rem",marginRight:"1rem"}} checked={creditCard}/> Check Out with a Credit Card Here
    </div>
    <div style={{display: "inline-table"}} onChange={handlePayselect}>
        <input type="radio" value="paypal" name="payment"  style={{transform: "scale(2)",
    marginLeft:"5rem",marginRight:"1rem"}} checked={paypal}/> Check Out with PayPal
    </div>
    <div style={{display: "inline-table"}} onChange={handleOtherselect}>
        <input type="radio" value="other" name="payment"  style={{transform: "scale(2)",
    marginLeft:"5rem",marginRight:"1rem"}} checked={transfer}/>  Pay by Other Methods
    </div>
      </div>
    <div className='form-content-right'>
    {creditCard ?
    <form onSubmit={handleSubmit} style={{display:"table",margin:"2rem auto"}}>
    <label>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
    </form>
    : paypal ?
    <div>
      
    </div>
    :
    <div>
      <b style={{fontSize:"30px"}}>Payment Instructions</b>
      <p>1. Fill your information above and Click on “SUBMIT and CHECKOUT“. (Take note of your Invoice Number after Checkout).</p>
      <p style={{color:"red"}}>(Your Invoice Number looks like this ‘#40DECDD7..‘).</p>
      <p>Sort Code: 608371</p>
      <p>Account No: 23875024</p>
      <p>Bank: Starling Bank</p>
      <p>Account Name: Tritek Consulting Ltd</p>
      <p>Reference: Your Invoice Number and Your Full Name</p>
      <p>NB: Please contact info@tritekconsulting.co.uk once your payment is made.</p>
    </div>
    }
    </div>
    <div>
      <label className='form-label'>Discount</label>
          <input
            className='disc-form-input'
              placeholder='Discount code'
              ref={discRef}
            /><b>£{price}</b>
      </div>
      <div  style={{display:"inline"}}>
      <button className='disc-input-btn' type='submit' onClick={dischandle}>
          Apply
        </button>
        
      </div>
              <div>
              <p style={{textAlign:"center", display:"table",margin:"2rem auto", width:"800px"}}><b style={{marginRight:"2rem"}}>Date: {props.startD}</b><b>Time: {props.startT}</b></p>
              </div>
              <button  className="book-event" type='submit' onClick={handleSubmit}>
                   Book Now 
        </button>
              </div>
              <Footer></Footer>
        </div>
    )
}

export default Payment
