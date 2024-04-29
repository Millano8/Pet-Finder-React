import React from "react"
import {Outlet} from "react-router-dom"
import { Header } from "../header";
import { useEmailUser } from "../../hooks/emailUser";
import css from "./layout.css"


function Layout(){
    const {eUser, setEmailUser} = useEmailUser()
    function logOut(){
        setEmailUser("")
    }
    return (
        <div>
            <Header logOut={logOut} emailUser={eUser}></Header>
            <div className = {css.main}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export {Layout}