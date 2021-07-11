import React ,{useContext,useState} from "react"
import {useHistory}from 'react-router-dom'
import axios from 'axios'
import dateContext from "../../context.js";
import {TextField,Button} from '@material-ui/core/'
// import { func } from "prop-types"

export default function User() {

  const history = useHistory();
  
  const {setUserId} = useContext(dateContext);
  
  const [err,setErr]=useState(false);

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
      setUserId(res.data.id)
      history.push('/dashboards/')
    }else{
     setErr("Incorrect Password.")
    }
  })
 };


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
    error={err?true:false}
   
    id="outlined-error-helper-text"
    label="Password"
    // defaultValue="Hello World"
    helperText={err}
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


