import React from "react";
import css from "./button.css"
import { useNavigate } from "react-router-dom";

function Button(props){
  const navigate = useNavigate()  
  return <button className={css.boton} style={{backgroundColor: props.color}} type={props.type} onClick={()=>{
    //refactor
    if(props.clicked){
      props.clicked()
    }  
    if(props.redirect){
      navigate(props.redirect)
    }
  
  }}>{props.children}</button>
}

export {Button}