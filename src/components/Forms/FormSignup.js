import React, { useRef, useState,useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Form.css';
import '../../App.css';
import Dropdown from './Dropdown'
import axios from "axios"
import {  Link, useHistory } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from './useResponsiveFontSize';
import app from '../../firebase';
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

const FormSignup = (props) => {
  const emailRef = useRef()
  const discRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const usernameRef = useRef()
  const fnameRef = useRef()
  const lnameRef = useRef()
  const phoneRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [checked, setChecked] = useState(true);
  var [creditCard, setCard] = useState(true);
  var [paypal, setPaypal] = useState(false);
  var [transfer, setTrans] = useState(false);
  
  var type = props.name.toUpperCase()
  let myCurrentDate = new Date()
let date = myCurrentDate.getDate();
let month = myCurrentDate.getMonth() + 1;
let month1 = myCurrentDate.getMonth();
let year = myCurrentDate.getFullYear();
var graphid =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthName = monthNames[month1];
const[list, setList] = useState([]);

 
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
  useEffect(() => {
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

  async function handleSubmit(e) {
    e.preventDefault() 

    if(!checked){
      return setError("Please Accept the terms and conditions")
    }
    if (!passwordRef.current.value) {
      return setError("Passwords is required")
    } else if (passwordRef.current.value < 6) {
      return setError('Password needs to be 6 characters or more');
    }
  
    if (!passwordConfirmRef.current.value) {
      return setError("Passwords is required")
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    if (!emailRef.current.value) {
      return setError('Email required');
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      return setError('Email address is invalid');
    }

    if (!usernameRef.current.value) {
      return setError('Username required');
    }
    if (!fnameRef.current.value) {
      return setError('First name required');
    }
  if (!lnameRef.current.value) {
    return setError('Last name required');
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
          try {
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value).then(data => {  
              app.database().ref('users/'+data.user.uid).set({
              username:usernameRef.current.value,
              firstname:fnameRef.current.value,
              lastname:lnameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
            })
            app.database().ref(type+"/"+data.user.uid).set({
              username:usernameRef.current.value,
              firstname:fnameRef.current.value,
              lastname:lnameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              id: data.user.uid,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
            })

            var key = app.database().ref().push().key;
            app.database().ref("regs/"+key).set({
              username:usernameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              id: data.user.uid,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`,
              price: props.price
            })
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
            
          } catch {
            setError("Failed to create an account")
          }
      
      }

  } catch (error) {
      console.log("Error", error)
  }
}
else if (paypal){

}
else if(transfer){
  try {
    setLoading(true)
    setError("")
    await signup(emailRef.current.value, passwordRef.current.value).then(data => {  
      app.database().ref('users/'+data.user.uid).set({
      username:usernameRef.current.value,
      firstname:fnameRef.current.value,
      lastname:lnameRef.current.value,
      email:emailRef.current.value,
      phone:phoneRef.current.value,
      tor: type,
      date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
    })
    app.database().ref(type+"/"+data.user.uid).set({
      username:usernameRef.current.value,
      firstname:fnameRef.current.value,
      lastname:lnameRef.current.value,
      email:emailRef.current.value,
      phone:phoneRef.current.value,
      tor: type,
      id: data.user.uid,
      date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`
    })
    var key = app.database().ref().push().key;
            app.database().ref("regs/"+key).set({
              username:usernameRef.current.value,
              email:emailRef.current.value,
              phone:phoneRef.current.value,
              tor: type,
              id: data.user.uid,
              date:`${year}-${month<10?`0${month}`:`${month}`}-${date}`,
              price: props.price
            })
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
    
  } catch (e) {
    setError("Failed to create an account")
    console.log(e)
  }
}
} else {
  console.log(error.message)
}
setLoading(false)
  }

  return (
      <div>
    <hr/>
    <b className="text-acinfo">Account information</b>
    <p className="text-loginhere">Already have an account? <Link to="/login">Log in here</Link></p>
    <hr/>
 <div className='form-content-right-s'>
      <form onSubmit={handleSubmit} className='form' >
      <p style={{color: "red"}}>{error}</p>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
             ref={usernameRef}
             required
          />
          
        </div>
        <div className='form-inputs'>
          <label className='form-label'>First Name</label>
          <input
            className='form-input'
            type='text'
            name='firstname'
            placeholder='Enter your First Name'
            ref={fnameRef}
            required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Last Name</label>
          <input
            className='form-input'
            type='text'
            name='lastname'
            placeholder='Enter your Last Name'
            ref={lnameRef}
            required
          />
        </div>
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
      </form>
    </div>
    <div className='form-content-right-s'>
    <form onSubmit={handleSubmit} className='form' >
        <div className='form-inputs'>
          <label className='form-label'>Telephone</label>
          <input
            className='form-input'
            type='text'
            name='telephone'
            placeholder='Enter your Telephone'
            ref={phoneRef}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            ref={passwordRef}
            required
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            ref={passwordConfirmRef} required
          />
        </div>
       <Dropdown></Dropdown>
       </form>
        </div>
    
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
    <form onSubmit={handleSubmit} >
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
    <div style={{margin:"2rem"}}>
      <label className='form-label'>Discount</label>
          <input
            className='disc-form-input'
              placeholder='Discount code'
              ref={discRef}
            /><b>£{price}</b>
      </div>
      <div style={{margin:"2rem"}}>
      <button className='disc-input-btn' type='submit' onClick={dischandle}>
          Apply
        </button>
        
      </div>
      <hr/>
        <b className="text-acinfo">Terms and Conditions</b>
    <hr/>
    <div className="elementId">
    <b style={{fontSize:"30px"}}>1. Introduction</b>
    <p>

These terms and conditions apply to Services provided by Tritek Consulting Limited
You may contact us on info@tritekconsulting.co.uk and/or +44 (0) 7401 262 066/+44 (0) 2030 111 420
These terms and conditions are in addition to the Website Disclaimer and apply to the sale of any courses/services. Please read these terms and conditions carefully, print off a copy for your records.
These terms of use (“TERMS”) bind you, the company you represent, and the company that registered you (collectively “You”) to the terms and conditions set forth herein in connection with your use of ‘Tritek Consulting Limited’ Website, Mobile Applications, Basecamp, LMS or another offerings affiliate to us (collectively our work experience platform.
By using any of Tritek’s services, you are agreeing to this terms and condition or by clicking on the “Accept” button on our website, you agree to the terms of this agreement which will bind you. If you do not agree to these terms and conditions you must cease to continue to purchase any services from us.</p>
<b style={{fontSize:"30px"}}>2. The Services </b>
<p><b style={{fontSize:"30px"}}>2.1. Description</b></p>
<p>A description of the Services together with the dates on which the Services will begin are available on your payment invoice. We will provide the Services with reasonable care and skill in accordance with the description set out.
</p>
<b style={{fontSize:"30px"}}>2.2. Access</b>
<p>Candidates will have access to all tools (LMS and Basecamp) for 9 months only after which you will be charged to have access on a monthly or quarterly basis.
</p>
<b style={{fontSize:"30px"}}>2.3. Confirmation</b>
<p>We expect you to confirm that the Services you are purchasing will meet your needs. We do not make any guarantee to you that you will obtain a particular result, professional qualification or employment opportunity from your purchase and completion of any of your work experience.
</p>
<b style={{fontSize:"30px"}}>3. General</b>
<b style={{fontSize:"30px"}}>3.1. About our Platform</b>
<p>Our Platform enables students and job seekers (“Candidates”) to connect with independent contractor instructors (the “Instructors”, collectively with Candidates, the “Users”) who provide live and recorded intensive training, tutoring, mentoring, and learning services (the “Courses”) via Our Platform. The Platform includes, without limitation, facilitating and hosting intensive digital training courses and supporting materials, connecting candidates with work experience opportunities
</p>
<b style={{fontSize:"30px"}}>3.2. Communication</b>
<p>The main communication platform for the administrative and program office will be via WhatsApp. You are advised to ensure that you remain in the designated groups all through the duration of the program.
</p>
<b style={{fontSize:"30px"}}>3.3. Governance</b>
<p>Candidates must ensure they adhere to the governance processes when reporting issues. All contents on Basecamp as well as recording from our tutorial sessions inclusive of the details of projects worked on during your program at Tritek Consulting are not to be disclosed, distributed or reproduced.
</p>
<b style={{fontSize:"30px"}}>3.4. Duration</b>
<p>The duration for the program is 9 months, there will be no exemptions given for holidays or travel purposes. Participation and active involvement are highly required in projects and all learning platforms and this will be monitored regularly
</p>
<b style={{fontSize:"30px"}}>3.5. Projects and Completion</b>
<p>Once you have completed a project, you may choose to join another one. However please note this may not be a brand-new project or a role of your choice as we aim to promote more hybrid roles. Once a candidate abandons a project; we have the right not to put you on another project and or to decline giving you a reference.
Any project you work on is part of your initial payment for your training/work experience; hence, payment will not be issued for any work done and this project will belong to the company. As we are working on projects for clients, you may be required to work evenings and weekends.
Candidates are strictly prohibited to record project meetings as sensitive & confidential matters can be discussed with stakeholders. Except for project use.
</p>
<b style={{fontSize:"30px"}}>3.6. Mentorship</b>
<p>Access to a mentor is provided upon completion of your project only. Mentorship is for a period of six (6) weeks. If your mentor finds you not proactive. They have the right to withdraw your mentorship.
</p>
<b style={{fontSize:"30px"}}>3.7. Reference</b>
<p>The company’s name MUST not be used as a reference without proper authorization.
</p>
<b style={{fontSize:"30px"}}>4. Payments</b>
<b style={{fontSize:"30px"}}>4.1. Registration</b>
<p>Your place will only be guaranteed once a deposit or full payment is made on or before the day of the taster session
</p>
<b style={{fontSize:"30px"}}>4.2. Receipts</b>
<p>Following receipt by us of your order for Services via the Website, in person or on the telephone we will contact you confirming receipt of your order.
</p>
<b style={{fontSize:"30px"}}>4.3. Agreement</b>
<p>A legally binding agreement between us and you shall come into existence when we have:
accepted your offer to purchase Services from us by sending you an email confirming the purchase; and
received payment of the relevant Fees from you have been processed and your space has been allocated
</p>
<b style={{fontSize:"30px"}}>4.4. Deposits</b>
<p>All deposits are non-refundable.</p>
<b style={{fontSize:"30px"}}>5. Cancellation, Deferral & Refund</b>
<p>We reserve the right to protect our intellectual property (training videos, materials, collaborative platforms, and user groups).
There will be no refunds once you have access to our training materials and have accessed our tools.
Should you defer your program, please contact the Admin team, and note that your balance payment will still need to be paid as stipulated on the direct debit mandate.
Please note that if we believe that you are abusing our refund policy in our sole discretion, we reserve the right to suspend or terminate your Account and refuse or restrict all current or future use of the Services, without any liability to You.
</p>
<b style={{fontSize:"30px"}}>6. Termination</b>
<p>We shall be entitled to terminate these terms and conditions and cease to provide you with any Services with immediate effect in the event that you:
Fail to pay when fees are due/balance deposits
Act in aggressive, bullying, offensive, threatening or harassing manner towards any employee of Tritek, any trainer or any other candidate
</p>
<b style={{fontSize:"30px"}}>7. Conduct</b>
<p>You may only access the Platform for lawful purposes. You are solely responsible for the knowledge of and adherence to all laws, rules, and regulations pertaining to Your use of the Platform. You agree not to use the Platform or the Company Content (as defined below) to recruit, solicit, or contact in any form, Instructors or potential users for employment or contracting for a business not affiliated with Us without Our advance written permission, which may be withheld in Our sole discretion. You assume all risks from any meetings or contact between You and any Instructors or other Users of the Platform.
</p>
<b style={{fontSize:"30px"}}>8. Miscellaneous</b>
<p>All tutorial sessions are recorded and made available on our LMS platform within 48 to 72 hours.
Occasionally, pictures and videos will be taken during classroom sessions and this may be used for social media purposes.
You can contact us by any of the following methods:
Email: info@tritekconsulting.co.uk
Telephone: +44 (0) 7404 504686, 7983 832188,7737 114714</p>
<b style={{fontSize:"30px"}}>9. Complaints Policy</b>
<p>
All complaints must be in writing using the Tritek Email address. A response will be made within 48hours.
You can contact us by any of the following methods:
Email: info@tritekconsulting.co.uk</p>
    </div>
    <div style={{margin:"1rem"}}>
    <label >
      <input type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      I agree to the Terms and Conditions
    </label>
    </div>
    
    <div className='form-content-right'>
    <p style={{color: "red"}}>{error}</p>
    <form onSubmit={handleSubmit} className='form' noValidate>
        <button className='form-input-btn' type='submit' disabled={loading}>
          Submit and checkout
        </button>
        </form>
        </div> 
      </div>
  );
};

export default FormSignup;