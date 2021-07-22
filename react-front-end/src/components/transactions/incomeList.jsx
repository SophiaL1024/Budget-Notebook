import React from 'react';
import { useContext } from "react";
import dataContext from '../../context';
import ListItem from "./listItem";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

export default function IncomeList(props) {
  const { incomeTransactions} = useContext(dataContext);

  //mapping over data list to create a table of list items and sort items by id
  const listIncomes = incomeTransactions.sort((a,b)=>a.id-b.id).map(item => {

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
        budgetId={item.income_budgets_id}
        type={"income"}
      />
    );
  });

  //filter searched items
  const searchItems=incomeTransactions.map((item)=>{
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
        budgetId={item.income_budgets_id}
        type={"income"}
      />
      )
    }
    return null;
  })


  return (
      <Table stickyHeader={true} size="small">
      <TableHead >
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
      {props.search.length?searchItems:listIncomes}
      </TableBody>
        </Table>
  );
};