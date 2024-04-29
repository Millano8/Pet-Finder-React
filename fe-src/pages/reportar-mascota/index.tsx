import React, { useEffect, useState } from "react"
import { Title } from "../../ui/title"
import { Subtitle } from "../../ui/subtitle"
import { Button } from "../../ui/button"
import { ReportPet } from "../../components/reportPet"
import { serviceToBackend } from "../../lib/service"
import {useEmailUser} from "../../hooks/emailUser"
import {useIdUser} from "../../hooks/idUser"
import {useTokenUser} from "../../hooks/tokenUser"
import { useNavigate } from "react-router-dom"

function ReportarMascota(){
  const {eUser,setEmailUser} = useEmailUser()
  const {userId,setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  const lat = localStorage.getItem("Latitud")
  const long = localStorage.getItem("Longitud")
  

  const navigate = useNavigate()
  
  async function handlerSubmit(info){
    const rta = await serviceToBackend.uploadImage(info.foto)
    let infoAEnviar = info
    infoAEnviar.foto = rta
    const respuesta = await serviceToBackend.publicarReporteMascota(eUser,infoAEnviar)
    alert("mascota publicada")
    navigate("/mascotas-reportadas")
  }

  return <>
        <Title align="center">Reportar mascota</Title>
        <Subtitle align="center">Ingresá la siguiente información para realizar el reporte de la mascota</Subtitle>
        <ReportPet handlerSubmit={handlerSubmit} showGuardar={true}></ReportPet>
        <Button color="#4A5553">Cancelar</Button>
  </>
}

export { ReportarMascota }

