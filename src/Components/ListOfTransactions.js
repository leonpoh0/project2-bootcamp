import "../App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddTransaction from "./AddTransaction";
import { TransactionModalContext } from "../Contexts/TransactionModalContext";

const TRANSACTION_FOLDER_NAME = "transactions1";

function ListOfTransactions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        + Add account
      </Button>
      <TransactionModalContext.Provider value={{ show, setShow }}>
        <AddTransaction />
      </TransactionModalContext.Provider>
    </div>
  );
}

export default ListOfTransactions;
