import React, { Suspense, lazy, useEffect, useState } from "react";
import { sections } from "../data/sections.js";
import "../styles/section.css";
import lefticon from "../assets/left.svg";
import righticon from "../assets/right.svg";

const secciones = lazy(() => import("../data/sections.js"));

const Section = () => {
  return (
    <div>
      <Suspense fallback={<h3>Cargando...</h3>}>
        <ListSection listSectiones={sections} />
      </Suspense>
    </div>
  );
};

const ListSection = ({ listSectiones }) => {
  return (
    <div>
      {listSectiones.map((section, index) => (
        <div key={index}>
          <SectionItemList nombreSection={section.data} />
        </div>
      ))}
    </div>
  );
};

const SectionItemList = ({ nombreSection }) => {
  const [isOkey, setIsOkey] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    obtenerSeccion();
  }, []);

  const obtenerSeccion = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SECTION}${nombreSection}.json?api-key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    if (response.ok && response.status != 429) {
        try {
            const res = await response.json();
            const { results } = res;
            console.log(results);
            setList(results);
            setIsOkey(true);   
        } catch (error) {
            console.log("errordata"+error);
            setIsOkey(false)
        }
    }
  };

    if (!isOkey) {
      return <div>Cargando...</div>;
    }

  return (
    <div>
      {isOkey && <SectionItem nombreSection={nombreSection} listItem={list} />}
    </div>
  );
};

const SectionItem = ({ nombreSection, listItem }) => {

    const [current, setCurrent] = useState(0)

    const prev = () =>
    setCurrent((curr) => (curr === 0 ? 0 : curr - 1))
    
    const next = () =>
    setCurrent((curr) => (curr === listItem.length - 1 ? 0 : curr + 1))

  return (
    <div className="section">
      <h2 className="section-title">{nombreSection}</h2>
      <div className="section-container">
        <div className="section-content">
          {listItem.map((valor, index) => (
            <div key={index} className="section-card" style={{ transform: `translateX(-${current * 100}%)` }}>
              <SectionCardItem valor={valor} />
            </div>
          ))}
        </div>
        <button className="section-btn-back" 
          onClick={ prev }>
          <img src={lefticon} alt="" />
        </button>
        <button className="section-btn-next"
          onClick={ next }>
          <img src={righticon} alt="" />
        </button>
      </div>
    </div>
  );
};

const SectionCardItem = ({ valor }) => {
  return (
    <div className="section-item">
      <div className="section-item-img">
        <img src={valor.multimedia[0].url} alt="" />
      </div>
      <div className="section-item-desc">
        <p className="section-item-title">{valor.title}</p>
        <div className="section-item-desc-content">
          <p className="section-item-asbtract">{valor.abstract}</p>
        </div>
        <div className="section-item-content-btn">
          <a href={valor.url} target="_blank">
            <button>Ver</button>
          </a>
        </div>
        <span className="section-item-by-time">
          {valor.byline} - {valor.published_date}
        </span>
      </div>
    </div>
  );
};

export default Section;
