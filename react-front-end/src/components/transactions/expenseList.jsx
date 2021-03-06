import { useContext } from "react";
import React from 'react';
import dataContext from "../../context";
import ListItem from "./listItem";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export default function ExpenseList(props) {
  const { expenseTransactions } = useContext(dataContext);

  //mapping over list to creat a table of list items and sort items by id
  const listExpenses = expenseTransactions.sort((a,b)=>a.day-b.day).map(item => {
    return (
      <ListItem
        key={item.id}
        id={item.id}
        name={item.name}
        month={item.month}
        day={item.day}
        year={item.year}
        user_id={item.user_id}
        description={item.description}
        amount={item.amount}
        budgetId={item.expense_budgets_id}
        type={"expense"}
      />
    );
  });

  //filter searched items
  const searchItems=expenseTransactions.map((item)=>{
    if(item.name.includes(props.search)){
      return(
        <ListItem
        key={item.id}
        id={item.id}
        name={item.name}
        month={item.month}
        day={item.day}
        year={item.year}
        user_id={item.user_id}
        description={item.description}
        amount={item.amount}
        budgetId={item.expense_budgets_id}
        type={"expense"}
      />
      )
    }
    return null;
  })

  return (
      <Table stickyHeader={true} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Budget</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell >Delete</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
        {props.search.length?searchItems:listExpenses}
       </TableBody>
        </Table>  
  );
};