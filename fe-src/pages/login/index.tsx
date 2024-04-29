import React from "react"
import css from "./login.css"
import { useNavigate } from "react-router-dom"
import { Title } from "../../ui/title"
import { Subtitle } from "../../ui/subtitle"
import { LoginForm } from "../../components/loginForm"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"
import { useIdUser } from "../../hooks/idUser"
import {useTokenUser} from "../../hooks/tokenUser"

function LoginPage(){
  const navigate = useNavigate()
  const {eUser, setEmailUser} = useEmailUser()
  const {userId,setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  
  async function handlerForm(email,pass){
    const rta = await serviceToBackend.login(email,pass)
    const token = rta.token
    if(token){
      alert("Logueado con éxito")
      setEmailUser(email)
      const idUser = await serviceToBackend.getIdByEmail(email)
      setUserId(idUser)
      setUserToken(token)
      localStorage.setItem("emailUser",email)
      localStorage.setItem("idUser",idUser)
      localStorage.setItem("token",token)
      navigate("/")
    }else{
      alert("El email y/o la contraseña son incorrectas")
    }
  }
  return <>
    <Title align="center">Iniciar Sesión</Title>
    <Subtitle align="center">Ingresá los siguientes datos para iniciar sesión</Subtitle>
    <LoginForm handlerSubmit={handlerForm}></LoginForm>
    <a className={css.centrado} href="" onClick={()=>{navigate("/register")}}>Olvidé mi contraseña</a>
    </>
}

export {LoginPage}