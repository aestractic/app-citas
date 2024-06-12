import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCita = () => {
    const [cita, setCita] = useState({
        name: '',
        date: '',
        description: '',
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
                    headers: { Authorization: `Bearer ${token}` },
                });

                const fetchedCita = response.data.data;
                const dateObj = new Date(fetchedCita.date);
                const formattedDate = dateObj.toISOString().split('T')[0];

                setCita({ ...fetchedCita, date: formattedDate });
            } catch (error) {
                setError(error.message || 'Error al obtener la cita');
            }
        };
        fetchCita();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cita.name || !cita.date) {
            setError('Por favor, llena todos los campos.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', cita.name);
            formData.append('date', cita.date);
            // formData.append('description', cita.description);
            if (cita.imagen) {
                formData.append('imagen', cita.imagen);
            }

            await axios.put(`${import.meta.env.VITE_BACK_URL}/api/v1/cita/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Error al actualizar la cita');
        }
    };

    const handleChange = (e) => {
        setCita({ ...cita, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCita({ ...cita, imagen: e.target.files[0] });
    };

    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white mb-6">Editar Cita</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={cita.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-white">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={cita.date}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-white">
                            Imagen
                        </label>
                        <input
                            type="file"
                            id="imagen"
                            onChange={handleFileChange}
                            className="mt-1 block w-full"
                        />
                        {cita.imagen && (
                            <div className="mt-2">
                                <img src={`${import.meta.env.VITE_BACK_URL}${cita.imagen}`} alt={cita.name} className="h-auto max-h-24 w-full object-contain" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button type="button" onClick={() => navigate('/')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md py-2 px-4 mr-2">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCita;
