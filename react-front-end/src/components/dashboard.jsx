import  React,{useEffect, useState,useContext } from "react";
import axios from 'axios';
import dateContext from "../context.js";

const Dashboard=function(){

  const [state, setState] = useState({
    dashboardData:{}
  }); 

  const {month,year} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/dashboards/1",   { params: {  year,month } } )
      .then((res) => {
        setState((prev) => ({ ...prev, dashboardData: res.data }));
      });
  }, [month,year]);
  
  return(
    <>
    monthlyIncomeSum :{state.dashboardData.monthlyIncomeSum }<br/>
    monthlyExpenseSum :{state.dashboardData.monthlyExpenseSum }<br/>
    annualIncomeSum :{state.dashboardData.annualIncomeSum }<br/>
    annualExpenseSum :{state.dashboardData.annualExpenseSum }<br/>
    selected month:{month}<br/>
    selected year:{year}<br/>
    </>
  );
}

export default Dashboard;