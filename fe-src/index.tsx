import React, {Suspense} from "react"
import {RecoilRoot} from "recoil"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./router"

ReactDOM.render(
    <Suspense fallback={null}>
        <RecoilRoot>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </RecoilRoot>
    </Suspense>, 
    document.getElementById("hello-example"))