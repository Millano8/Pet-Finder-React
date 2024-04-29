import React, { useEffect, useState } from "react"
import css from "./mascotasReportadas.css" 
import { Title } from "../../ui/title"
import { Subtitle } from "../../ui/subtitle"
import ceroReportesImg from "./not_reports.png"
import { Button } from "../../ui/button"
import { serviceToBackend } from "../../lib/service"
import { useIdUser } from "../../hooks/idUser"
import { useNavigate } from "react-router-dom"
import {useTokenUser} from "../../hooks/tokenUser"
import { PetCard } from "../../components/petCard"

function MascotasReportadas(){

  const [mascotasReportadas,setMascotasReportadas] = useState([])
  
  const {userId, setUserId} = useIdUser()
  const {userToken,setUserToken} = useTokenUser()
  const navigate = useNavigate()

  useEffect(()=>{
    if(userId.user.id != "" ){
      getMascotasReportadas()
    }
  }, [userId])
  
  function clickOnEdit(id,image){
    localStorage.setItem("PetImage", image)
    navigate("/editar-mascota/"+ id)
  }


  async function getMascotasReportadas(){
    try{
      const idUser = userId.user.id
      const id = idUser.toString()
      const mascotasReportadasFromBackend = await serviceToBackend.getMascotaById(id, userToken)
      setMascotasReportadas(mascotasReportadasFromBackend)
    }catch(e){
      console.log(e)
    }
  }
  

  

  return <>
    <Title align="center">Mascotas reportadas</Title>
    {mascotasReportadas.length == 0 ? 
      <>
        <Subtitle align="center">Aún no reportaste mascotas perdidas</Subtitle>
        <div className={css.contenedor_imagen_button}>
          <img src={ceroReportesImg} className={css.img} alt="imagen_not_reports" />
          <Button color="#5A8FEC" clicked={localStorage.setItem("recargar","true")}redirect="/reportar-mascota">Publicar Reporte</Button>
        </div>
      </>
    : 
      <div className={css.card_distribution}>
        {mascotasReportadas.map((mascota)=>{
          return <PetCard key={mascota.id} id={mascota.id} editClick={clickOnEdit} buttonText="Editar" colorButton="#5A8FEC" nombre={mascota.pet_name} ubicacion={mascota.last_seen} foto={mascota.img}></PetCard>
        })}
      </div> 
  }
  </>
}

export {MascotasReportadas}