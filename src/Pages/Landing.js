import "../App.css";
import React from "react";

function Landing() {
  function checkEmail() {
    return;
  }
  return (
    <div>
      <h3>Login with your email address and password below.</h3>
      <form onSubmit={checkEmail}>
        <div>
          <div>
            <label>
              <span> Email address: </span>
            </label>
            <input type="text" />
          </div>
          <div>
            <label>
              <span>Password: </span>
            </label>
            <input type="text" />
          </div>
        </div>
        <input type="Submit" value="Login" />
      </form>
      <div>Don’t have an account? Click here to register.</div>
    </div>
  );
}

export default Landing;