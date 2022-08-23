import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionCard from "./TransactionCard";
import axios from "axios";
import { database, storage, auth } from "../firebase.js";
import { ref, child, push, update, set } from "firebase/database";

const TRANSACTION_FOLDER_NAME = "transactions1";

function ListOfTransactions() {
  const [inputFields, setInputFields] = useState([
    { name: "", currency: "SGD", value: 0, valueSgd: 0 },
  ]);
  const [modalShow, setModalShow] = useState(false);

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

  const addFields = () => {
    let newfield = { name: "", currency: "SGD", value: 0 };

    setInputFields([...inputFields, newfield]);
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
        </form>
        <button variant="primary" onClick={() => setModalShow(true)}>
          + Add account
        </button>
        <TransactionCard show={modalShow} onHide={() => setModalShow(false)} />
        <button onClick={addFields}>+ Add account</button>
      </div>
    </div>
  );
}

export default ListOfTransactions;
