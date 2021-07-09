
import React ,{Fragment, useContext}from 'react';
import dateContext from "../../context.js";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,Sector } from 'recharts';
import { useCallback, useState } from "react";

//Color themes for the pie charts
const COLORS = ['#ffa1b5', '#a1b5ff', '#FFCC66', '#66CCCC','#fcf092','#82ca9d','#f3a8f7'];

<<<<<<< HEAD
//Element of the pie chart from recharts library
const renderActiveShape = (props: any) => {
=======
//Element of the pie chart from recharts
const renderActiveShape = (props) => {
>>>>>>> df8dda2721a045ece61dd7ce25322ae17d00c82d
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
      >{`$ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function BudgetPieChart(){

  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

//Data for income budget and income total
  const data1 = incomeAndBudget.map(e=> {
     return {
      name: e.name,
      value: Number(e.income_sum),
    }
  })

//Data for expense budget and expense total
  const data2 = expenseAndBudget.map(e=> {
    return {
      name: e.name,
      value: Number(e.expense_sum),
    }
  })
  
  console.log(data1)
  return(
    <>
    {/* Pie chart for income showing types of income budget */}
    <PieChart width={400} height={300}>
    <Pie className="incomepie" 
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      data={data1}
      cx={180}
      cy={180}
      innerRadius={40}
      outerRadius={60}
      fill="#ffa1b5"
      dataKey="value"
      onMouseEnter={onPieEnter}
    >
      {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
      </PieChart>
        {/* Pie chart for expense showing types of expense budget */}
        <PieChart width={400} height={300}>
          <Pie className="expensepie"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data2}
          cx={180}
          cy={180}
          innerRadius={40}
          outerRadius={60}
          fill="#ffa1b5"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
        </PieChart>
    </>
    )
}