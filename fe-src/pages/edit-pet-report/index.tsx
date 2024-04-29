import React, { useEffect, useState } from "react"
import css from "./editarReporte.css"
import { useNavigate, useParams } from "react-router-dom"
import { serviceToBackend } from "../../lib/service"
import { Title } from "../../ui/title"
import { ReportPet } from "../../components/reportPet"
import {useTokenUser} from "../../hooks/tokenUser"
import {useIdUser} from "../../hooks/idUser"
import { Button } from "../../ui/button"
import { Subtitle } from "../../ui/subtitle"
import { token } from "../../hooks/hooks"

function EditarReporte(){
  const {userId, setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  const [mascota, setMascota] = useState({})
  const [perdido,setPerdido] = useState(true)
  const [llamadaAlBack, setLlamadaAlBack] =  useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  
  async function guardar(obj){
    const idUser = (userId.user.id).toString()
    const ownerPhone = userId.user.phone_number
    const firstName = userId.user.first_name
    const rta = await serviceToBackend.uploadImage(obj.foto)
    const reporte = await serviceToBackend.actualizarDatosMascota(id,idUser,firstName,ownerPhone,obj,rta,userToken)
    alert("Datos actualizados")
    navigate("/mascotas-reportadas")
  }

  async function mascotaEncontrada(){
    const lat = localStorage.getItem("Latitud")
    const lng = localStorage.getItem("Longitud")
    const petName = sessionStorage.getItem("PetName")
    const ubi = sessionStorage.getItem("LastSeenUbi")
    const message = sessionStorage.getItem("Message")
    const idUser = (userId.user.id).toString()
    const ownerPhone = userId.user.phone_number
    const firstName = userId.user.first_name
    const image = localStorage.getItem("PetImage")
    await serviceToBackend.notificarMascotaEncontrada(id, idUser,firstName,ownerPhone,petName,message,lat,lng,ubi,image,userToken)
    alert("Recibimos tu notificacion! Gracias por ayudarnos!")
    navigate("/mascotas-reportadas")
  }

  async function eliminarMascota(){
    const rta = await serviceToBackend.eliminarMascotaById(id,userToken)
    console.log(rta)
    alert("Reporte eliminado con éxito!")
    navigate("/mascotas-reportadas")
  }

  async function getMascotaById(){
    const user = (userId.user.id).toString()
    const mascotaFromBack = await serviceToBackend.getMascotasReportadasById(user,id.toString(),userToken)
    localStorage.setItem("PetImage",mascotaFromBack.img)
    mascotaFromBack.lost == false ? setPerdido(false) : setPerdido(true)
    setMascota(mascotaFromBack)
    setLlamadaAlBack(false)
  }
  
  useEffect(()=>{
    getMascotaById()
  },[])
  
  return <>
    {llamadaAlBack
      ?
        <Subtitle>Cargando...</Subtitle>
      :
      <>
        <Title align="center">Editar reporte</Title>
        { perdido == false ? <h2 className={css.mascotaEncontrada}>Esta mascota ya fue encontrada :)</h2> : <></>}
        <ReportPet handlerSubmit={guardar} img={mascota["fotoURL"]} mascotaFromBack={mascota} showGuardar={false}></ReportPet>
        <div className={css.contenedor_botones}>
          <Button clicked={mascotaEncontrada} color="#00A884">Reportar como encontrado</Button>
          <Button clicked={eliminarMascota} color="#EB6372">Eliminar reporte</Button>
        </div>
      </>
    }
  </>
}

export {EditarReporte}


