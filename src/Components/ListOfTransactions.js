import "../App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddTransaction from "./AddTransaction";
import { TransactionModalContext } from "../Contexts/TransactionModalContext";
import { TransactionRetrieveContext } from "../Contexts/TransactionRetrieveContext";
import RetrieveTransactions from "./RetrieveTransactions";
import "bootstrap/dist/css/bootstrap.min.css";

function ListOfTransactions() {
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(7);

  const handleShow = () => setShow(true);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <div className="Date-input-list">
        <span className="Date-input">Year</span>
        <select
          name="year"
          value={year}
          onChange={(event) => handleYearChange(event)}
        >
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <span className="Date-input">Month</span>
        <select
          name="month"
          value={month}
          onChange={(event) => handleMonthChange(event)}
        >
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>
      <div className="Transactions-list">
        <TransactionRetrieveContext.Provider value={{ year, month }}>
          <RetrieveTransactions />
        </TransactionRetrieveContext.Provider>
        <Button variant="primary" onClick={handleShow}>
          + Add account
        </Button>
        <TransactionModalContext.Provider
          value={{ show, setShow, year, month }}
        >
          <AddTransaction />
        </TransactionModalContext.Provider>
      </div>
    </div>
  );
}

export default ListOfTransactions;
