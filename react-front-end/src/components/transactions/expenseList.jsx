import { useContext } from "react";
import React from 'react';
import dateContext from "../../context";
import Edit from "./edit";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export default function ExpenseList() {
  const { expenseTransactions, handleEdit, deletion } = useContext(dateContext);

  //mapping over list to creat a table of list items
  const listExpenses = expenseTransactions.map(item => {
    return (
      <Edit
        key={item.id}
        id={item.id}
        name={item.name}
        month={item.month}
        day={item.day}
        year={item.year}
        user_id={item.user_id}
        description={item.description}
        amount={item.amount}
        handleEdit={handleEdit}
        deletion={deletion}
        type={"expense"}
      />
    );
  });

  return (
      <Table stickyHeader={true} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell >Delete</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
      {listExpenses}
       </TableBody>
        </Table>  
  );
};