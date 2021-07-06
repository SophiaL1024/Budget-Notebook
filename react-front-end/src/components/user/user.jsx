import  React,{useEffect, useState } from "react";
import axios from 'axios';

const User = function(){

  const [state, setState] = useState({
    userData:{}
  }); 

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setState((prev) => ({ ...prev, userData: res.data }));
      });
  }, []);
  
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
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
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
