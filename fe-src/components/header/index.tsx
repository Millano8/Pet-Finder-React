import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import css from "./header.css";
import logoHeader from "./logo_header.png"
import cruz from "./cruz.svg"
import { Instructions } from "../../pages/instructions";
import {useEmailUser} from "../../hooks/emailUser"
import {useIdUser} from "../../hooks/idUser"
import {useTokenUser} from "../../hooks/tokenUser"

function Header(props){

  const {userId,setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  const {eUser,setEmailUser} = useEmailUser()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  function handlerIsOpen(){
    setIsOpen(!isOpen)
  }

  return <div className={css.header_container}>
          {isOpen ?
            <div className={css.ventana}>
              <img src={cruz} onClick={()=>{handlerIsOpen()}} className={css.ventana__cierra_ventana}/>
              <div className={css.ventana__cont}>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/")}}>Home</p>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/profile")}}>Mis Datos</p>
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();{eUser ? navigate("/mascotas-reportadas"): navigate("/login")}}} >Mis Mascotas Reportadas</p>
                <p className={css.ventana__contenido} onClick={()=>{localStorage.setItem("recargar","true");handlerIsOpen();{eUser ? navigate("/reportar-mascota") : navigate("/login")}}}>Reportar Mascota</p>
                <p>{props.emailUser}</p>
                {props.emailUser ? 
                <p className={css.ventana__contenido} onClick={()=>{
                  localStorage.removeItem("recargar")
                  localStorage.removeItem("idUser")
                  localStorage.removeItem("emailUser")
                  localStorage.removeItem("PetImage")
                  localStorage.removeItem("LostPetId")
                  localStorage.removeItem("ReporterEmail")
                  setEmailUser("")
                  setUserId("")
                  setUserToken("")
                  handlerIsOpen()
                  props.logOut()
                  navigate("/check-email")}}>Cerrar Sesion</p>
                :
                <p className={css.ventana__contenido} onClick={()=>{handlerIsOpen();navigate("/check-email")}}>Iniciar Sesión</p>
                }
              </div>
            </div>
          :<></>}
          <img className={css.img} src={logoHeader} alt="logo"></img>
          <div onClick={()=>{handlerIsOpen()}} className={css.header__PSC_mobile}>
            <div className={css.barra}></div>
            <div className={css.barra}></div>
            <div className={css.barra}></div>
          </div>
        </div>
}

export {Header}