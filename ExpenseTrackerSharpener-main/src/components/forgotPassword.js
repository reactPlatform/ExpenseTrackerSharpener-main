import React, { useState } from 'react'
import {database} from './firebaseConfig';
import {sendPasswordResetEmail} from 'firebase/auth';
import {Link} from 'react-router-dom';
const ForgotPassword = () => {
    const [message,setMessage] = useState('');
    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordResetEmail(database,email).then(data => {
            setMessage('Email sent successfully');
        }).catch(err => {
            alert(err.message);
        }) 
    }
  return (
    <div>
    <div className='container'>
        <span>{message}</span>
        <div className='signContainer'>Forgot Password</div>
        <form className='formContainer' onSubmit={e => handleResetPassword(e)}>
            <input className='inputContainer' type='email' name='email' placeholder='Enter Email'/><br/>
            <button className='buttonContainer'>Reset Password</button>
        </form>
        
    </div>
    <Link to='/'>Return to Login Page</Link>
    </div>
  )
}

export default ForgotPassword