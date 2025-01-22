import logo from './logo.svg';
import './App.css';
import {useState} from "react" 

function App() {
  const [nombre,setNombre] = useState("")
  const [edad,setEdad] = useState("")
  const [pais,setPais] = useState("")
  const [cargo,setCargo] = useState("")
  const [años,setAños] = useState("")
  
  return (
    <div className="App">
      <div className= "datos">
        <label> Nombre: <input
        onChange={event=>{
          setNombre(event.target.value)
        }}
        type="text" ></input></label> <br/>
        <label> Edad: <input
        onChange={event=>{
          setEdad(event.target.value)
        }} 
        type="text" ></input></label><br/>
        <label> Pais: <input 
        onChange={event=>{
          setPais(event.target.value)
        }}
        type="text" ></input></label><br/>
        <label> Cargo: <input 
        onChange={event=>{
          setCargo(event.target.value)
        }}
        type="text" ></input></label><br/>
        <label> Años: <input 
        onChange={event=>{
          setAños(event.target.value)
        }}
        type="number" ></input></label><br/>
        <button>Guardar Datos</button> 
        </div> 
    </div>
  );
}

export default App;
