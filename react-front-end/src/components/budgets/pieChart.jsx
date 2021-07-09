import React ,{useContext}from 'react';
import dateContext from "../../context.js";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';



export default function BudgetPieChart(){

  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);

  // let totalIncome=0;
  // incomeAndBudget.forEach(element => {
  //   totalIncome+=Number(element.income_sum);
  // });
  // let totalExpense=0;
  // expenseAndBudget.forEach(element => {
  //   totalExpense+=Number(element.expense_sum);
  // });

  const data = incomeAndBudget.map(e=> {
    // console.log(e)
    return {
      name: e.name,
      value: Number(e.income_sum)
    }
  })
  console.log(data)
  return(
    <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#00C49F"
        label
      />

      <Tooltip />
    </PieChart>
    // <>
    //   <ResponsiveContainer width="100%" height="100%">
    //     <PieChart width={400} height={400}>
      
    //       <Pie
    //         dataKey="value"
    //         isAnimationActive={false}
    //         data={data}
    //         cx="50%"
    //         cy="50%"
    //         outerRadius={80}
    //         fill="#8884d8"
    //         label
    //       />
         
    //       <Tooltip />
    //     </PieChart>
    //     </ResponsiveContainer>

    // "pie chart goes here"<br/>
    // totalIncome:{totalIncome}<br/>
    // totalExpense:{totalExpense} 
    // </>
    )
}

//incomeAndBudget looks like this:[{income_sum,id,name,month,year,userId},{},{},{},{},{},{}.......]

// So the Pie chart structure should be :
//incomeAndBudget[0].income_sum/totalIncome, incomeAndBudget[1].income_sum/totalIncome,....

// and show incomeAndBudget[0].name beside each part of pie.