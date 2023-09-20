import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { authActions } from '../redux/authenticationSlice';
const Loginfiller = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value; 
        const password = e.target.password.value;
        dispatch(authActions.handleLogin({email,password, history}));
    }
  return (
    <div>
    <div className='container'>
        <div className='signContainer'>SignIn</div>
        <form className='formContainer' onSubmit={e => handleLogin(e)}>
            <input className='inputContainer' type='email' name='email' placeholder='Enter Email'/><br/>
            <input className='inputContainer' type='password' name='password' placeholder='Enter Password'/><br/>
            <button className='buttonContainer'>Login</button>
        </form>
    </div>
    <div className='loginContainer'>
            Don't have an account? <Link to='/signup'><span className='loginLink'>Register</span></Link>
        </div>
        <div>
            <Link to='/forgotPassword'>Forgot Password?</Link>
        </div>
    </div>
  )
}

export default Loginfiller