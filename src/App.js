import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ErrorPage from "./Pages/ErrorPage";
import AddTransactions from "./Components/AddTransaction";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useAuthValue } from "./Contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <Router>
      <nav>
        <Link to="/"> FINesse</Link>
        <Link to="/"> Logout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Add" element={<AddTransactions />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
