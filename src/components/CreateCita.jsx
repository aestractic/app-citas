import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCita = () => {
    const [cita, setCita] = useState({
        propietario: '',
        mascota: '',
        raza: '',
        date: '',
        notas: '',
        estado: 'programada',
        costo: '',
        imagen: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cita.propietario || !cita.mascota || !cita.date) {
            setError('Por favor, llena los campos obligatorios (Propietario, Mascota y Fecha).');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const costoToSend = cita.costo === '' ? 0 : cita.costo;

            const formData = new FormData();
            formData.append('propietario', cita.propietario);
            formData.append('mascota', cita.mascota);
            formData.append('raza', cita.raza);
            formData.append('date', cita.date);
            formData.append('notas', cita.notas);
            formData.append('estado', cita.estado);
            formData.append('costo', costoToSend);
            if (cita.imagen) {
                formData.append('imagen', cita.imagen);
            }

            await axios.post(`${import.meta.env.VITE_BACK_URL}/api/v1/cita`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Error al crear la cita');
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            const numericValue = value === '' ? '' : parseFloat(value);
            setCita(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setCita(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setCita({ ...cita, imagen: e.target.files[0] });
    };

    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-white mb-6">Crear Cita</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="propietario" className="block text-sm font-medium text-white">
                            Nombre del Propietario
                        </label>
                        <input
                            type="text"
                            id="propietario"
                            name="propietario"
                            value={cita.propietario}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="mascota" className="block text-sm font-medium text-white">
                            Nombre de la Mascota
                        </label>
                        <input
                            type="text"
                            id="mascota"
                            name="mascota"
                            value={cita.mascota}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="raza" className="block text-sm font-medium text-white">
                            Tipo
                        </label>
                        <input
                            type="text"
                            id="raza"
                            name="raza"
                            value={cita.raza}
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
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="estado" className="block text-sm font-medium text-white">
                            Estado
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            value={cita.estado}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="programada">Programada</option>
                            <option value="completada">Completada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="costo" className="block text-sm font-medium text-white">
                            Costo
                        </label>
                        <input
                            type="number"
                            id="costo"
                            name="costo"
                            value={cita.costo}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div>
                        <label htmlFor="notas" className="block text-sm font-medium text-white">
                            Notas
                        </label>
                        <textarea
                            id="notas"
                            name="notas"
                            value={cita.notas}
                            onChange={handleChange}
                            rows="3"
                            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="imagen" className="block text-sm font-medium text-white">
                            Imagen
                        </label>
                        <input
                            type="file"
                            id="imagen"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-white"
                        />
                        {cita.imagen && (
                            <div className="mt-2">
                                <img src={URL.createObjectURL(cita.imagen)} alt="Vista previa"
                                     className="h-auto max-h-24 w-full object-contain"/>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button type="button" onClick={() => navigate('/')}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md py-2 px-4 mr-2">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default CreateCita;