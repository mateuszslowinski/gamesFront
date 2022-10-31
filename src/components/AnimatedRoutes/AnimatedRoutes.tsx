import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {HomePage} from "../../pages/Home/Home.page";
import {Login} from "../Login/Login";
import {PublisherPage} from "../../pages/Publisher/Publisher.page";
import {StudioPage} from "../../pages/Studio/Studio.page";
import {GamePage} from "../../pages/Game/Game.page";
import {PlatformPage} from "../../pages/Platform/Platform.page";
import {AdminPage} from "../../pages/AdminPage/AdminPage";
import {ProtectedRoutes} from "../../utils/ProtectedRoutes";

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={location.pathname}>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/admin' element={<AdminPage/>}/>
                </Route>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/publisher/:name' element={<PublisherPage/>}/>
                <Route path='/studio/:name' element={<StudioPage/>}/>
                <Route path='/game/:name' element={<GamePage/>}/>
                <Route path='/platform' element={<PlatformPage/>}/>
            </Routes>
        </AnimatePresence>
    )
}