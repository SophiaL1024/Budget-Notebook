import React, { useContext, useState } from "react";
import axios from 'axios';
import dateContext from "../../context.js";
import BudgetProgressBar from "./progressBar";
import EditForm from "./editForm";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';
import { TableBody, TableCell, TableRow, TableHead,Table } from "@material-ui/core";

export default function BudgetListItems(props) {

  const { incomeAndBudget, expenseAndBudget, balanceBudget, setState } = useContext(dateContext);
  //set edit to show edit form
  const [edit, setEdit] = useState(0);
  const [type, setType] = useState('');
  const [alert, setAlert] = useState(0);

  const handleEdit = function (id, budgetType) {
    setEdit(id);
    setType(budgetType);
  }

  const handleDelete = function (id, budgetType, haveTableRowansactions) {

    if (haveTableRowansactions !== "0" && haveTableRowansactions) {
      setAlert(id)
    } else {
      axios.delete('http://localhost:3000/budgets', { data: { id, budgetType } });
      if (budgetType === "income") {
        const newIncomeAndBudget = incomeAndBudget.filter(e => e.id !== id);
        setState((prev) => ({
          ...prev,
          incomeAndBudget: newIncomeAndBudget
        }))
      } else if (budgetType === "expense") {
        const newExpenseAndBudget = expenseAndBudget.filter(e => e.id !== id);
        setState((prev) => ({
          ...prev,
          expenseAndBudget: newExpenseAndBudget
        }))
      }
    }
  }

  const incomeItems = incomeAndBudget.map(e => {
    if (edit === e.id && type === 'income') {
      return (
        <TableRow key={e.id}>
          <TableCell colSpan="5">
            <EditForm setEdit={setEdit} id={e.id} type={'income'} key={e.id} item={e} />
          </TableCell>
        </TableRow>
      )
    } else if (alert === e.id) {
      return (
        <TableRow key={e.id}>
          <TableCell colSpan="5">
            <Alert severity="error" onClose={() => { setAlert(0) }}> You can not delete the budget with TableRowansactions!</Alert>
          </TableCell>
        </TableRow>)
    }
    else if (e.id === 0) {
      return null
    }
    return (
      <TableBody key={e.id}>
        <TableRow >
          <TableCell colSpan="5">
            <BudgetProgressBar id={e.id} type={'income'} />
          </TableCell>
        </TableRow>
        <TableRow  >
          <TableCell>{e.name} </TableCell>
          <TableCell>${e.amount} </TableCell>
          <TableCell>${e.income_sum}</TableCell>
          <TableCell >
            <IconButton aria-label="edit" fill="green" onClick={() => handleEdit(e.id, 'income')}>
              <EditIcon style={{ color: green[300] }} />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton aria-label="delete" fill="pink" onClick={() => handleDelete(e.id, 'income', e.income_sum)}>
              <DeleteIcon style={{ color: red[300] }} />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  })

  const expenseItems = expenseAndBudget.map(e => {
    if (edit === e.id && type === 'expense') {
      return (
        <TableRow key={e.id}>
          <TableCell colSpan="5">
            <EditForm setEdit={setEdit} id={e.id} type={'expense'} key={e.id} item={e} />
          </TableCell>
        </TableRow>
      )
    } else if (alert === e.id) {
      return (
        <TableRow key={e.id}>
          <TableCell colSpan="5">
            <Alert severity="error" onClose={() => { setAlert(0) }}> You can not delete the budget with TableRowansactions!</Alert>
          </TableCell>
        </TableRow>)
    }
    else if (e.id === 0) {
      return null
    }
    return (
      <TableBody key={e.id}>
        <TableRow >
          <TableCell colSpan="5">
            <BudgetProgressBar id={e.id} type={'expense'} />
          </TableCell>

        </TableRow>
        <TableRow >
          <TableCell>{e.name} </TableCell>
          <TableCell>${e.amount} </TableCell>
          <TableCell>${e.expense_sum}</TableCell>
          <TableCell >
            <IconButton aria-label="edit" fill="green" onClick={() => handleEdit(e.id, 'expense')}>
              <EditIcon style={{ color: green[300] }} />
            </IconButton>
            </TableCell>
            <TableCell>
            <IconButton aria-label="delete" fill="pink" onClick={() => handleDelete(e.id, 'expense', e.expense_sum)}>
              <DeleteIcon style={{ color: red[300] }} />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  })

  const balanceRemaining = function () {
    let incomeBudgetSum = 0;
    incomeAndBudget.forEach(e => {
      incomeBudgetSum += Number(e.amount);
    });
    let expenseBudgetSum = 0;
    expenseAndBudget.forEach(e => {
      expenseBudgetSum += Number(e.amount);
    });
    return incomeBudgetSum - expenseBudgetSum;
  }

  //conditional render different tabs
  if (props.tabType === 0) {
    return incomeItems;
  } else if (props.tabType === 1) {
    return expenseItems;
  } else if (props.tabType === 2 && !edit) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Remaining budget</TableCell>
            <TableCell>Saving Goal</TableCell>
            <TableCell>Actual Balance</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{balanceRemaining()}</TableCell>
            <TableCell>${balanceBudget[0]}</TableCell>
            <TableCell>${(Number(balanceBudget[1]) - Number(balanceBudget[2])).toFixed(2)}</TableCell>
            <TableCell>
              <IconButton aria-label="edit" onClick={() => handleEdit(1, 'balance')} >
                <EditIcon style={{ color: green[300] }} />
              </IconButton >
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  } else if (props.tabType === 2 && edit) {
    return <EditForm setEdit={setEdit} type={'balance'} key={0} item={{ name: 'Saving Goal', amount: balanceBudget[0] }} />
  }
}