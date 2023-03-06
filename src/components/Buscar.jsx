import React, { useState } from "react";
import '../styles/buscar.css'

import buscar from '../assets/search.svg'

const Buscar=()=>{

    const [text,setText] = useState("")
    const [isOkey,setIsOkey] = useState(false)
    const [books,setBooks] = useState([])

    function reemplazar(texto){
        return texto.replace(/\s/g,'+')
    }

    async function buscar(){
        if(text){
            const word = reemplazar(text)
            const response = await fetch(`${import.meta.env.VITE_AUTHOR}${word}&api-key=${import.meta.env.VITE_API_KEY}`,{
                method:"GET"
            })

            if(response.ok){
                setIsOkey(true)
                const {results} = await response.json()
                setBooks(results)

            }else{
                setIsOkey(false)
                alert("Autor no encontrado");
            }
        }
    }

    return(
        <div className="buscador-container-b">
            <h2>Busque su libro por su autor favorito...</h2>
            <div className="entrada-content-b">
                <Entrada  change={ (e)=>{ setText(e.target.value) }  } eventClick={ buscar } />
            </div>
            <div className="container-b">
                { isOkey && <Autor autor={text} lista={ books } /> }
            </div>
        </div>
    )
}

const Entrada=({change,eventClick})=>{
    // <span className="buscar">Buscar</span>
    return  <label className="label" htmlFor="entrada"><input id="entrada" onChange={ change } type="text" className="entrada" placeholder="Buscar..." /><button className="btn-label" type="button">
                <img className="img-btn" src={ buscar } alt="" onClick={ eventClick } /></button>
            </label>
}

const Autor=({autor,lista})=>{
    return (
        <>
            <h3 className="nombre-b">{autor}</h3>
            <div className="list-container-b">
                {lista.map((v,index)=>(
                    <div className="card-b" key={index}>
                        <div className="card-titulo-b">
                            {v.book_title}
                        </div>
                        <div className="card-desc-b">
                            <p className="linea-b">{v.byline}</p>
                            <p className="fecha-b">{v.publication_dt}</p>
                            <div className="btn-content-b">
                                <a href={v.url} target="_blank"><button>Ir</button></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Buscar
