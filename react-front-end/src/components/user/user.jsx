import  React,{useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const User = () => {
  const params = useParams();
  const history = useHistory();
    useEffect(() => {
      setTimeout(() => {
        history.push('/dashboards/1');
      },1000);
  },[]);

//   useEffect(() => {
//     axios
//       .get("/users/1")
//       .then((res) => {
//         setState((prev) => ({ ...prev, users: res.data }));
//       });
//   }, []);
  
  return(
    <>
  <form>
    <h4> User Login</h4>
  <label>
    Email:
    <input type="text" name="name" />
  </label>
  <label>
    Password:
    <input type="password" name="name" />
  </label>
  <input type="submit" value="Submit" />
  {/* <button onClick = {()=> submitForm()} type="submit" value="Submit" name = "login"/> */}
  </form>
<form>
    <h4> User Registration</h4>
  <label>
    Email:
    <input type="text" name="name" />
  </label>
  <label>
    Password:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
    </>
  );
}
export default User;
