import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';

const PublicRouter = () => (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>}/>   
        </Routes>      
    </div>
);

export default PublicRouter;