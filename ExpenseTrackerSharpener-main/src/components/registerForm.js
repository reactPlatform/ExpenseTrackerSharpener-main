import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/authenticationSlice";
import "../styles/App.css";
const RegisterForm = () => {
  const history = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const authenticationMessage = useSelector(
    (state) => state.authentication.authenticationMessage
  );
  useEffect(() => {
    if (authenticationMessage) {
      setMessage(authenticationMessage);
    }
  }, [authenticationMessage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.cpassword.value;
    dispatch(authActions.handleSignUp({email, password, confirmPassword, history}));
  };
  return (
    <div>
      <div className="container">
        <div className="signContainer">SignUp</div>
        <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email" className="inputLabel">
            Email Address
          </label>
          <input
            className="inputContainer"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
          <br />
          <label htmlFor="password" className="inputLabel1">
            Password
          </label>
          <input
            className="inputContainer"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
          <br />
          <label htmlFor="cpassword" className="inputLabel2">
            Confirm Password
          </label>
          <input
            className="inputContainer"
            type="password"
            name="cpassword"
            placeholder="Enter Password"
            required
          />
          <br />
          <p>{message}</p>
          <button className="buttonContainer">Register</button>
        </form>
      </div>
      <div className="loginContainer">
        Have an account?{" "}
        <Link to="/">
          <span className="loginLink">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
