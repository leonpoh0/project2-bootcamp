import "../App.css";
import React from "react";
import ListOfTransactions from "../Components/ListOfTransactions";

function Home({ user }) {
  return (
    <div>
      <h3>
        View your portfolio denominated in SGD over time or click “My data” to
        add your data
      </h3>
      <h3>
        Click “Dashboard” to view your portfolio denominated in SGD over time
      </h3>
      <div>
        <button>Dashboard</button>
        <button>My data</button>
      </div>
      <div>
        <div>Graph</div>
        <div>
          <div>
            <h3>Year</h3>
            <h3>Month</h3>
          </div>
          <div>
            <ListOfTransactions user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
