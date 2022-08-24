import { ref, onChildAdded, remove, child } from "firebase/database";
import { database } from "../firebase.js";
import "../App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
// import ".../node_modules/bootstrap/dist/css/bootstrap.min.css";

const TRANSACTION_FOLDER_NAME = "transactions1";

function RetrieveTransactions(props) {
  const [transactions, setTransactions] = useState([]);

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
    });
  }, []);

  // get(child(ref(database), TRANSACTION_FOLDER_NAME))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //       console.log("Output");
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const handleDelete = (transaction) => {
    console.log(transaction.transaction.key);
    const transactionsRef = ref(database, TRANSACTION_FOLDER_NAME);
    transactionsRef.child("-NACYSKruxGTHlZlx59c").remove();
    return;
  };

  return (
    <div>
      <div className="App">
        <form>
          {transactions.map((transaction, index) => {
            return (
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
            );
          })}
        </form>
      </div>
    </div>
  );
}

export default RetrieveTransactions;
