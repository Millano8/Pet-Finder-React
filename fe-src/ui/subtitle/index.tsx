import React from "react"
import css from "./subtitle.css"

function Subtitle(props){
  return <h3 className={css.subtitle} style={{textAlign:props.align}}>{props.children}</h3>
}

export {Subtitle}