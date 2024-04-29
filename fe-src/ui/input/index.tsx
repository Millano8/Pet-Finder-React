import React from "react"
import css from "./input.css"
function Input(props){
  return <div className={css.contenedorInput}>
      <div className={css.label}>{props.label}</div>
      <input name={props.name} className={css.input} type={props.type} defaultValue={props.defaultValue || ""}></input>
    </div>
}


export {Input}