import React from "react";
import { Title } from "../../ui/title";
import { Subtitle } from "../../ui/subtitle";
import { Button } from "../../ui/button/"
import logoHome from "./home_img.png"
import css from "./home.css"
import {useEmailUser} from "../../hooks/emailUser"
import {useIdUser} from "../../hooks/idUser"
import {useTokenUser} from "../../hooks/tokenUser"

function HomePage() {
	const {eUser, setEmailUser} = useEmailUser()
	const {userId, setUserId} = useIdUser()
	const {userToken,setUserToken} = useTokenUser()
	const lat = localStorage.getItem("Latitud")
	const long = localStorage.getItem("Longitud")
	return (
		<div>
			<img className={css.img} src={logoHome} alt="imagen_home"></img>
			<Title align="center" color="#EB6372">Pet Finder App</Title>
			<Subtitle align="center">Encontrá y reportá mascotas perdidas cerca de tu ubicación</Subtitle>
			<div className={css.contenedor_botones}>
				{!userToken  ? <Button redirect="/check-email" color="#5A8FEC">Iniciar Sesión</Button> : <Button redirect="/mascotas-perdidas-cerca" color="#5A8FEC">Dar mi ubicación actual</Button>}
				<Button redirect="/instructions" color="#00A884">¿Cómo funciona Pet Finder?</Button>
			</div>
		</div>
	);
}
export { HomePage };
