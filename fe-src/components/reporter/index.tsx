import React from "react";
import css from "./reporter.css"
import { Title } from "../../ui/title";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

function ReporterVentana(props){

  
  function handlerSubmit(e){
    props.handlerSubmitForm({
      nombre: e.target[0].value,
      telefono: e.target[1].value,
      informacion: e.target[2].value,
    })
  }

  return <form onSubmit={(e)=>{e.preventDefault();handlerSubmit(e)}}className={css.contenedor_report}>
            <p className={css.x} onClick={()=>{props.handlerCerrarVentana()}}>X</p>
            <Title align="center" color="white">Reportar info{props.nombreMascota}</Title>
            <Input name="nombre"class="input" label="Nombre" placeholder=""></Input>
            <Input name="telefono" class="input" label="Teléfono (011 1111-1111)" placeholder=""></Input>
            <Input name="info" class="input" label="¿Dónde lo viste?" placeholder=""></Input>
            <Button class="button enviar-info" color="#00A884">Enviar Información</Button>
        </form>
}

export {ReporterVentana}
