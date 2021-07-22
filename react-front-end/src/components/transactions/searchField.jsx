import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';

export default function SearchField(props){

  const [value, setValue] = useState("");

  const onSearch=(value)=>{
  props.setSearch(value);
  }

  useDebounce(() => onSearch(value), 400);

  return(  
  <div className='search'>
  <SearchIcon />
  <InputBase 
  placeholder="Search…"
  value={value}
  onChange={event => setValue(event.target.value)}/>
  </div>)
}