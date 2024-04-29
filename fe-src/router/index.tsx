import React from "react"
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import {Instructions} from "../pages/instructions"
import {NearByLostPets} from "../pages/nearBy-Pets"
import {ProfilePage} from "../pages/profile"
import {CheckEmailPage} from "../pages/check-email"
import {RegisterPage} from "../pages/register"
import {LoginPage} from "../pages/login"
import {DatosPersonalesPage} from "../pages/datos-personales"
import {ModificarContrasenia} from "../pages/modificar-pass"
import {ReportarMascota} from "../pages/reportar-mascota"
import {MascotasReportadas} from "../pages/mascotas-reportadas"
import {EditarReporte} from "../pages/edit-pet-report"
import {Routes, Route } from "react-router-dom";

//ver mascotas-perdidas-cerca

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<HomePage />} />
                <Route path="/instructions" element={<Instructions/>}/>
                <Route path="/mascotas-perdidas-cerca" element={<NearByLostPets/>}/> 
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/check-email" element={<CheckEmailPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/datos-personales" element={<DatosPersonalesPage/>}/>
                <Route path="/modificar-pass" element={<ModificarContrasenia/>}/>
                <Route path="/reportar-mascota" element={<ReportarMascota/>}/>
                <Route path="/mascotas-reportadas" element={<MascotasReportadas/>}/>
                <Route path="/editar-mascota/:id" element={<EditarReporte></EditarReporte>} />
                <Route path="/login" element={<LoginPage/>}/>
            </Route>
        </Routes>
    )
}

export {AppRoutes}