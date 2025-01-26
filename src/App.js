import React, { useState, useEffect } from "react";
import Axios from "axios";
import './App.css';
import Modal from "./Modal"; 

function App() {
    const [empleados, setEmpleados] = useState([]);
    const [editEmpleado, setEditEmpleado] = useState(null);
    const [viewEmpleado, setViewEmpleado] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        pais: "",
        cargo: "",
        año: "",
    });

    // Obtener todos los empleados
    const fetchEmpleados = async () => {
        try {
            const response = await Axios.get("http://localhost:3001/empleados");
            setEmpleados(response.data);
        } catch (error) {
            console.error("Error al obtener los empleados:", error);
        }
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editEmpleado) {
                // Actualizar
                await Axios.put(`http://localhost:3001/empleados/${editEmpleado.id}`, formData);
                alert("Empleado actualizado con éxito.");
            } else {
                // Registrar 
                await Axios.post("http://localhost:3001/create", formData);
                alert("Empleado registrado con éxito.");
            }
            // Limpiar formulario y recargar lista
            setFormData({ nombre: "", edad: "", pais: "", cargo: "", año: "" });
            setEditEmpleado(null);
            setIsModalOpen(false);
            fetchEmpleados();
        } catch (error) {
            console.error("Error al guardar el empleado:", error);
        }
    };

    const handleEdit = (empleado) => {
        setEditEmpleado(empleado);
        setFormData({
            nombre: empleado.nombre,
            edad: empleado.edad,
            pais: empleado.pais,
            cargo: empleado.cargo,
            año: empleado.año,
        });
        setIsModalOpen(true);
    };

    const handleView = (empleado) => {
        setViewEmpleado(empleado);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditEmpleado(null);
        setViewEmpleado(null);
    };

    return (
        <div className="container">
            <h1>Registro de Empleados</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="edad"
                    placeholder="Edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="pais"
                    placeholder="País"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="cargo"
                    placeholder="Cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="año"
                    placeholder="Años"
                    value={formData.año}
                    onChange={handleChange}
                    required
                />
                <button type="submit">
                    {editEmpleado ? "Actualizar" : "Registrar"}
                </button>
            </form>

            <h2>Lista de Empleados</h2>
            <ul>
                {empleados.map((empleado) => (
                    <li key={empleado.id}>
                        <span>{empleado.nombre} - {empleado.cargo}</span>
                        <div>
                            <button onClick={() => handleView(empleado)}>Ver detalles</button>
                            <button onClick={() => handleEdit(empleado)}>Editar</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal para editar y ver detalles */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                {viewEmpleado ? (
                    <div>
                        <h2>Detalles del Empleado</h2>
                        <p><strong>Nombre:</strong> {viewEmpleado.nombre}</p>
                        <p><strong>Edad:</strong> {viewEmpleado.edad}</p>
                        <p><strong>País:</strong> {viewEmpleado.pais}</p>
                        <p><strong>Cargo:</strong> {viewEmpleado.cargo}</p>
                        <p><strong>Años:</strong> {viewEmpleado.año}</p>
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2>Editar Empleado</h2>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="edad"
                            placeholder="Edad"
                            value={formData.edad}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="pais"
                            placeholder="País"
                            value={formData.pais}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="cargo"
                            placeholder="Cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="año"
                            placeholder="Años"
                            value={formData.año}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Actualizar</button>
                        <button type="button" onClick={closeModal}>Cancelar</button>
                    </form>
                )}
            </Modal>
        </div>
    );
}

export default App;