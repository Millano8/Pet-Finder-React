import dotenv from "dotenv"
import cors from "cors"
import * as path from "path"
import { Middlewares } from "./middlewares";
import {UserController} from "./controllers/users-controller"
import { AuthController } from "./controllers/auth-controller"
import {ReportController} from "./controllers/report-controller"
import { SeenController, SeenType } from "./controllers/seen-controller";
import { petIndex } from "./lib/algolia";
import {sequelize} from "./models/connection"
import { PetController } from "./controllers/pets-controller";
import {Resend} from "resend"
const express = require('express');
const app = express()
const PORT = 3003 /* || 9999;*/;

app.use(express.json({
    limit: "50mb"
}));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../../dist")));

//sequelize.sync({force:true})


const resend = new Resend('re_hHbWRE9g_HmqmRvDwwxz9E2ccMzEKQbwP')

//SIGNUP - AUTHENTICATION
app.post("/auth", async (req, res)=>{
    try{
        const userData = req.body
        if(!userData.email || !userData.password) return res.status(400).send({message:"Se necesitan el usuario y la contraseña para registrar al usuario."});
        if(userData.password.length < 8) return res.status(400).send({message:"La contraseña debe tener al menos 8 caracteres."});
        const newUser = await UserController.createUser(userData);
        if(!newUser){
            return res.status(409).json({message:"El usuario ya está registrado."});
        } else {
            const authData = {user_id: newUser.get("id") as number, email: newUser.get("email") as string, hashedPassword: newUser.get("password") as string};
            const newAuth = await AuthController.create(authData);
            if(!newAuth){
                return res.status(400).json({message:"Error al crear la autenticación del usuario"});
            } else {
                res.status(201).json({
                    newUser,
                    newAuth
                });
            };
        }
    } catch (e) {
        res.status(400).json({message: "El correo electrónico o la contraseña que estás ingresando son inválidos."})
    }
});

//LOGIN - CREAR TOKEN PARA INGRESAR POSTERIORMENTE
app.post("/auth/token", async (req, res) => {
    const userData = req.body;
    if(!userData.email || !userData.password) return res.status(400).send({message:"Debes ingresar tu correo electrónico y contraseña para iniciar sesión."});
    try{
        const auth = await AuthController.getAuthByEmailAndPassword(userData.email, userData.password);
        if (!auth) {
            res.status(403).json({message: 'El correo electónico o la contraseña que estás ingresando son incorrectos.'});
        } else {
            const user = await UserController.getUserById(auth.auth.get("user_id") as number);
            res.json({user, token: auth.token});
        }
    } catch (e) {
        res.status(404).json({message: "No existe usuario con ese correo electrónico."})
    }
});
//AUTENTICACIÓN
app.get("/me", Middlewares.verifyToken, async(req, res)=>{
    try{
        const user = await UserController.getUserById(req._user.id);
        res.json(user);
    } catch (e) {
        console.log("Error in get /users", e);
    }
});
//GET ID BY MAIL
app.get("/get-id-by-email/:email", async (req, res) => {
	const {email} = req.params
	if(email != "null"){
		const rta = await AuthController.findByEmailAuth(email)
        const rtaCasteada = rta as any
		return res.json(rtaCasteada["user_id"]);
	}
	res.json({})
});

