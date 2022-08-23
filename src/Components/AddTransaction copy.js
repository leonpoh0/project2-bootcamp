import { ref, push, set, onChildAdded } from "firebase/database";
import "../App.css";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { database } from "../firebase.js";
import axios from "axios";

const TRANSACTION_FOLDER_NAME = "transactions1";

function TransactionCard(props) {
  const [inputFields, setInputFields] = useState([
    { name: "", currency: "SGD", value: 0, valueSgd: 0 },
  ]);

  const handleSubmit = () => {
    const transactionsRef = ref(database, TRANSACTION_FOLDER_NAME);
    const newTransactionRef = push(transactionsRef);
    let currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
    set(newTransactionRef, {
      message: inputFields,
      time: currentTime,
    });
    setInputFields([]);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    let currencyInput = data[index].currency.toLowerCase();
    let valueInput = data[index].value;
    let exchangeMultiplier = 1;
    if (currencyInput != "sgd") {
      currencyInput += "_sgd";
      axios
        .get(
          `https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=10eafb90-11a2-4fbd-b7a7-ac15a42d60b6&limit=1&filters[end_of_month]=2022-07&fields=${currencyInput}`
        )
        .then((response) => {
          exchangeMultiplier = response.data.result.records[0][currencyInput];
          data[index].valueSgd = valueInput * exchangeMultiplier;
          setInputFields(data);
        });
    } else {
      data[index].valueSgd = valueInput;
      setInputFields(data);
    }
  };

  return (
    <div>
      <div className="App">
        <form>
          {inputFields.map((transaction, index) => {
            return (
              <div key={index}>
                <input
                  name="name"
                  placeholder="Name"
                  value={transaction.name}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <select
                  name="currency"
                  value={transaction.currency}
                  onChange={(event) => handleFormChange(index, event)}
                >
                  <option value="SGD">SGD</option>
                  <option value="USD">USD</option>
                </select>
                <input
                  name="value"
                  placeholder="Value"
                  value={transaction.value}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <p>{transaction.valueSgd}</p>
              </div>
            );
          })}
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default TransactionCard;
