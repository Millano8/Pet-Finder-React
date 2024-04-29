import React from "react"
import css from "./title.css"

function Title(props){
  return <h1 className={css.title} style={{color: props.color, textAlign: props.align}}>{props.children}</h1>
}

export {Title}