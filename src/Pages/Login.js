import "../App.css";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../Contexts/AuthContext";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setError("");

    // Create a new user with email and password using firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <h3>Login with your email address and password below.</h3>
      <form onSubmit={login} name="login_form">
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

        <button type="submit">Login</button>
      </form>
      <span>
        Don't have an account? Click <Link to="/register">here</Link> to
        register
      </span>
    </div>
  );
}

export default Register;
