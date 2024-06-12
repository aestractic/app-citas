import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-24">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-20 w-auto" src="/heaven.png" alt="Logo" to="/"/>
                        </div>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                {token && (
                                    <>
                                        <Link
                                            to="/"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            HEAVEN
                                        </Link>
                                    </>
                                )}
                                {!token && (
                                    <>
                                        <Link
                                            to="/login"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {token && (
                        <div className="hidden md:block ml-10">
                            <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Cerrar Sesión
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;