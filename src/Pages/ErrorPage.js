import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <div>
        You have reached an error page. Click the button below to return to the
        landing page.
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="Login-button"
      >
        Return
      </button>
    </div>
  );
}

export default ErrorPage;
