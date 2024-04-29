import React, { useEffect, useState } from "react";
import css from "./nearBy-Pets.css"
import { Title } from "../../ui/title";
import { serviceToBackend } from "../../lib/service";
import { useEmailUser } from "../../hooks/emailUser";
import { Subtitle } from "../../ui/subtitle";
import { PetCard } from "../../components/petCard";
import { ReporterVentana } from "../../components/reporter";
import {useIdUser} from "../../hooks/idUser"
import {useTokenUser} from "../../hooks/tokenUser"

function NearByLostPets(){
  const {userToken,setUserToken} = useTokenUser()
  const {userId,setUserId} = useIdUser()
  const [mascotasCerca, setMascotasCerca] = useState([])
  const [llamadaAlBack, setLlamadaAlBack] = useState(false)
  const [latitudLongitud,setLatitudLongitud] = useState({lat:0,lng:0})
  const {eUser, setEmailUser} = useEmailUser()
  const [showVentana, setShowVentana] = useState(false)
  const [idMascota, setIdMascota] = useState(-1)
  
  
  function getUbicacionActual(){
    const long = localStorage.getItem("Longitud")
    const lat = localStorage.getItem("Latitud")
    if(!lat && !long){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitud = position.coords.latitude;
          const longitud = position.coords.longitude;
          // Ahora puedes usar estas coordenadas con Mapbox
          setLatitudLongitud({
            lat: latitud,
            lng: longitud
          })
          localStorage.setItem("Latitud",latitud.toString())
          localStorage.setItem("Longitud",longitud.toString())
        }, function (error) {
          console.error(`Error al obtener la ubicación: ${error.message}`);
        });
      }else{
        alert("Tu navegador no soporta esta versión, intentelo más tarde o con otro navegador")
      }
    } else{
      setLatitudLongitud({lat: parseFloat(lat), lng: parseFloat(long)})
    }
}
    

  function AbrirCerrarVentana(){
    setShowVentana(!showVentana)
  }

  async function getMascotasCerca(){
    const long = localStorage.getItem("Longitud")
    const lat = localStorage.getItem("Latitud")
    const idUser = userId.user.id
    const mascotasCercaFromBack = await serviceToBackend.getMascotasCerca(eUser,lat,long,idUser)
    setMascotasCerca(mascotasCercaFromBack)
  }

  async function enviarMensaje(obj){
    const mascotaImage = localStorage.getItem("PetImage")
    const mascotaId = localStorage.getItem("LostPetId")
    const reporterMail = localStorage.getItem("ReporterEmail")
    const rta = await serviceToBackend.reportarMascota(reporterMail,obj,userToken)
    alert("Mascota reportada! Gracias por tu colaboracion")
    AbrirCerrarVentana()
  }

  useEffect(()=>{
    getUbicacionActual()
    getMascotasCerca()
    setLlamadaAlBack(true)
  },[])
  return <>
    {showVentana
    ?
      <ReporterVentana handlerSubmitForm={enviarMensaje} handlerCerrarVentana={AbrirCerrarVentana}></ReporterVentana>
    :
      <></>
    }
    <Title align="center">Mascotas perdidas cerca</Title>
    {mascotasCerca.length == 0 ? 
      <><Subtitle align="center">No hay mascotas cerca</Subtitle></>
    :
      <div className={css.card_distribution}>
      {mascotasCerca.map((mascota)=>{
        return <PetCard key={parseInt(mascota.objectID)}
                  id={parseInt(mascota.objectID)}
                  buttonText="Reportar"
                  reporter_mail= {mascota.owner_name} 
                  colorButton="#EB6372" 
                  nombre={mascota.pet_name} 
                  ubicacion={mascota.last_seen} 
                  foto={mascota.img}
                  editClick={AbrirCerrarVentana}
                  saveIdMascota={setIdMascota}
                  />
      })}
  </div>
    }
  </>
}

export {NearByLostPets}
