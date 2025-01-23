import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [año, setAño] = useState("");

  const add = () => {
    // Validación previa
    if (!nombre || !edad || !pais || !cargo || !año) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: parseInt(edad, 10),
      pais: pais,
      cargo: cargo,
      año: parseInt(año, 10),
    })
      .then(() => {
        alert("Empleado registrado con éxito.");
      })
      .catch((error) => {
        console.error("Error al registrar el empleado:", error);
        alert("Hubo un problema al registrar el empleado.");
      });
  };

  return (
    <div className="App">
      <div className="datos">
        <label>
          Nombre:{" "}
          <input
            onChange={(event) => {
              setNombre(event.target.value);
            }}
            type="text"
          />
        </label>
        <br />
        <label>
          Edad:{" "}
          <input
            onChange={(event) => {
              setEdad(event.target.value);
            }}
            type="number"
          />
        </label>
        <br />
        <label>
          País:{" "}
          <input
            onChange={(event) => {
              setPais(event.target.value);
            }}
            type="text"
          />
        </label>
        <br />
        <label>
          Cargo:{" "}
          <input
            onChange={(event) => {
              setCargo(event.target.value);
            }}
            type="text"
          />
        </label>
        <br />
        <label>
          Años:{" "}
          <input
            onChange={(event) => {
              setAño(event.target.value);
            }}
            type="number"
          />
        </label>
        <br />
        <button onClick={add}>Guardar Datos</button>
      </div>
    </div>
  );
}

export default App;
