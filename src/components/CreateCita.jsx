import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCita = () => {
    const token = localStorage.getItem('token');
    const [cita, setCita] = useState({
        name: '',
        date: '',
        imagen: null,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCita({ ...cita, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCita({ ...cita, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('name', cita.name);
            formData.append('date', cita.date);
            formData.append('imagen', cita.imagen);

            if (!token) {
                throw new Error('No token found. Please log in.');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/api/v1/cita`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (response.data.status) {
                navigate('/');
            } else {
                setErrorMessage(response.data.errors[0]);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Server Error:', error.response?.data || error.message);
                setErrorMessage(error.response?.data?.errors[0] || 'An error occurred on the server.');
            } else if (error instanceof Error) {
                console.error('Client Error:', error.message);
                setErrorMessage(error.message);
            } else {
                console.error('Unexpected Error:', error);
                setErrorMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto my-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Crear Cita</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={cita.name}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-gray-700">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={cita.date}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="imagen" className="block text-gray-700">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {cita.imagen && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={URL.createObjectURL(cita.imagen)}
                                alt={cita.name}
                                className="h-auto max-h-24 w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crear Cita
                    </button>
                </div>
                <div className="text-red-500">{errorMessage}</div>
            </form>
        </div>
    );
};

export default CreateCita;
