// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import CitaList from './components/CitaList.jsx';
import CreateCita from './components/CreateCita.jsx';
import EditCita from './components/EditCita.jsx';
import Login from './components/Login';
import Register from './components/Register';


function App() {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/*<Route path="/register" element={<Register />} />*/}

                <Route element={<ProtectedRoutesWithNavbar />}>
                    <Route path="/" element={<CitaList />} />
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/create" element={<CreateCita />} />
                    <Route path="/edit/:id" element={<EditCita />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function ProtectedRoutes() {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function ProtectedRoutesWithNavbar() {
    const token = localStorage.getItem('token');
    return token ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" replace />
    );
}


export default App;
