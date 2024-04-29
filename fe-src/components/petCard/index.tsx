import React, { useEffect, useState } from "react";
import css from "./petCard.css"
import { Button } from "../../ui/button";
import { useIdUser } from "../../hooks/idUser"

function PetCard(props){
  return <div className={css.container}>
            <img className={css.imagen} src={props.foto} />
            <div className={css.info_container}>
            <div className={css.nombre_lugar}>
              <div className={css.nombre}>{props.nombre}</div>
              <div>{props.ubicacion}</div>
            </div>
            <div onClick={()=>{
              localStorage.setItem("PetImage",props.foto)
              localStorage.setItem("LostPetId",props.id)
              localStorage.setItem("ReporterEmail",props.reporter_mail)
              if(props.saveIdMascota){
                props.saveIdMascota(props.id)
              }
              props.editClick(props.id,props.foto)
              
              }}>
              <Button className={css.button_editar} color={props.colorButton} onClick={props.editClick}>{props.buttonText}</Button>
            </div>
						</div>
				</div>
}

export {PetCard}