import { ref, onChildAdded, remove, onChildRemoved } from "firebase/database";
import { database } from "../firebase.js";
import "../App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
// import ".../node_modules/bootstrap/dist/css/bootstrap.min.css";

const TRANSACTION_FOLDER_NAME = "transactions1";

function RetrieveTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [totalSgdAmount, setSgdAmount] = useState(Number(0));

  useEffect(() => {
    const transactionsRef = ref(database, TRANSACTION_FOLDER_NAME);
    onChildAdded(transactionsRef, (data) => {
      setTransactions((prev) => [
        ...prev,
        {
          key: data.key,
          value: data.val(),
        },
      ]);
      setSgdAmount((prev) => prev + Number(data.val().valueSgd));
    });
    onChildRemoved(transactionsRef, (data) => {
      setTransactions(() => {
        const index = transactions.indexOf({
          key: data.key,
          value: data.val(),
        });
        return transactions.splice(index, 1);
      });
      setSgdAmount((prev) => prev - Number(data.val().valueSgd));
    });
  }, []);

  const handleDelete = (transaction) => {
    console.log(transaction.transaction.key);
    const transactionsRef = ref(
      database,
      `${TRANSACTION_FOLDER_NAME}/${transaction.transaction.key}`
    );
    remove(transactionsRef)
      .then(() => {
        console.log("successfully deleted");
      })
      .catch((error) => {
        console.log("error in deleting");
      });
  };

  return (
    <div>
      {transactions.map((transaction, index) => (
        <div key={index}>
          <p>Name: {transaction.value.name}</p>
          <p>Currency: {transaction.value.currency}</p>
          <p>Value: {transaction.value.value}</p>
          <p>Value in SGD: {transaction.value.valueSgd}</p>
          <Button
            variant="primary"
            onClick={(event) => handleDelete({ transaction })}
          >
            Delete
          </Button>
        </div>
      ))}
      <p>Total amount: {totalSgdAmount}</p>
    </div>
  );
}

export default RetrieveTransactions;
