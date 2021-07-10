import React ,{useEffect,useState} from "react"
import {useHistory}from 'react-router-dom'
import axios from 'axios'
import {TextField,Button} from '@material-ui/core/'
import { func } from "prop-types"

export default function User() {

  const history = useHistory();
  const[userId,setUserId]=useState(0);
  const [formValue, setFormValue] = useState({ 
  email:"",
  password:""
  });

  const handleChange = (key,value) => { 

  setFormValue(prev => ({...prev,[key]: value}))  
  };

 const handleSubmit=()=>{
  axios.post('http://localhost:3000/', {data:formValue})
  .then((res)=>{
    // console.log(res.data);
    if(res.data){
      // console.log('in if');
      history.push('/dashboards/1')
    }
  })
 }

  return(
  <>
  <form noValidate autoComplete="off">
  <TextField 
  id="standard-basic"
  label="Email"
  variant="outlined"
  value={formValue.email}
  onChange={(event)=>{handleChange('email',event.target.value)}}
   />
  <TextField
    // error
    id="outlined-error-helper-text"
    label="Password"
    // defaultValue="Hello World"
    // helperText="Incorrect entry."
    variant="outlined"
    value={formValue.password}
    onChange={(event)=>{handleChange('password',event.target.value)}}
    />
  </form>
  <Button onClick={handleSubmit} color="primary">
    Submit
  </Button>

  </>
  )
};


