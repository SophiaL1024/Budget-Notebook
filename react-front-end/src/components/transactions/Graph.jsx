import React, {useContext}  from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const data = [
  {
    name: "January",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "March",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "April",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "May",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "June",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "July",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
  {
    name: "August",
    Expenses: 40,
    Income: 2400,
    amt: 2400
  },
];
export default function Graph() {
const {incomeTransactions, expenseTransactions} = useContext(dataContext);

return 

} 