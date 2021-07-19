import React, { useContext } from "react";
import dataContext from "../../context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function Graph() {
  const { incomeTransactions, expenseTransactions } = useContext(dataContext);

  const findSum = function (data, maxDay) {
    let sum = 0;
    const week = data.filter(item => item.day < maxDay);
    for (const item of week) {
      let x = parseInt(item.amount)
      sum += x
    }
    return sum;
  };

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
      Income: findSum(incomeTransactions, 15),
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
      width={1100}
      height={250}
      data={data}
      margin={{
        top: 40,
        right: 30,
        left: 20,
        bottom: 10
      }}
      style={{ marginLeft: 40 }}

    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{ paddingLeft: 80 }} />
      <Line
        type="monotone"
        dataKey="Income"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={3}
      />
      <Line type="monotone" dataKey="Expense" stroke="#82ca9d" strokeWidth={3} />
    </LineChart>
  );
}
