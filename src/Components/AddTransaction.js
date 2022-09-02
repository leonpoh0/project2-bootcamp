import { ref, push, set } from "firebase/database";
import "../App.css";
import moment from "moment";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { database } from "../firebase.js";
import axios from "axios";
import { TransactionModalContext } from "../Contexts/TransactionModalContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";

function AddTransaction(props) {
  const { show, setShow, year, month } = useContext(TransactionModalContext);

  const auth = getAuth();
  const user = auth.currentUser;
  let uid = "";
  if (user !== null) {
    uid = user.uid;
  }

  let dateForApi = year;
  if (month.length === 1) {
    dateForApi += `-0${month}`;
  } else {
    dateForApi += `-${month}`;
  }

  const TRANSACTION_FOLDER_NAME = uid + dateForApi;

  const handleClose = () => setShow(false);
  const [inputField, setInputField] = useState({
    name: "",
    currency: "SGD",
    value: 0,
    valueSgd: 0,
  });

  const handleSubmit = () => {
    const transactionsRef = ref(database, TRANSACTION_FOLDER_NAME);
    const newTransactionRef = push(transactionsRef);
    let currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
    set(newTransactionRef, {
      name: inputField.name,
      currency: inputField.currency,
      value: Number(inputField.value),
      valueSgd: Number(inputField.valueSgd),
      time: currentTime,
    }).then(() => {
      setShow(false);
      setInputField({
        name: "",
        currency: "SGD",
        value: 0,
        valueSgd: 0,
      });
    });
  };

  const handleFormChange = (event) => {
    let newField = { ...inputField };
    if (event.target.name === "value") {
      newField[event.target.name] = parseInt(event.target.value);
    } else {
      newField[event.target.name] = event.target.value;
    }
    console.log(dateForApi);
    let currencyInput = newField.currency.toLowerCase();
    let valueInput = newField.value;
    let exchangeMultiplier = 1;
    let conversionToDollars = 0.01;
    if (currencyInput !== "sgd") {
      if (
        ["eur", "gbp", "usd", "aud", "cad", "nzd", "chf"].includes(
          currencyInput
        )
      ) {
        conversionToDollars = 1;
      }
      if (["myr"].includes(currencyInput)) {
        conversionToDollars = 0.1;
      }

      if (
        ["eur", "gbp", "usd", "aud", "cad", "nzd", "chf"].includes(
          currencyInput
        )
      ) {
        currencyInput += "_sgd";
      } else {
        currencyInput += "_sgd_100";
      }

      axios
        .get(
          `https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=10eafb90-11a2-4fbd-b7a7-ac15a42d60b6&limit=1&filters[end_of_month]=${dateForApi}&fields=${currencyInput}`
        )
        .then((response) => {
          exchangeMultiplier = response.data.result.records[0][currencyInput];
          newField.valueSgd = (
            valueInput *
            exchangeMultiplier *
            conversionToDollars
          ).toFixed(2);
          setInputField(newField);
        });
    } else {
      newField.valueSgd = valueInput;
      setInputField(newField);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add your account details below</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div>
            <input
              name="name"
              placeholder="Name of account"
              value={inputField.name}
              onChange={(event) => handleFormChange(event)}
            />
          </div>
          <select
            name="currency"
            value={inputField.currency}
            onChange={(event) => handleFormChange(event)}
          >
            <option value="SGD">SGD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="HKD">HKD</option>
            <option value="IDR">IDR</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
            <option value="MYR">MYR</option>
            <option value="NZD">NZD</option>
            <option value="PHP">PHP</option>
            <option value="QAR">QAR</option>
            <option value="SAR">SAR</option>
            <option value="THB">THB</option>
            <option value="TWD">TWD</option>
            <option value="VND">VND</option>
          </select>
          <input
            name="value"
            placeholder="Value"
            value={inputField.value}
            onChange={(event) => handleFormChange(event)}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <p>SGD amount: {inputField.valueSgd}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddTransaction;
