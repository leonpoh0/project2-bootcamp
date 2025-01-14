import "../App.css";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("Registered user: " + res.user.uid);
          navigate("/Home");
        })
        .catch((err) => {
          setError(err.message);
          console.log("Error with login: " + error);
        });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="App">
      <div>Create an account with an email address and password below.</div>
      <div className="Login-box">
        <form onSubmit={register} name="registration_form">
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="Login-input"
            />

            <input
              type="password"
              value={password}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="Login-input"
            />

            <input
              type="password"
              value={confirmPassword}
              required
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="Login-button">
            Register
          </button>
        </form>
        <span>
          Have an account? Click <Link to="/">here</Link> to login.
        </span>
      </div>
    </div>
  );
}

export default Register;
