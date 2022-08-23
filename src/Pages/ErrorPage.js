import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  let navigate = useNavigate();
  return (
    <div>
      <h3>
        You have reached an error page. Click the button below to return to the
        landing page.
      </h3>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Return
      </button>
    </div>
  );
}

export default ErrorPage;
