import { ref, onChildAdded, remove, onChildRemoved } from "firebase/database";
import { database } from "../firebase.js";
import "../App.css";
import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth } from "firebase/auth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TransactionRetrieveContext } from "../Contexts/TransactionRetrieveContext";

function RetrieveTransactions() {
  const { year, month } = useContext(TransactionRetrieveContext);
  const [transactions, setTransactions] = useState([]);
  const [totalSgdAmount, setSgdAmount] = useState(Number(0));
  const auth = getAuth();
  const user = auth.currentUser;
  let uid = "";
  if (user !== null) {
    uid = user.uid;
  }

  useEffect(() => {
    let dateForApi = year;
    if (month.length === 1) {
      dateForApi += `-0${month}`;
    } else {
      dateForApi += `-${month}`;
    }

    const TRANSACTION_FOLDER_NAME = uid + dateForApi;
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
      setTransactions((prevTransactions) => {
        return prevTransactions.filter(
          (transactionElement) => transactionElement.key !== data.key
        );
      });
      setSgdAmount((prev) => prev - Number(data.val().valueSgd));
    });
  }, []);

  const handleDelete = (transaction) => {
    let dateForApi = year;
    if (month.length === 1) {
      dateForApi += `-0${month}`;
    } else {
      dateForApi += `-${month}`;
    }
    const TRANSACTION_FOLDER_NAME = uid + dateForApi;
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
        <div className="Transaction-card-full" key={index}>
          <Card key={index} style={{ width: "400px" }}>
            <div className="Card-layout">
              <div className="Card-name">
                <span className="Card-fields">{transaction.value.name}</span>
              </div>
              <div className="Card-value">
                <div className="Card-value-fields">Amount</div>
                <div className="Card-fields Card-value-fields">
                  {transaction.value.currency} {transaction.value.value}
                </div>
                <div className="Card-fields Card-value-fields">
                  SGD {transaction.value.valueSgd}
                </div>
              </div>
              <p
                aria-label="delete"
                size="small"
                onClick={(event) => handleDelete({ transaction })}
                className="item4"
              >
                <DeleteForeverIcon />
              </p>
            </div>
          </Card>
          <div></div>
        </div>
      ))}
      <p>Total SGD amount: {totalSgdAmount}</p>
    </div>
  );
}

export default RetrieveTransactions;
