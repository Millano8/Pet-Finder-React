import React from "react";
import css from "./userDataForm.css"
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

function UserDataForm(props){
  return <form className={css.formulario} onSubmit={(e)=>{
              e.preventDefault();
              props.handlerSubmit(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value)
            }}>
            <div>
              <Input name="Nombre" label="NOMBRE"></Input>
              <Input name="Apellido" label="APELLIDO"></Input>
              <Input name="Telefono" label="TELEFONO"></Input>
              <Input name="Localidad" label="LOCALIDAD"></Input>
            </div>
            <Button type="submit" color="#5A8FEC">Guardar</Button>
        </form>
}

export {UserDataForm}