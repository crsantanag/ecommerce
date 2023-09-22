import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './Catalogo.css'

export const CatalogoMostrar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {
  console.log ('CATALOGOMOSTRAR *** /// +++')

  const navigate   = useNavigate();
  const  { filtro }  = useParams();

  console.log ('CATALOGOMOSTRAR *** /// +++ ', filtro)

  const rutaActual = '/catalogomostrar/' + filtro
  sessionStorage.setItem('rutaActual', rutaActual);

  const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
  const [productosPorPagina, setProductosPorPagina] = useState (pp)

  const po =  sessionStorage.getItem('productosPorOrden');
  const [productosPorOrden, setProductosPorOrden] = useState (po)

  const pa = parseInt(sessionStorage.getItem('paginaActual'));
  const [paginaActual, setPaginaActual] = useState (pa)

  const [productosFiltro, setProductosFiltro] = useState  ([])
  const [productosDisplay, setProductosDisplay] = useState ([])
  const [totalPaginas, setTotalPaginas] = useState (0)
  const [totalProductos, setTotalProductos] = useState (0)
  const [paginas, setPaginas] = useState ([])


  const leerProductos = async () => {
    const urlProductos = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products'
    console.log ('CATALOGOLEER *** /// +++ ', filtro)
    try {
        const traeProductos = await axios.get ( urlProductos )

        const productosFiltroAux = traeProductos.data
        .filter ( (producto)  => ( producto.tipo == filtro || 
                              producto.grupo.toUpperCase().includes(filtro.toUpperCase()) || 
                              producto.nombre.toUpperCase().includes(filtro.toUpperCase()) 
                              ) )
        .map (( producto)     => ({
                              codigo: producto.codigo,
                              grupo: producto.grupo,
                              nombre: producto.nombre,
                              precio: producto.precio,
                              stock: producto.stock,
                              url: producto.url,
                              ventas: producto.ventas
          }))

          productosFiltroAux.sort((a, b) => a.codigo - (b.codigo))
          setProductosFiltro (productosFiltroAux)

          const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
          setProductosPorPagina (pp)
          const pa = parseInt(sessionStorage.getItem('paginaActual'));
          setPaginaActual (pa)

          window.scrollTo(0, 0);
      
          const tt = productosFiltroAux.length
          setTotalProductos (tt)
          // return si no hay productos
          const tp = Math.ceil ( (tt / pp))
          setTotalPaginas (tp)

          const paginasAux = []
          for (let  i = 0;
                    i < tp;
                    i++) { paginasAux.push((i * pp) + 1) }
          setPaginas (paginasAux)
          
          const productosMostrar = []
          for (let  i = paginasAux[pa-1];
                    i <  Math.min (paginasAux[pa-1]+pp , tt+1) ;
                    i++) { productosMostrar.push(productosFiltroAux[i-1]); }
          setProductosDisplay (productosMostrar)
      }
      catch (error) {
        console.log ('ERROR: CatálogoMostrar ==> ', error)
      }
  }

  useEffect (() => {
    leerProductos()
  },[filtro])

  const defineMostrar = () => {
    const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
    setProductosPorPagina (pp)
    const pa = parseInt(sessionStorage.getItem('paginaActual'));
    setPaginaActual (pa)
    const sp = parseInt(sessionStorage.getItem('scrollPosition'))
    window.scrollTo(0, sp);

    const tt = totalProductos
    const tp = Math.ceil ( (tt / pp))
    setTotalPaginas (tp)

    const paginasAux = []
    for (let  i = 0;
              i < tp;
              i++) { paginasAux.push((i * pp) + 1) }
    setPaginas (paginasAux)

    const productosMostrar = [] 
    for (let  i = paginasAux[pa-1];
              i <  Math.min (paginasAux[pa-1]+pp , tt+1) ;
              i++) { productosMostrar.push(productosFiltro[i-1]); }
    setProductosDisplay (productosMostrar)
  }

  useEffect ( ()=> {
    defineMostrar();
    },
    [filtro, paginaActual, productosPorPagina, productosPorOrden]
  )

  const flechaIzquierda = () => {
    if (paginaActual == 1) return

    const pa = paginaActual - 1
    const pp = productosPorPagina
    const tt = totalProductos
    sessionStorage.setItem('paginaActual', pa);
    setPaginaActual (pa)

    const productosMostrar = []
    for (let  i = paginas[pa-1];
              i < Math.min (paginas[pa-1]+pp , tt+1) ;
              i++) {
      productosMostrar.push(productosFiltro[i-1]);
    }
    setProductosDisplay (productosMostrar)
  }

  const flechaDerecha = () => {
    if (paginaActual == totalPaginas ) return

    const pa = paginaActual + 1
    const pp = productosPorPagina
    const tp = totalProductos
    sessionStorage.setItem('paginaActual', pa);
    setPaginaActual (pa)

    const productosMostrar = []
    const paginasAux = [...paginas]
    for (let  i = paginasAux[pa-1];
              i < Math.min (paginasAux[pa-1]+pp , tp+1);
              i++) {
      productosMostrar.push(productosFiltro[i-1])
    }
    setProductosDisplay (productosMostrar)
  }

  const handleSeleccionPagina = (event) => {
    const pp = Math.trunc (parseInt(event.target.value,10))
    setProductosPorPagina (pp)
    const pa = Math.trunc (paginas[paginaActual-1] / pp) + 1
    setPaginaActual (pa)
    sessionStorage.setItem('productosPorPagina', pp)
    sessionStorage.setItem('paginaActual', pa)
    const tt = totalProductos
    const tp = Math.ceil ( (tt / pp))
    setTotalPaginas (tp)
  }

  const handleSeleccionOrdenar = (event) => {
    const po = event.target.value
    setProductosPorOrden(po)
    sessionStorage.setItem('productosPorOrden', po)
    const pa = 1
    sessionStorage.setItem('paginaActual', pa);
    setPaginaActual (pa)

    switch (po) {
      case "N-":
        productosFiltro.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "N+":
        productosFiltro.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case "P-":
        productosFiltro.sort((a, b) => a.precio - (b.precio));
        break;
      case "P+":
        productosFiltro.sort((a, b) => b.precio - (a.precio));
        break;
      default:
        productosFiltro.sort((a, b) => a.codigo - (b.codigo))
        break;
    }
  }

  const handleProductCD = (event, index, stock) => {
    event.preventDefault();
    if (stock == 0) {
      alert ('El producto seleccionado no tiene stock')
      return
    }
    
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    sessionStorage.setItem('productosPorPagina', productosPorPagina);
    sessionStorage.setItem('paginaActual', paginaActual);

    navigate(`/catalogocomprar/${index}`);
  }

  const agregarCarro = (event, codigo) => {
    event.preventDefault()

    const cantidad = 1
    let totalArticulos = 0

    if (sessionStorage.getItem('carroCompras') == null) 
    {
      const carroCompras = [{codigo, cantidad}];
      sessionStorage.setItem('carroCompras', JSON.stringify(carroCompras));
      totalArticulos = cantidad
    } 
    else
    {
      const carroCompras = JSON.parse(sessionStorage.getItem('carroCompras'));
      for (let i = 0; i < carroCompras.length; i++) {
          console.log ("Sumando ", i, carroCompras[i].cantidad )
          totalArticulos += carroCompras[i].cantidad;
      }
    totalArticulos = totalArticulos + cantidad
    carroCompras.push({codigo, cantidad});
    sessionStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }

    updateCartState (true)
    updateUserCart  (totalArticulos)

    navigate(`/vercarro/`);
  }

  return (
    <div className='catalogo'>
      <br />
      <h2>Catálogo: {filtro}</h2>

      <form>
        <div>
          Mostrando productos {paginas[paginaActual-1]} al {Math.min (paginas[paginaActual-1]+productosPorPagina-1, totalProductos)} de 
          un total de {totalProductos} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label  className='reserva_hora' 
                  htmlFor="horas">Productos por página :&nbsp;&nbsp;
          </label>
          <select id="display" 
                  value={ productosPorPagina } 
                  onChange={ handleSeleccionPagina }>
                  <option value="4">-- Seleccionar --</option>
                  <option value="4"> 4 x página</option>
                  <option value="8"> 8 x página</option>
                  <option value="16">16 x página</option>
                  <option value="32">32 x página</option>
                  <option value="64">64 x página</option>
          </select>
          <label  className='reserva_hora'
                  htmlFor="horas">&nbsp;&nbsp;Ordenar por :&nbsp;&nbsp;
          </label>
          <select id="orden"
                  value={ productosPorOrden } 
                  onChange={ handleSeleccionOrdenar }>
                  <option value="">-- Seleccionar --</option>
                  <option value="N-">Nombre A-Z</option>
                  <option value="N+">Nombre Z-A</option>
                  <option value="P-">Precio menor</option>
                  <option value="P+">Precio mayor</option>
          </select>
        </div>
      </form>

      <br/>
      <div className="catalogo_contenedor">

        {productosDisplay.map ((celda, index) => (
        <div className="catalogo_grid" style={{backgroundColor: "white"}} key={index}>
        
          <img 
            src={celda.url} 
            onClick={(event) => handleProductCD (event, celda.codigo, celda.stock)}
            style={{ cursor: 'pointer' }}
            data-id={index}>
          </img>
          {celda.nombre} <br/>
          {celda.grupo}  <br/>
          ${celda.precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} - Stock {celda.stock} unidad(es)
          <br/>
          <div style={{paddingTop:"15px"}}></div>
          <button className='compraCD_boton_comprar'
                  type="submit"
                  /*onClick={() => window.history.back()}>*/
                  onClick= { (event) => agregarCarro (event, celda.codigo) }>Agregar al carro</button>
        
        </div>
        ))}
      </div>
      
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='catalogo_paginas'>
        <button className= 'compraCD_boton_restasuma' onClick={ flechaIzquierda }> - </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mostrando  página {paginaActual} de {totalPaginas}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className= 'compraCD_boton_restasuma' onClick={ flechaDerecha }> + </button> <br/> <br/>
      </div>
      </div>

      <br />
    </div>
  )
}
