import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
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
      <div>
        <nav className="Nav-bar">
          <span className="Main-logo">FINesse</span>
          {user ? (
            <div className="Nar-bar-login-links">
              <Link to="/Home" className="Nav-bar-links">
                {" "}
                Home
              </Link>
              <Link to="/Profile" className="Nav-bar-links">
                {" "}
                Profile
              </Link>
              <Link to="/" onClick={signOutAccount} className="Nav-bar-links">
                {" "}
                Logout
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route path="/Register" element={<Register setUser={setUser} />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
