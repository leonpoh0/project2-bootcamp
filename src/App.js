import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import ErrorPage from "./Pages/ErrorPage";
import AddTransactions from "./Components/AddTransaction";

function App() {
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
