import React, {useContext}  from "react";
import  dateContext  from "../../context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { parse } from "media-typer";

export default function Graph() {
const {incomeTransactions, expenseTransactions} = useContext(dateContext);
const {month,year} = useContext(dateContext);
const findSum = function(data, maxDay) {
  let sum = 0;
  const week = data.filter(item => item.day < maxDay );
  for (const item of week) {
    let x = parseInt(item.amount)
    // console.log("item:",item);
    sum += x
  }
  return sum;
};
console.log("findSum:",findSum(expenseTransactions, 8))
const data = [
  {
    name: "week 1",
    Expense: findSum(expenseTransactions, 8),
    Income: findSum(incomeTransactions, 8),
    amt: 6000
  },
  {
    name: "week 2",
    Expense: findSum(expenseTransactions, 15),
    Income: findSum(incomeTransactions, 15, 7),
    amt: 6000
  },
  {
    name: "week 3",
    Expense: findSum(expenseTransactions, 23),
    Income: findSum(incomeTransactions, 23),
    amt: 6000
  },
  {
    name: "week 4",
    Expense: findSum(expenseTransactions, 32),
    Income: findSum(incomeTransactions, 32),
    amt: 2400
  },
];


// dateContext
return (
  <LineChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 25
      }}
      style={{marginLeft:40}}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{paddingLeft:80}}/>
      <Line
        type="monotone"
        dataKey="Income"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
    </LineChart>
  );
}
