import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Control, Marker } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the CSS
import css from "./mapbox.css"

mapboxgl.accessToken = "pk.eyJ1IjoibWlsbGFubzgiLCJhIjoiY2x1MXA5Z2VyMGczejJpcnBra3Fsa2xyaiJ9.iaKOw1giTf7jI_wHTx9q3g";

function Mapbox(props){
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(props.coordenadas?.lng );
  useEffect(()=>{setLng(props.coordenadas?.lng)},[props.coordenadas])
  const [lat, setLat] = useState(props.coordenadas?.lat );
  useEffect(()=>{setLat(props.coordenadas?.lat)},[props.coordenadas])
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
  if (map.current) return; // initialize map only once
    
  map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng ||-58.38, lat || -34.60],
      zoom: zoom
    });
    
  
  
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      props.somethingChange({
        lng: map.current.getCenter().lng.toFixed(4),
        lat: map.current.getCenter().lat.toFixed(4)
      })
    });
  },[]);





  return <>
            <div ref={mapContainer} className={css.map_container}>
            </div>
        </>
}

export {Mapbox}