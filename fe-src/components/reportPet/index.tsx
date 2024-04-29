import React, { useEffect, useState, useRef, useCallback } from "react"
import Dropzone from "react-dropzone"
import css from "./reportPet.css"
import { Input } from "../../ui/input"
import { Mapbox } from "../../ui/mapbox"
import { Subtitle } from "../../ui/subtitle"
import { Button } from "../../ui/button"
import {atom, useRecoilState} from "recoil"
import logoMascota from "./reporte_mascota.png"


function ReportPet(props){
  const [coordenadas, setCoordenadas] = useState({})
  console.log("Coordenadas en ReportPet: ", coordenadas)
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded image file
  const [imageURLFile, setURL] = useState(null)

  function getUbicacionActual(){
    const long = localStorage.getItem("Longitud")
    const lat = localStorage.getItem("Latitud")
    if(!lat && !long){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitud = position.coords.latitude;
          const longitud = position.coords.longitude;
          console.log("Latitud: ", latitud)
          console.log("Longitud: ", longitud)
          // Ahora puedes usar estas coordenadas con Mapbox
          setCoordenadas({
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
      setCoordenadas({lat: parseFloat(lat), lng: parseFloat(long)})
    }
}
  useEffect(()=>{
    getUbicacionActual()
  },[])

  const onDrop = useCallback((acceptedFiles) => {
    // Handle single file upload for simplicity
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const dataURL = event.target.result as string;
            console.log("dataURL:", dataURL);
            setImageFile(file); // Update state with the uploaded file
            setURL(dataURL)
          }
        };
        reader.readAsDataURL(file);}
    }
  }, []);

 
  return <form className={css.formulario} onSubmit={(e)=>{
    e.preventDefault()
    sessionStorage.setItem("PetImage",imageURLFile)
    sessionStorage.setItem("PetName",e.target[0].value)
    sessionStorage.setItem("LastSeenUbi",e.target[3].value)
    sessionStorage.setItem("Message",e.target[4].value)
    props.handlerSubmit({
      nombre: e.target[0].value,
      foto: imageURLFile,
      coordenadas: coordenadas,
      ubicacion: e.target[3].value,
      mensaje: e.target[4].value
    })
    }}>
    
    <Input defaultValue={props.mascotaFromBack?.nombre} name="nombre" label="NOMBRE"></Input>
    <div className={css.dropzone}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <img
                  className = {css.img}
                  src={imageFile ? URL.createObjectURL(imageFile) : logoMascota}
                  alt="Mascota (previsualización o imagen subida)" // Add alt text for accessibility
                />
                <input {...getInputProps()} />
              </div>
            </section>
          )}
        </Dropzone>
        <Subtitle align="center">Arrastrá aquí una imagen de tu mascota</Subtitle>
      </div>
    <Mapbox coordenadas={coordenadas} somethingChange={setCoordenadas} ></Mapbox>
    <div className={css.subtitle}>
      <Subtitle align="center">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</Subtitle>
    </div>
    <Input name="ubicacion" label="Ultima vez visto"></Input>
    <div className={css.divInput}>
    <label className={css.label} htmlFor="miInput">Mensaje</label>
    <textarea className={css.message} placeholder="Escribí acá tu mensaje" name="ubicacion" id="miInput" ></textarea>
    </div>
    {props.showGuardar ?
        <Button type="submit" color="#00A884">Reportar mascota</Button> :
        <Button color="#5A8FEC">Guardar</Button>}

  </form>
}

export {ReportPet}