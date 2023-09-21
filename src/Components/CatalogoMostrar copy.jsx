import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './Catalogo.css'

export const CatalogoMostrar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate   = useNavigate();
  const  { filtro }  = useParams();

  const rutaActual = '/catalogomostrar/' + filtro
  sessionStorage.setItem('rutaActual', rutaActual);

  var productosMostrar = []

  console.log ('CATALOGO MOSTRAR *** /// +++')

  const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
  const [productosPorPagina, setProductosPorPagina] = useState (pp)

  const po =  sessionStorage.getItem('productosPorOrden');
  const [productosPorOrden, setProductosPorOrden] = useState (po)

  const pa = parseInt(sessionStorage.getItem('paginaActual'));
  const [paginaActual, setPaginaActual] = useState (pa)

  var   productos = []
  var   productosFiltro = []

  const [productosDisplay, setProductosDisplay] = useState ([])

  console.log ('Filtro : ', filtro, ', Productos : ',productos)



  
  console.log ('Filtro : ', filtro, ', ProductosFiltro : ',productosFiltro)

  switch (productosPorOrden) {
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
      break;
  }

  const totalProductos  = productosFiltro.length
  // return si no hay productos

  const totalPaginas  = Math.ceil ( (totalProductos / productosPorPagina))

  const paginas = []
    for (let  i = 0;
              i < totalPaginas;
              i++) { paginas.push((i * productosPorPagina) + 1) }

  console.log ("*** catalogoMostrar: prductosFiltrados ", productosFiltro)
  console.log ("*** catalogoMostrar: totalProductos    ", totalProductos)
  console.log ("*** catalogoMostrar: totalPaginas      ", paginas)

  const leerProductos = async () => {
    const urlProductos = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/'
    
    console.log ("+++ leerProductos +++")
      try {
        const traeProductos = await axios.get ( urlProductos )
        console.log ('Leyó en Mostrar: ', traeProductos.data)
        productos = ({...traeProductos.data})
        productosFiltro = productos
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
      }
      catch (error) {
        console.log ('Salió por error', error)
      }
  }

  useEffect (() => {
    leerProductos()
  },[])

  const defineMostrar = () => {
    
    const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
    setProductosPorPagina (pp)
    console.log ("***** catalogoMostrar: productosPorPagina      ", pp) 
  
    const pa = parseInt(sessionStorage.getItem('paginaActual'));
    setPaginaActual (pa)
    console.log ("***** catalogoMostrar: paginaActual      ", pa)

    const sp = parseInt(sessionStorage.getItem('scrollPosition'))
    window.scrollTo(0, sp);
    console.log ('>>> Scroll a ', typeof(sp), sp)
    
    for (let  i = paginas[paginaActual-1];
              i <  Math.min (paginas[paginaActual-1]+productosPorPagina , totalProductos+1) ;
              i++) {
      productosMostrar.push(productosFiltro[i-1]);
    }

    setProductosDisplay (productosMostrar)
    console.log ("-- defineMostrar: productosMostrar ", productosMostrar)
  }

  useEffect ( ()=> {
    defineMostrar();
    },
    [paginaActual, filtro, productosPorPagina, productosPorOrden]
  )

  const flechaIzquierda = () => {
    if (paginaActual == 1) return
    productosMostrar = []
    const n = paginaActual - 1
    sessionStorage.setItem('paginaActual', n);
    setPaginaActual (n)

    for (let  i = paginas[n-1];
              i < Math.min (paginas[n-1]+productosPorPagina , totalProductos+1) ;
              i++) {
      productosMostrar.push(productosFiltro[i-1]);
    }
    const scrollPosition = 1;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    setProductosDisplay (productosMostrar)
  }

  const flechaDerecha = () => {
    if (paginaActual == totalPaginas ) return
    productosMostrar = []
    const n = paginaActual + 1
    sessionStorage.setItem('paginaActual', n);
    setPaginaActual (n)

    for (let  i = paginas[n-1];
              i < Math.min (paginas[n-1]+productosPorPagina , totalProductos+1);
              i++) {
      productosMostrar.push(productosFiltro[i-1]);
    }
    const scrollPosition = 1;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    setProductosDisplay (productosMostrar)

  }

  const handleSeleccionPagina = (event) => {
    const pp = Math.trunc (parseInt(event.target.value,10))

    setProductosPorPagina (pp )
    console.log ('°°° Nueva productosPorPagina ', pp, productosPorPagina)

    const pa = Math.trunc (paginas[paginaActual-1] / pp) + 1
    setPaginaActual(pa) // revisar para no volver a la página 1 siempre!!
    console.log ('°°° Nueva paginaActual ', pa, paginaActual)

    sessionStorage.setItem('productosPorPagina', pp)
    sessionStorage.setItem('paginaActual', pa)

  }

  const handleSeleccionOrdenar = (event) => {
    const po = event.target.value
    setProductosPorOrden(po)
    sessionStorage.setItem('productosPorOrden', po)
    
    const n = 1
    sessionStorage.setItem('paginaActual', n);

    setPaginaActual (1)
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
    console.log ('Total Articulos inicio:', totalArticulos)
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mostrando  página {paginaActual}  de {totalPaginas}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className= 'compraCD_boton_restasuma' onClick={ flechaDerecha }> + </button> <br/> <br/>
      </div>
      </div>

      <br />
    </div>
  )
}
