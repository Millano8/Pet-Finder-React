import React from "react";
import { Title } from "../../ui/title";
import { Button } from "../../ui/button"
import css from "./instructions.css"

function Instructions() {
	return (
    <div className = {css.container_informacion}>
      <div>
        <Title align="center" color="#EB6372">¿Cómo funciona Pet Finder?</Title>
        <p className={css.justificado}>Con nuestra aplicación de Pet Finder, encontrar a 
          tu mascota perdida es más fácil que nunca. Solo necesitas registrarte, completar tu perfil y,
          en caso de pérdida, crear un informe detallado con la foto y descripción de tu compañero peludo. 
          Explora la sección de mascotas perdidas, donde aparecerán las mascotas cercanas según tu ubicación. 
          Cuando se logra un reencuentro, marca el caso como resuelto y comparte la alegría con la comunidad. 
          ¡Hacé que la búsqueda y reunión de mascotas perdidas sea una experiencia colaborativa y 
          emotiva con nuestra aplicación!</p>
      </div>
    <Button redirect="/"color="#4A5553">Volver</Button>
    </div>
	);
}
export {Instructions };
