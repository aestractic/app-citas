import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCita = () => {
    const [cita, setCita] = useState({
        name: '',
        date: '',
        imagen: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCita = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/v1/cita/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Format the date correctly
                const fetchedCita = response.data.data;
                const dateObj = new Date(fetchedCita.date);
                const formattedDate = dateObj.toISOString().split('T')[0]; 

                setCita({ ...fetchedCita, date: formattedDate });

            } catch (error) {
                setError(error.message || 'Error fetching cita');
            }
        };
        fetchCita();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cita.name || !cita.date) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', cita.name);
            formData.append('date', cita.date);
            if (cita.imagen) {
                formData.append('imagen', cita.imagen);
            }

            await axios.put(`${import.meta.env.VITE_BACK_URL}/api/v1/cita/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Error updating cita');
        }
    };

    const handleChange = (e) => {
        setCita({ ...cita, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCita({ ...cita, imagen: e.target.files[0] });
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Editar Cita</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input for name */}
                <div>
                    <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={cita.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* Input for date */}
                <div>
                    <label htmlFor="date" className="block text-gray-700">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={cita.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* Input for imagen (similar to your previous examples) */}
                <div>
                    <label htmlFor="imagen" className="block text-gray-700">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {cita.imagen && (
                        <div className="mt-2">
                            <img
                                src={`${import.meta.env.VITE_BACK_URL}${cita.imagen}`}
                                alt={cita.name}
                                className="h-auto max-h-24 w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Actualizar Cita
                </button>
            </form>
        </div>
    );
};

export default EditCita;
