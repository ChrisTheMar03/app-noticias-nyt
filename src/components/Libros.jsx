import React, { useEffect, useState } from 'react'

import '../styles/libro.css'

function Libros() {

  const [books, setBooks] = useState([])
  const [visible,setVisible] = useState(false)

  useEffect(() => {
    cargarLibros()
  }, [])

   const cargarLibros= async ()=>{
    const response = await fetch("https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key="+import.meta.env.VITE_API_KEY,{
      method:"GET"
    })
    if(response.ok){
      const res = await response.json()
      const resultado = res.results
      setBooks(resultado.lists)
      console.log(books);
    }
    
  }

  const cortador=(texto,longitud)=>{
    return texto.length>longitud ? texto.substring(0,longitud)+"..." : texto
  }

  const mostrarLinks=()=>{
    setVisible(!visible)
  }

  if(books.length < 0){
    return <div>Cargando libros</div>
  }

  return (
    <div className='libros-container'>
      {books.map((v,index)=>(
        <div key={index}>
          <h2 className='genero'>{v.display_name}</h2>
          <div className='card-container'>
          {v.books.map((value,ind)=>(
              <div key={ ind } className='card'>
                <div className='card-img'>
                  <img className='img' src={value.book_image} alt="" />
                </div>
                <h3 className='titulo'>{value.title}</h3>
                <div className='card-body'>
                  <div className="descripcion">{cortador(value.description,100)}</div>
                  <div className="fecha">{value.updated_date}</div>
                  <div className='amazon'>
                    <a href={value.amazon_product_url} target='_blank' ><button className='button-amazon'>Amazon</button></a>
                  </div>
                  <span className='mostrar' onClick={ mostrarLinks }>...</span>
                  { visible && <Compras links={value} estado={ visible } />  }
                </div>

              </div>
          ))}
          </div>
        </div>
      ))} 
    </div>
  )
}

const Compras =({links,estado})=>{
  if(estado){
    return(
      <div className='compras'>
        { 
          links.buy_links.map((data,i)=>(
          <a key={i} href={data.url} target='_blank'><button>{data.name}</button></a>
        ))
      }
    </div>
    ) 
  }
}

export default Libros       