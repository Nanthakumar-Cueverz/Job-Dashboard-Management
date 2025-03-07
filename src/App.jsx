import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import './index.css';
function App() {
    return (
        <>
            <Toaster position='top-center' />
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </>
    );
}

export default App;