//CARGAR DATOS PERSONALES
app.post("/set-user-data", Middlewares.verifyToken, async(req, res)=>{
    try{
        const {user_id, first_name, last_name, phone_number, city} = req.body;
        const updatedUser = await UserController.setUserData(user_id, first_name, last_name, phone_number, city);
        res.status(200).json({updatedUser});
    } catch (e) {
        console.log("Error in post /set-user-data", e);
    }
});
//OBTENER TODOS LOS USUARIOS
app.get("/users", async(req, res)=>{
    try{
        const allUsers = await UserController.getAllUsers();
        res.status(200).json({allUsers});
    } catch (e) {
        console.log("Error in get /users", e);
    }
});
//CAMBIAR CONTRASEÑA
app.post("/password", Middlewares.verifyToken, async(req, res)=>{
    try{
        const {password, confirmPassword} = req.body;
        if(!password) return res.status(400).send({message:"Debes ingresar una contraseña válida para poder cambiarla."});
        if(password.length < 8) return res.status(400).send({message:"La contraseña debe tener al menos 8 caracteres."});
        if(password !== confirmPassword) return res.status(400).send({message:"Las contraseñas no coinciden."});
        await UserController.updatePassword(req._user.id, password);
        const auth = await AuthController.updatePassword(req._user.id, password);
        res.status(200).json(auth);
    } catch (e) {
        console.log("Error in post /password", e);
    }
});
//OBTENER USUARIO POR EMAIL
app.get("/users/:userEmail", async(req, res)=>{
    try{
        if((req.params.userEmail).length <= 0) return res.status(400).json({message: "El email no es valido"})
        const user = await UserController.getUserByEmail(req.params.userEmail);
        if(!user){
            return res.status(404).json({message: `El usuario con el email: ${req.params.userEmail} no existe`})
        }else{
            res.status(200).json({user});
        };
    } catch (e) {
        console.log("Error in get /users/:userEmail",e);
    }
});
/////////////////////////////////////////////////////SUPPORTS//////////////////////////////////////////////////////////////////
//CARGAR IMAGEN EN CLOUDINARY
app.post("/upload-image",async (req, res) => {
    try{
        const {imageURL} = req.body;
        if(!imageURL) return res.status(400).send({message:"Se necesita la dataURL de la imagen."});
        const imgSrc = await ReportController.uploadImage(imageURL);
        if(!imgSrc){
            return res.status(400).json({message:"Error al subir la imagen a Cloudinary"});
        } else {
            res.status(201).json(imgSrc);
        };
    } catch (e) {
        console.log("Error in post /upload-image", e);
    }
});
/////////////////////////////////////////////////////REPORTS//////////////////////////////////////////////////////////////////
//CREAR REPORTE
app.post("/reports/create", async (req, res) => {
    try{
        let report = req.body;
        report.lost = true
        if(Object.keys(report).length < 8) {
            return res.status(400).json({message:"Faltan campos en el reporte"});
        };
        const userExists = UserController.getUserById(report.owner_id);
        if (!userExists) {
            return res.status(400).json({message:"No existe un usuario con ese ID"});
        };
        const newReport = await ReportController.create(report);
        if(!newReport){
            return res.status(400).json({message:"Error al crear el reporte"});
        } else {
            res.status(201).json({newReport});
        }
    } catch (e) {
        console.log("Error in post /reports/create", e);
    }
});
//OBTENER TODOS LOS REPORTES
app.get("/reports", async (req, res) => {
    try{
        const allReports = await ReportController.getAllReports();
        res.status(200).json(allReports)
    } catch (e) {
        console.log("Error in post /reports", e);
    }
});
//ENCONTRAR MASCOTAS CERCA
app.get("/reports/find-near-pets", async (req, res) => {
    try{
        const {lat, lng} = req.query;
        const nearLostPets = await petIndex.search("", {
            aroundLatLng: [lat,lng].join(","),
            aroundRadius: 10000
        }) 
        if(nearLostPets.hits.length == 0) {
            res.status(404).json({message:"No hay mascotas cerca"});
        } else {
            res.status(200).json(nearLostPets.hits);
        }           
    } catch (e) {
        console.log("Error in post /reports/find-near-pets",e);
    }
});
//ENCONTRÉ UNA MASCOTA
app.post("/reports/found-a-pet", async (req, res) => {
    try{
        const seenData:SeenType = req.body;
        if(Object.keys(seenData).length < 4) {
            return res.status(400).json({message:"Faltan campos en la vista de encontrado"});
        } else {
            const foundAPet = await SeenController.create(seenData);
            res.status(201).json({foundAPet})
        }
    } catch (e) {
        console.log("Error in post /reports/found-a-pet", e);
    }
});
app.put("/mascota-encontrada-by-id", async (req, res) => {
	try{
        let reportToEditParams = req.body;
        reportToEditParams.lost = false
        if(Object.keys(reportToEditParams).length < 10) {
            return res.status(400).json({message:"Faltan campos en el reporte"});
        };
        const editedReport = await ReportController.editReport(reportToEditParams);
        res.json(editedReport);
    } catch (e) {
        console.log("Error in patch /reports/edit-report", e);
    }
});
app.get("/reports/:userId/:petId", Middlewares.verifyToken,async (req, res) => {
    const {userId} = req.params
	const { petId } = req.params
    try{
        if(petId){
            const rta = await ReportController.getReportToUpdate(userId,petId)
            return res.json(rta);
        }
    } catch (e){
        console.log("Error: ", e)
    }
	
});
//OBTENER MIS REPORTES
app.get("/reports/:userId", Middlewares.verifyToken, async (req, res) => {
    try{
        const {userId} = req.params;
        
        const myReports = await ReportController.getMyReports(parseInt(userId));
        res.status(200).json(myReports);
    } catch (e) {
        console.log("Error in post /reports/:userId", e);
    }
});
//EDITAR UN REPORTE
app.put("/reports/edit-report", Middlewares.verifyToken, async (req, res) => {
    try{
        let reportToEditParams = req.body;
        reportToEditParams.lost = true
        if(Object.keys(reportToEditParams).length < 10) {
            return res.status(400).json({message:"Faltan campos en el reporte"});
        };
        const editedReport = await ReportController.editReport(reportToEditParams);
        res.json(editedReport);
    } catch (e) {
        console.log("Error in patch /reports/edit-report", e);
    }
});
//ELIMINAR UN REPORTE
app.delete("/reports/delete", Middlewares.verifyToken,async (req, res) => {
    try{
        const {reportId} = req.body;
        if(!reportId) res.status(400).json({message: "Debes ingresar el ID del reporte que quiere eliminar"});
        const deletedReport = await ReportController.deleteReport(reportId);
        res.status(200).json({
            message: "El reporte fue eliminado",
            deletedReport
        });
    } catch (e) {
        console.log("Error in post /reports/delete", e);
    }
});
app.post("/enviar-email", Middlewares.verifyToken, async(req,res)=>{
	const {to, subject} = req.body
	const {nombreReportador, telefono, informacion} = req.body.textBody
	if(nombreReportador != "" && telefono !="" && informacion != ""){
		try {
			const data = await resend.emails.send({
				"from": "onboarding@resend.dev",    
				"to": to,
				"subject": subject,
				"html": `<p>Hola, soy ${nombreReportador}. Mi contacto es <strong>${telefono}</strong> y lo vi por ultima vez en: <strong>${informacion}</strong></p>`
			})
			res.status(200).json({ data });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
})


app.get("*", (req, res)=>{
    const file = path.resolve(__dirname, "../fe-src/index.html");
    res.sendFile(file);    
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});