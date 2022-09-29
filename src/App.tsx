import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Header } from './components/commons/Header/Header';
import {HomePage} from "./pages/Home/Home.page";
import {PublisherPage} from "./pages/Publisher/Publisher.page";

export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/publisher/:id' element={<PublisherPage/>}/>
            </Routes>
        </>
    );
}

