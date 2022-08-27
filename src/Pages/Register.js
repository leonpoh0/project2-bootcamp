import "../App.css";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../Contexts/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
          console.log(res.user);
        })
        .catch((err) => setError(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <h3>Create an account with an email address and password below.</h3>
      <form onSubmit={register} name="registration_form">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          required
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          value={confirmPassword}
          required
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
      <span>
        Have an account? Click <Link to="/login">here</Link> to login.
      </span>
    </div>
  );
}

export default Register;
