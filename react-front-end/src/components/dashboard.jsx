import  React,{useEffect, useState } from "react";
import axios from 'axios';
export default function Dashboard(){

  const [state, setState] = useState({
    dashboardData:{}
  }); 

  useEffect(() => {
    axios
      .get("/dashboards/1")
      .then((res) => {
        setState((prev) => ({ ...prev, dashboardData: res.data }));
      });
  }, []);
  
  return(
    <>
    monthlyIncomeSum :{state.dashboardData.monthlyIncomeSum }<br/>
    monthlyExpenseSum :{state.dashboardData.monthlyExpenseSum }<br/>
    annualIncomeSum :{state.dashboardData.annualIncomeSum }<br/>
    annualExpenseSum :{state.dashboardData.annualExpenseSum }<br/>
    </>
  );
}