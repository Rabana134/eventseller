import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';




const Form = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} name={props.name} price={props.price}/>
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;