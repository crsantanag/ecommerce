import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import { AnulaReservas } from './AnulaReservas';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import './CatalogoMostrar.css'

export const CatalogoMostrar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {
  console.log ('CATALOGO_MOSTRAR')

  const navigate   = useNavigate();
  const  { filtro }  = useParams();

  const rutaActual = '/catalogomostrar/' + filtro
  sessionStorage.setItem('rutaActual', rutaActual);

  const rutaCatalogo = '/catalogomostrar/' + filtro
  sessionStorage.setItem('rutaCatalogo', rutaCatalogo);

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

  const [state, dispatch] = useContext (ProductContext)
  const [productos, setProductos] = useState([])
  const [estatusProductos, setEstatusProductos] = useState (false)

  AnulaReservas()
  
  const getAllProducts = async () => {
    const { data } = await axios.get ("https://backend-proyecto-5-53yd.onrender.com/api/v1/products")
    dispatch ({ type: 'OBTENER_PRODUCTO', payload: data })
    console.log ('CATALOGO_COMPRAR - dispatch', data)
    setProductos(data)
  }

  const filtrarProductos = () => {
    const productosFiltroAux = productos
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

      const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
      setProductosPorPagina (pp)
      const po = sessionStorage.getItem('productosPorOrden')
      setProductosPorOrden(po)

      switch (po) {
        case "D":
          productosFiltroAux.sort((a, b) => a.codigo - (b.codigo))
          break;
        case "N-":
          productosFiltroAux.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        case "N+":
          productosFiltroAux.sort((a, b) => b.nombre.localeCompare(a.nombre));
          break;
        case "P-":
          productosFiltroAux.sort((a, b) => a.precio - (b.precio));
          break;
        case "P+":
          productosFiltroAux.sort((a, b) => b.precio - (a.precio));
          break;
        case "V-":
          productosFiltroAux.sort((a, b) => a.ventas - (b.ventas));
          break;
        case "V+":
          productosFiltroAux.sort((a, b) => b.ventas - (a.ventas));
          break;
        default:
          productosFiltroAux.sort((a, b) => a.codigo - (b.codigo))
          break;
      }

      setProductosFiltro (productosFiltroAux)

      const pa = parseInt(sessionStorage.getItem('paginaActual'));
      setPaginaActual (pa)

      // window.scrollTo(0, 0)
      
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

  useEffect (() => {
    if (state.product.length === 0) {
      if (localStorage.getItem('token') !== null) {
        const tokenString = localStorage.getItem('token')
        const decoded = jwt_decode (tokenString)
        updateUserName  (decoded.data.nombre)
        updateNameState (true)
      }
      getAllProducts()
      setEstatusProductos (productos.length !== 0)
    }
    else {
      setProductos (state.product)
      setEstatusProductos (productos.length !== 0)
    }
    filtrarProductos()
    },[filtro, state, productos])


  const defineMostrar = () => {
    const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
    setProductosPorPagina (pp)
    const pa = parseInt(sessionStorage.getItem('paginaActual'));
    setPaginaActual (pa)
    // window.scrollTo(0, 0);

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

  const flechaIzquierda = () => {
    let pa = paginaActual
    if (pa == 1 ) {
      pa = totalPaginas
    } else {
      pa = pa - 1
    }
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
    // window.scrollTo(0, 0);
  }

  const flechaDerecha = () => {
    let pa = paginaActual
    if (pa == totalPaginas ) {
      pa = 1
    } else {
      pa = pa + 1
    }
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
    // window.scrollTo(0, 0);
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
    defineMostrar()
  }

  const handleSeleccionOrdenar = (event) => {
    const po = event.target.value
    setProductosPorOrden(po)
    sessionStorage.setItem('productosPorOrden', po)
    const pa = 1
    sessionStorage.setItem('paginaActual', pa);
    setPaginaActual (pa)

    switch (po) {
      case "D":
        productosFiltro.sort((a, b) => a.codigo - (b.codigo))
        break;
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
      case "V-":
        productosFiltro.sort((a, b) => a.ventas - (b.ventas));
        break;
      case "V+":
        productosFiltro.sort((a, b) => b.ventas - (a.ventas));
        break;
      default:
        productosFiltro.sort((a, b) => a.codigo - (b.codigo))
        break;
    }
    defineMostrar()
  }

  const handleProductCD = (event, index, stock) => {
    event.preventDefault();
    if (stock == 0) {
      alert ('El producto seleccionado no tiene stock')
      return
    }
    
    sessionStorage.setItem('productosPorPagina', productosPorPagina);
    sessionStorage.setItem('paginaActual', paginaActual);

    navigate(`/catalogocomprar/${index}`);
  }

  const agregarCarro = (event, codigo) => {
    event.preventDefault()

    const cantidad = 1
    let totalArticulos = 0

    if (localStorage.getItem('carroCompras') == null) 
    {
      const carroCompras = [{codigo, cantidad}];
      localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
      totalArticulos = cantidad
    } 
    else
    {
      // Consolidar y actualizar 
      const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
      for (let i = 0; i < carroCompras.length; i++) {
          totalArticulos += carroCompras[i].cantidad;
      }
    totalArticulos = totalArticulos + cantidad
    carroCompras.push({codigo, cantidad})
    localStorage.setItem('carroCompras', JSON.stringify(carroCompras))
    }

    updateCartState (true)
    updateUserCart  (totalArticulos)

    const ultimaRuta   = '/CatalogoMostrar'
    sessionStorage.setItem ('ultimaRuta', ultimaRuta)

    navigate(`/vercarro/`);
  }

  return (
    <div className='catalogo_mostrar'>
    <br />
    {estatusProductos && <div>
    <div className="container text-center" >
        <div className="row justify-content-md-center">

          <div className="col col-lg-4" style={{ display: 'flex', justifyContent: 'right' }}>
            <label  htmlFor="productos_pagina">
            </label>
            <select id="productos_paginas"
                    className='bg_productos_por_pagina'
                    value={ productosPorPagina } 
                    onChange={ handleSeleccionPagina }>
                    <option value="4">Vista       </option>
                    <option value="4"> 4 x página </option>
                    <option value="8"> 8 x página </option>
                    <option value="16">16 x página</option>
                    <option value="32">32 x página</option>
                    <option value="64">64 x página</option>
            </select>
          </div>
          <div className="col col-lg-4" style={{ display: 'flex', justifyContent: 'left' }}>
            <label  htmlFor="productos_orden">
            </label>
            <select id="productos_orden"
                    className='bg_productos_por_orden'
                    value={ productosPorOrden } 
                    onChange={ handleSeleccionOrdenar }>
                    <option value="D">Ordenar por  </option>
                    <option value="N-">Nombre A-Z  </option>
                    <option value="N+">Nombre Z-A  </option>
                    <option value="P-">Precio menor</option>
                    <option value="P+">Precio mayor</option>
                    <option value="V-">Ventas menor</option>
                    <option value="V+">Ventas mayor</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
            Mostrando productos {paginas[paginaActual-1]} al {Math.min (paginas[paginaActual-1]+productosPorPagina-1, totalProductos)} de un total de {totalProductos}
          </div>
      
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='catalogo_paginas'>
        <button className= 'compraCD_boton_restasuma' onClick={ flechaIzquierda }> - </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mostrando  página {paginaActual} de {totalPaginas}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className= 'compraCD_boton_restasuma' onClick={ flechaDerecha }> + </button> <br/> <br/>
      </div>
      </div>

      </div>

      <br/>
      <div className="catalogo_contenedor">
        {productosDisplay.map ((celda, index) => (
        <div className="catalogo_grid" style={{backgroundColor: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} key={index}>
          <img 
            src={celda.url} 
            onClick={(event) => handleProductCD (event, celda.codigo, celda.stock)}
            style={{ cursor: 'pointer' }}
            data-id={index}>
          </img><br/>
          {celda.nombre} <br/>
          {celda.grupo}  <br/>
          ${celda.precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} - Stock {celda.stock} unidad(es)
          <br/>
          <div style={{paddingTop:"15px"}}></div>
          <button className='compraCD_boton_comprar'
                  type="submit"
                  onClick= { (event) => agregarCarro (event, celda.codigo) }>Agregar al carro
          </button>
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
      </div>}

      {!estatusProductos && <div>
        <h3> Espere unos segundos, render está durmiendo.</h3>
        <h3> (le hemos enviado una señal para que despierte)</h3>
        <h3> En breves instantes desplegaramenos los productos.</h3>
      </div>}

      <br />
    </div>
  )
}
