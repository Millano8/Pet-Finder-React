import React from "react"
import css from "./datosPersonales.css"
import { useNavigate } from "react-router-dom"
import { Title } from "../../ui/title"
import { UserDataForm } from "../../components/userDataForm"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"
import { useIdUser } from "../../hooks/idUser"
import { useTokenUser } from "../../hooks/tokenUser"

function DatosPersonalesPage(){
  const navigate = useNavigate()
  const {userId, setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  
  async function handlerSubmit(nombre:string, apellido:string, telefono:string,localidad:string){
    if(userId){
      const rta = await serviceToBackend.updateDatosUsuario(userId,nombre,apellido,telefono,localidad,userToken)
      console.log(rta)
      alert("Datos actualizados!")
      navigate("/")
    }
    else{
      alert("Para realizar esta acción debe estar logueado")
      navigate("/login")
    }
  }

  return <div className={css.contenedor}>
      <Title align="center">Datos personales</Title>
      <UserDataForm handlerSubmit={handlerSubmit}></UserDataForm>
  </div>
}

export { DatosPersonalesPage }