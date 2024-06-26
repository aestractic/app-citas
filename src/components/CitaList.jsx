import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CitaList = () => {
    const [citas, setCitas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/v1/cita`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCitas(response.data.data);
        } catch (error) {
            console.error('Error fetching citas:', error);
        }
    };

    const deleteCita = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACK_URL}/api/v1/cita/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCitas();
        } catch (error) {
            console.error('Error deleting cita:', error);
        }
    };

    const filteredCitas = citas.filter(cita => cita.mascota.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Lista de Citas</h1>
                    <Link to="/create" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-500">
                        Agregar Cita
                    </Link>
                </div>


                <input
                    type="text"
                    placeholder="Introduce el nombre de la mascota..."
                    className="w-full bg-gray-800 text-white p-2 rounded mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCitas.map((cita) => (
                        <div key={cita._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                            {cita.imagen && (
                                <img
                                    src={`${import.meta.env.VITE_BACK_URL}${cita.imagen}`}
                                    alt={`Imagen de ${cita.mascota}`}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-white mb-2">{cita.mascota}</h2>
                                <p className="text-gray-300 text-sm mb-2">Propietario: {cita.propietario}</p>
                                <p className="text-gray-300 text-sm mb-2">Tipo: {cita.raza}</p>
                                <p className="text-gray-300 text-sm mb-2">Fecha: {new Date(cita.date).toLocaleDateString()}</p>
                                <p className="text-gray-300 text-sm mb-2">Estado: {cita.estado}</p>
                                <p className="text-gray-300 text-sm mb-2">Costo: ${cita.costo}</p>
                                <p className="text-gray-300 text-sm mb-4">Notas: {cita.notas}</p>
                                <div className="flex justify-end">
                                    <Link to={`/edit/${cita._id}`}
                                          className="text-indigo-400 hover:text-indigo-600 mr-4">Editar</Link>
                                    <button onClick={() => deleteCita(cita._id)}
                                            className="text-red-400 hover:text-red-600">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitaList;
