import  React, {useEffect, useState } from "react";
import axios from 'axios';
export default function balance(){

  const [state, setState] = useState({
    balanceData:{}
  }); 

  useEffect(() => {
    axios
      .get("/balances/1")
      .then((res) => {
        setState((prev) => ({ ...prev, balanceData: res.data }));
      });
  }, []);
  
  return(
    <>
    monthlyIncomeSum :{state.balanceData.monthlyIncomeSum }<br/>
    monthlyExpenseSum :{state.balanceData.monthlyExpenseSum }<br/>
    annualIncomeSum :{state.balanceData.annualIncomeSum }<br/>
    annualExpenseSum :{state.balanceData.annualExpenseSum }<br/>
    </>
  );
}

