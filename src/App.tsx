import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from './components/commons/Header/Header';
import {HomePage} from "./pages/Home/Home.page";
import {PublisherPage} from "./pages/Publisher/Publisher.page";
import {StudioPage} from "./pages/Studio/Studio.page";
import {Login} from "./components/Login/Login";
import {ProtectedRoutes} from "./utils/ProtectedRoutes";
import {AdminPage} from "./pages/AdminPage/AdminPage";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path='/admin' element={<AdminPage/>}/>
                </Route>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/publisher/:id' element={<PublisherPage/>}/>
                <Route path='/studio/:id' element={<StudioPage/>}/>
            </Routes>
        </>
    );
}

