import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACK_URL}/api/v1/user`, { name, email, password });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login_container">
            <div className="login_form_container">
                <div className="left">
                    <img className="logo" src="/heaven.png" alt="Logo" />
                    <h1 className="text-4xl text-[#E9D3A3] mt-0 mb-5 font-bold">Registrarse</h1>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="input_container">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="input"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

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
                        </div>
                        <div className="button_container">
                            <button type="submit" className="green_btn mx-auto">
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;