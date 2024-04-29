import React from "react"
import css from "./modificarPass.css"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Title } from "../../ui/title"
import { useNavigate } from "react-router-dom"
import { useEmailUser } from "../../hooks/emailUser"
import {useTokenUser} from "../../hooks/tokenUser"
import { serviceToBackend } from "../../lib/service"

function ModificarContrasenia(){
  const navigate = useNavigate()
  const {userToken, setUserToken} = useTokenUser()
  const { eUser, setEmailUser } = useEmailUser()
  
  async function handlerSubmit(pass:string,passConfirm:string){
    if(pass === passConfirm){
      if(userToken){
        await serviceToBackend.updateContraseniaUsuario(pass, passConfirm, userToken)
        alert("Datos actualizados!")
        navigate("/")
      }
      else{
        alert("Para realizar esta acción debe estar logueado")
        navigate("/login")
      }
    }
    else{
      alert("Las contrasenias tienen que ser iguales")
    }
  }
  return <div className={css.contenedor}>
      <Title align="center">Contraseña</Title>
      <form className={css.formulario} onSubmit={(e)=>{
          e.preventDefault()
          handlerSubmit(e.target[0].value, e.target[1].value)}}>
        <div>
          <Input name="pass" label="CONTRASEÑA" type="password"></Input>
          <Input name="passConfirm" label="CONFIRMAR CONTRASEÑA" type="password"></Input>
        </div>
        <Button type="submit" color="#5A8FEC">Guardar</Button>
      </form>
  </div>
}

export { ModificarContrasenia }