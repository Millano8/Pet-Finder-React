const API_URL = "http://localhost:3003"
import {useIdUser} from "../hooks/idUser"

export const serviceToBackend = {

    // 
    async chequeoExistenciaEmail(email: string) {
          const rta = await fetch(`${API_URL}/users/${email}`);
          const data = await rta.json();
          return data;
      },
    async login(email:string,password:string){
      const rta = await fetch(`${API_URL}/auth/token`, {
              method: "post",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });
          const data = await rta.json();
      return data
    },
    async register(email:string,password:string){
      const rta = await fetch(`${API_URL}/auth`, {
              method: "post",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify({ email, password }),
          });
          const data = await rta.json();
          return data;
    },
    async getIdByEmail(email: string){
          const user_id = await fetch(`${API_URL}/users/${email}`)
          const IdReportador = await user_id.json()
          return IdReportador;
    },
      async updateDatosUsuario(user_id, first_name:string, last_name:string, phone_number:string,city:string, token){
        
          const user = await fetch(`${API_URL}/set-user-data`, {
              method: "post",
              headers: {
                  "content-type": "application/json",
                  "authorization": "bearer " + token
              },
              body: JSON.stringify({ user_id, first_name,last_name, phone_number, city }),
          });
          const data = await user.json();
          return data;
      },
      async updateContraseniaUsuario(password:string, confirmPassword:string, userToken:string){ 
          const rta = await fetch(
              `${API_URL}/password`,
              {
                  method: "post",
                  headers: {
                      "content-type": "application/json",
                      "authorization": "bearer " + userToken
                  },
                  body: JSON.stringify({ password: password, confirmPassword: confirmPassword }),
              }
          );
          const data = await rta.json();
          return data;
      },
      async getMascotasReportadasById(userId:string,petId: string, userToken){
          const data = await fetch(`${API_URL}/reports/${userId}/${petId}`,{  
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization": "bearer " + userToken
                },
          })
          const rta = await data.json()
          return rta
      },
      async uploadImage(dataURL:string){
        const url = dataURL
        const rta = await fetch(`${API_URL}/upload-image`,{
            method:"post",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                imageURL: url
            })
        })
        return rta.json()
      },
      async publicarReporteMascota(emailUser:string,info){
          const idReportador = await this.getIdByEmail(emailUser);
          const nombre = idReportador.user.first_name != null ? idReportador.user.first_name : emailUser
          const telefono = idReportador.user.phone_number != null ? idReportador.user.phone_number : ""
          const rta = await fetch(`${API_URL}/reports/create`, {
              method: "post",
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify({
                  owner_id: idReportador.user.id,
                  owner_name: nombre,
                  owner_phone_number: telefono,
                  pet_name: info.nombre,
                  message: info.mensaje,
                  last_seen_lat: parseFloat(info.coordenadas.lat),
                  last_seen_lon: parseFloat(info.coordenadas.lng),
                  last_seen: info.ubicacion,
                  img: info.foto,
                  lost:true
              }),
          });
          return rta.json();
      },
      async actualizarDatosMascota(idMascota, userId, owner_name,owner_phone,info, image,token){

          const data = await fetch(`${API_URL}/reports/edit-report`,{
              method: "put",
              headers: {
                  "content-type": "application/json",
                  "authorization": "bearer " + token,
              },
              body: JSON.stringify({
                  id: idMascota,
                  owner_id: userId,
                  owner_name: owner_name,
                  owner_phone_number: owner_phone,
                  pet_name: info.nombre,
                  message: info.mensaje,
                  last_seen_lat: parseFloat(info.coordenadas.lat),
                  last_seen_lon: parseFloat(info.coordenadas.lng),
                  last_seen: info.ubicacion,
                  img: image,
                  lost: true
              }),
          })
          const rta = await data.json();
          return rta
      },
      async getMascotasCerca(email,lat_user,lng_user,idUser){
          const data = await fetch(`${API_URL}/reports/find-near-pets?lat=${lat_user}&lng=${lng_user}`)
          const rta = await data.json()
          //agarro el id del usuario
          const user_id = idUser
          //pido esas mascotas a la base de datos
          const mascotasPosta = []
          if (!rta.message) {
            for (const i of rta) {
                if (i.owner_id != user_id){
                    mascotasPosta.push(i)
                }
            }
          } 
          
          return mascotasPosta
      },
      async getMascotaById(id,token){
          const data = await fetch(`${API_URL}/reports/${id}`,{
            method: "get",
              headers: {
                  "content-type": "application/json",
                  "authorization" : "bearer " + token
              },
          })
          const rta = await data.json()
          return rta;
      },
      async notificarMascotaEncontrada(idMascota, userId, owner_name,owner_phone,petName,mensaje,lat,lng,ubicacion,image,token){
          const data = await fetch(`${API_URL}/mascota-encontrada-by-id`,{
              method: "put",
              headers: {
                  "content-type": "application/json",
                  "authorization": "bearer " + token
              },
              body: JSON.stringify({
                  id: idMascota,
                  owner_id: userId,
                  owner_name: owner_name,
                  owner_phone_number: owner_phone,
                  pet_name: petName,
                  message: mensaje,
                  last_seen_lat: parseFloat(lat),
                  last_seen_lon: parseFloat(lng),
                  last_seen: ubicacion,
                  img: image,
                  lost: false
              }),
          })
          const rta = await data.json();
          return rta
      }
      ,
      async eliminarMascotaById(id,token){
          const data = await fetch(`${API_URL}/reports/delete`,{
              method: "delete",
              headers: {
                  "content-type": "application/json",
                  "authorization": "bearer " + token
              },
              body: JSON.stringify({
                  reportId: id
              }),
          })
          const rta = await data.json();
          return rta
      },
      async getEmailById(id) {
          const data = await fetch(`${API_URL}/get-email-by-id/${id}`)
          const rta = await data.json()
          return rta
      }
      ,
      async reportarMascota(owner_mail,obj,token){
          const data = await fetch(`${API_URL}/enviar-email`,{
              method: "post",
              headers: {
                  "content-type": "application/json",
                  "authorization": "bearer " + token
              },
              body: JSON.stringify({
                  to: owner_mail,
                  subject: "Mascota Perdida",
                  textBody: {
                      nombreReportador:obj.nombre, 
                      telefono: obj.telefono, 
                      informacion: obj.informacion
                  }
              }),
          })
          const rta = await data.json()
          return rta
      }
  }