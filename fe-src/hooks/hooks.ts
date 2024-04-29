
function returnDatos(){
  const datosUsuario = localStorage.getItem("datosUsuario")
  if (datosUsuario != null) {
    JSON.parse(datosUsuario) 
      
    const datosAny = datosUsuario as any
    const email = datosAny.email 
    const idUsuario = datosAny.idUser 
    const tokenUsuario = datosAny.token 

    return [email, idUsuario, tokenUsuario]

  } else {
    return {}
  }
  
}


const datos = returnDatos() as any



import {
	atom,
} from "recoil";


export const emailUser = atom({
  key: "emailOfUser",
  default: datos.email
})

export const idUser = atom({
  key: "idUser",
  default: datos.idUsuario
})

export const token = atom({
  key: "token",
  default: datos.tokenUsuario
})
