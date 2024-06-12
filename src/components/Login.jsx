import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/v1/login`, { email, password });
            localStorage.setItem('token', response.data.data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login_container overflow-hidden">
            <div className="login_form_container">
                <div className="left">
                    <img className="logo" src="/heaven.png" alt="Logo"/>
                    <h1 className="text-4xl text-[#E9D3A3] mt-0 mb-5 font-bold">Iniciar Sesión</h1>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="input_container">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="input"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="button_container flex justify-center items-center space-x-4">
                            <button type="submit" className="green_btn">
                                Iniciar Sesión
                            </button>
                            <Link to="/register" className="white_btn flex items-center justify-center">
                                Registrarse
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;