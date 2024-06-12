// import  from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <img className="h-10 w-auto" src="/potter.png" alt="Logo" />
                            </Link>
                        </div>
                        <div className="hidden md:flex ml-10 space-x-4">
                            <Link
                                to="/"
                                className="text-gray-900 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                            >
                                CARTOONS-CARE
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-900 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-gray-900 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Registrarse
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-900 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        )}
                    </div>
                    <div className="md:hidden">
                        {/* Aquí puedes agregar un menú hamburguesa para móviles si lo deseas */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
