import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Header } from './components/commons/Header/Header';
import {HomePage} from "./pages/Home/Home.page";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
            </Routes>
        </>
    );
}

