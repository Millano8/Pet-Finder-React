import React from "react"
import css from "./register.css"
import { Title } from "../../ui/title"
import { Subtitle } from "../../ui/subtitle"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useNavigate } from "react-router-dom"
import { serviceToBackend } from "../../lib/service"
import { useEmailUser } from "../../hooks/emailUser"
import { useIdUser } from "../../hooks/idUser"

function RegisterPage(){
  const navigate = useNavigate()
  const {eUser, setEmailUser} = useEmailUser()
  const {userId,setUserId} = useIdUser()

  async function handlerForm(e){
    e.preventDefault()
    const email = e.target.elements.email.value;
    const contra = e.target.elements.contrasenia.value;
    const confirmContra = e.target.elements.confirmarContrasenia.value;
    if(contra === confirmContra){
      const rta = await serviceToBackend.register(email,contra)
      if(rta){
        alert("Cuenta creada con éxito")
        setEmailUser(email)
        const idUser = await serviceToBackend.getIdByEmail(email)
        setUserId(idUser)
        localStorage.setItem("emailUser",email)
        localStorage.setItem("idUser",idUser)
        navigate("/login")
      }
    }else{
      alert("las contraseñas no coinciden")
    }
  }
  return <>
    <Title align="center">Registrarse</Title>
    <Subtitle align="center">Ingresá los siguientes datos para realizar el registro</Subtitle>
    <form className={css.formulario} onSubmit={(e)=>{handlerForm(e)}}>
      <div>
        <Input name="email" label="Email"></Input>
        <Input name="contrasenia" label="Contraseña" type="password"></Input>
        <Input name="confirmarContrasenia" label="Confirmar Contraseña" type="password"></Input>
      </div>
      <p className={css.centrado}>¿Ya tenes una cuenta? <a href="" onClick={()=>{navigate("/login")}}>Iniciar Sesión</a></p>
      <div className={css.contenedor_botones}>
        <Button type="submit" color="#5A8FEC">Siguiente</Button>
      </div>
    </form>
    </>
}

export {RegisterPage}