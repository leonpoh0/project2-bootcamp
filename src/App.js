import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  const signOutAccount = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful.");
        setUser(null);
      })
      .catch((error) => {
        console.log("Sign out unsuccessul. Error: " + error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
        console.log(uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/"> FINesse</Link>
        {user ? (
          <Link to="/" onClick={signOutAccount}>
            {" "}
            Logout
          </Link>
        ) : (
          <div></div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route path="/Register" element={<Register setUser={setUser} />} />
        <Route path="/Home" element={<Home user={user} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
