import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CitaList = () => { // Component name changed to CitaList
    const [citas, setCitas] = useState([]); // Use citas instead of products
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

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Lista de Citas</h1>
                    <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700">
                        Agregar Cita
                    </Link>
                </div>

                {/* Table to display citas */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {/* ... table headers for name, date, image, and actions ... */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Imagen
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {citas.map((cita) => (
                        <tr key={cita._id}>
                            {/* ... table cells for name, date, image, and edit/delete buttons ... */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {cita.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cita.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap image-cell">
                                <img
                                    src={`${import.meta.env.VITE_BACK_URL}${cita.imagen}`}
                                    alt={cita.name}
                                    className="h-auto max-h-24 w-full object-contain"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`/edit/${cita._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</Link>
                                <button onClick={() => deleteCita(cita._id)} className="text-red-600 hover:text-red-900">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CitaList;
