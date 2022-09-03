import "../App.css";
import React from "react";
import ListOfTransactions from "../Components/ListOfTransactions";
import { useState, useEffect } from "react";

function Home() {
  const [dashboardButton, setDashboardButton] = useState("unselected");
  const [dataButton, setDataButton] = useState("selected");

  const toggleDashboard = () => {
    setDashboardButton("selected");
    setDataButton("unselected");
  };

  const toggleData = () => {
    setDashboardButton("unselected");
    setDataButton("selected");
  };

  return (
    <div className="App">
      <div>
        {/* View your portfolio denominated in SGD over time in "Dashboard" or click
        “My data” to add your data */}
        Consolidate your accounts across different currencies to view the total
        amount in SGD.
      </div>
      <div>
        {/* <button className={dashboardButton} onClick={toggleDashboard}>
          Dashboard
        </button>
        <button className={dataButton} onClick={toggleData}>
          My data
        </button> */}
      </div>
      <div>
        {dashboardButton === "selected" ? (
          <div> To be created</div>
        ) : (
          <div>
            <ListOfTransactions />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
