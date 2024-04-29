import React from "react"
import css from "./profile.css"
import { Title } from "../../ui/title"
import { Subtitle } from "../../ui/subtitle"
import { Button } from "../../ui/button"
import { useNavigate } from "react-router-dom"
import { useEmailUser } from "../../hooks/emailUser"


function ProfilePage(){
  const navigate = useNavigate()
  const {eUser, setEmailUser} = useEmailUser()
  
  function logOut(){
    setEmailUser("")
  }
  return <>
      <Title align="center">Mis datos</Title>
      {eUser ? <div className={css.contenedor_botones}>
        <Button color="#5A8FEC" redirect="/datos-personales">Modificar datos personales</Button>
        <Button color="#5A8FEC" redirect="/modificar-pass">Modificar contraseña</Button>
      </div> : <Subtitle align="center">Necesitas iniciar sesión para continuar</Subtitle>}
      
      <p className={css.centrado}>{eUser}</p>
      {eUser ? 
        <a className={css.centrado}href="" onClick={()=>{logOut();navigate("/")}}>Cerrar Sesión</a>
      :
      <Button redirect="/check-email" color="#5A8FEC">Iniciar Sesión</Button>
      }
  </>
}

export {ProfilePage}