import {React, useEffect, useState }from 'react';
import axios from 'axios';
export default function expenseList() {

  const [state, setState] = useState({
    expenses:{}
  }); 

  useEffect(() => {
    axios
      .get("/transactions/1")
      .then((res) => {
        setState((prev) => ({ ...prev, expenses: res.data }));
      });
  }, []);
 //function that loops over all expenses

  return(
  <table>
    <div>Expense</div>
  </table>
  );
};