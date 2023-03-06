import React, { useEffect, useState } from "react";
import '../styles/inicio.css'
import lefticon from '../assets/left.svg'
import righticon from '../assets/right.svg'
import Section from "./Section";

const Inicio = ()=>{

    return (
            <div className="content-lsd">
                <h1>Ultimas Noticias</h1>
                <Top/>
                <h2 className="sections">Sections</h2>
                <Section/>
            </div>
    )
} 

const Top=()=>{

    const [resulTops,setResulTops]= useState([])

    const [current, setCurrent] = useState(0)

    const prev = () =>
    setCurrent((curr) => (curr === 0 ? 0 : curr - 1))
    
    const next = () =>
    setCurrent((curr) => (curr === resulTops.length - 1 ? 0 : curr + 1))

    useEffect(() => {
      cargarTop()
    }, [])
    

    const cargarTop= async()=>{
        const response = await fetch(import.meta.env.VITE_TOP+import.meta.env.VITE_API_KEY)
        if(response.ok){
            const res = await response.json()
            const {results} = res
            // console.log(results);
            setResulTops(results)
        }
    }

    return(
        <div className="slider-content" >
                {   resulTops.map((v,i)=>(
                        <div key={i} className="img-slide-content" style={{ transform: `translateX(-${current * 100}%)` }}>
                            <div className="slide-item">
                                <div className="img-container-item">
                                    <img className="img-slide-item" src={v.multimedia[0].url} alt="" />
                                    <h3 className="slider-titulo-item">{v.title}</h3>
                                </div>
                                <div className="slider-desc-item">
                                    <p className="abstract-item">{v.abstract}</p>
                                    <div className="slider-btn-content">
                                        <a className="slider-btn-content__a" target="_blank" href={v.url}><button className="slider-btn-content__btn"> <img className="slider-btn-content__img" src={righticon} alt="" /> </button></a>
                                    </div>
                                    <div className="slider-desc-data">
                                        <span>{v.byline} - </span>
                                        <span>{v.published_date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            <div className="btns">
                <button className="btn-left" onClick={ prev }> <img width="20px" src={lefticon} alt="" /></button>
                <button className="btn-rigth" onClick={ next }> <img width="20px" src={righticon} alt="" /> </button>
            </div>
        </div>
    )
}

export default Inicio

