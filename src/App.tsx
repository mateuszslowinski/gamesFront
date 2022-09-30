import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Header} from './components/commons/Header/Header';
import {HomePage} from "./pages/Home/Home.page";
import {PublisherPage} from "./pages/Publisher/Publisher.page";
import {StudioPage} from "./pages/Studio/Studio.page";
import {Login} from "./components/Login/Login";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/publisher/:id' element={<PublisherPage/>}/>
                <Route path='/studio/:id' element={<StudioPage/>}/>
            </Routes>
        </>
    );
}

