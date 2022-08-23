import { ref, push, set } from "firebase/database";
import "../App.css";
import moment from "moment";
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { database } from "../firebase.js";
import axios from "axios";
import { TransactionModalContext } from "../Contexts/TransactionModalContext";
// import ".../node_modules/bootstrap/dist/css/bootstrap.min.css";

const TRANSACTION_FOLDER_NAME = "transactions1";

function AddTransaction(props) {
  const { show, setShow } = useContext(TransactionModalContext);
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
      message: inputField,
      time: currentTime,
    }).then(() => {
      setShow(false);
      setInputField({});
    });
  };

  const handleFormChange = (event) => {
    let newField = { ...inputField };
    console.log(newField);
    if (event.target.name === "value") {
      newField[event.target.name] = parseInt(event.target.value);
    } else {
      newField[event.target.name] = event.target.value;
    }
    let currencyInput = newField.currency.toLowerCase();
    let valueInput = newField.value;
    let exchangeMultiplier = 1;
    if (currencyInput !== "sgd") {
      currencyInput += "_sgd";
      axios
        .get(
          `https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=10eafb90-11a2-4fbd-b7a7-ac15a42d60b6&limit=1&filters[end_of_month]=2022-07&fields=${currencyInput}`
        )
        .then((response) => {
          exchangeMultiplier = response.data.result.records[0][currencyInput];
          newField.valueSgd = valueInput * exchangeMultiplier;
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
          <input
            name="name"
            placeholder="Name"
            value={inputField.name}
            onChange={(event) => handleFormChange(event)}
          />
          <select
            name="currency"
            value={inputField.currency}
            onChange={(event) => handleFormChange(event)}
          >
            <option value="SGD">SGD</option>
            <option value="USD">USD</option>
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
          <p>{inputField.valueSgd}</p>
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
