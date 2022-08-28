import "../App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddTransaction from "./AddTransaction";
import { TransactionModalContext } from "../Contexts/TransactionModalContext";
import RetrieveTransactions from "./RetrieveTransactions";
import "bootstrap/dist/css/bootstrap.min.css";

function ListOfTransactions({ user }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <RetrieveTransactions user={user} />
      <Button variant="primary" onClick={handleShow}>
        + Add account
      </Button>
      <TransactionModalContext.Provider value={{ show, setShow }}>
        <AddTransaction user={user} />
      </TransactionModalContext.Provider>
    </div>
  );
}

export default ListOfTransactions;
