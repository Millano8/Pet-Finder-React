import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import css from "./loginForm.css"

function LoginForm(props){
  return <form className={css.formulario} onSubmit={(e)=>{
              e.preventDefault()
              const email = e.target[0].value
              const pass = e.target[1].value
              props.handlerSubmit(email,pass)
            }}>
            <Input name="email" label="Email"></Input>
            <Input name="password" label="Contraseña" type="password"></Input>
            <div className={css.contenedor_botones}>
              <Button type="submit" color="#5A8FEC">Acceder</Button>
            </div>
        </form>
}

export {LoginForm}