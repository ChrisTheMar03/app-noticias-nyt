
import React from "react";
import '../styles/navegacion.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Inicio from "./Inicio.jsx";
import Libros from "./Libros";
import Buscar from "./Buscar";

const Navegacion=()=>{
    return (
        <BrowserRouter>
            <ul className="header-list">
                <li className="header-item"><Link to="/">Inicio</Link></li>
                <li className="header-item"><Link to="/buscar">Buscar</Link></li>
                <li className="header-item"><Link to="/libros">Libros</Link></li>
            </ul>
            <div className="container-element">
                <Routes>
                    <Route path='/' exact element={ <Inicio/> } />
                    <Route path="/buscar" element={ <Buscar/> } />
                    <Route path="/Libros" element={ <Libros/> } />
                </Routes>
            </div>
        </BrowserRouter>
        )
}

export default Navegacion
