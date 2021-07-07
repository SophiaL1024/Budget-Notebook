import React from 'react';


export default function NewTransactionForm(props) {

  return (
    <div>
      <h3>New transaction</h3>
      <span>
        <input placeholder="name"></input>
        <input placeholder="description"></input>
      </span>
      <span>
        <div>
        <input type="checkbox"  name="income" value="Income" />Income
        <input type="checkbox"  name="Expense" value="Expense" />Expense
        <button>Submit</button>
        </div>
      </span>
    </div>
  );
};