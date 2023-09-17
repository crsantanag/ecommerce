import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Catalogo.css'

export const CatalogoMostrar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate   = useNavigate();
  const  { filtro }  = useParams();

  const rutaActual = '/catalogomostrar/' + filtro
  sessionStorage.setItem('rutaActual', rutaActual);

  var productosMostrar = []

  const productos = [ 
    {"tipo": "CD", "codigo": 1, "grupo": "Pink Floyd", "nombre": "Animals", "precio": 10900, "stock": 10, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_459,w_459/v1693358556/Pink_Floyd_-_Animals_qrlo52.jpg"},
    {"tipo": "CD", "codigo": 2, "grupo": "Pink Floyd", "nombre": "The Dark Side of the Moon", "precio": 12900, "stock": 10, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_445,w_445/v1693358758/Pink_Floyd_-_Dark_Side_to_the_Moon_cgjci9.jpg"}, 
    {"tipo": "CD", "codigo": 3, "grupo": "Led Zeppelin", "nombre": "Led Zeppelin - IV", "precio": 10900, "stock": 5, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693358497/Led_Zeppelin_-_IV_r3mp1j.jpg"},
    {"tipo": "CD", "codigo": 4, "grupo": "Pink Floyd", "nombre": "Wish you Were Here", "precio": 10900, "stock": 10, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_430,w_430/v1693358928/Pink_Floyd_-_Wish_you_Were_Here_oigiob.jpg"}, 
    {"tipo": "CD", "codigo": 5, "grupo": "Pink Floyd", "nombre": "The Wall", "precio": 19900, "stock": 8, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_450,w_450/v1693359054/Pink_Floyd_-_The_Wall_ep1csz.jpg"},
    {"tipo": "CD", "codigo": 6, "grupo": "Led Zeppelin", "nombre": "The Song Remains the Same", "precio": 19900, "stock": 8, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693360349/Led_Zeppelin_-_The_Song_Remains_the_Same_sfadpt.jpg"},
    {"tipo": "AMP", "codigo": 7, "grupo": "McIntosh", "nombre": "Amplificador Digital 8 canales MI128", "precio": 4199000, "stock": 1, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,w_500/v1693411698/McIntosh_-_Amplificador_Digital_8_Canales_McIntosh_MI128_-_a_suyol3.jpg"},
    {"tipo": "AMP", "codigo": 8, "grupo": "Yamaha", "nombre": "Amplificador multicanal RX V385", "precio": 529000, "stock": 2, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,h_500,w_500/v1693412280/Yamaha_-_AV_RX-V385_-_1_jqq6tq.jpg"},
    {"tipo": "CD", "codigo": 9, "grupo": "Led Zeppelin", "nombre": "Led Zeppelin - I", "precio": 12990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693426981/Led_Zeppelin_-_I_mvw9ca.jpg"},
    {"tipo": "CD", "codigo": 10, "grupo": "Led Zeppelin", "nombre": "Physical Graffiti", "precio": 12990, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693427182/Led_Zeppelin_-_Physical_Graffiti_2015_x7kw59.jpg"},
    {"tipo": "CD", "codigo": 11, "grupo": "Eagles", "nombre": "The Gratest Hits", "precio": 9900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693427360/Eagles_-_The_Geatest_Hist_lgzgkf.jpg"},
    {"tipo": "CD", "codigo": 12, "grupo": "Pink Floyd", "nombre": "Pulse", "precio": 24990, "stock": 3, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693427874/Pink_Floyd_-_Pulse_ippvio.jpg"},
    {"tipo": "AMP", "codigo": 13, "grupo": "Cambridge Audio", "nombre": "Amplificador estéreo CX A61", "precio": 599000, "stock": 1, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,w_500/v1693441869/Cambridge_Audio_-_CXA61_muyqa2.jpg"},
    {"tipo": "CD", "codigo": 14, "grupo": "Supertramp", "nombre": "Breakfast in America", "precio": 15990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693445285/Supertramp_-_Breakfast_in_America_ll2sn7.jpg"},
    {"tipo": "CD", "codigo": 15, "grupo": "Supertramp", "nombre": "Brother Were Yoy Bound", "precio": 12990, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693445315/Supertramp_-_Brotrher_Were_Yoy_Bound_sb2xyf.jpg"},
    {"tipo": "CD", "codigo": 16, "grupo": "Supertramp", "nombre": "Live in Paris '79", "precio": 22990, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693445315/Supertramp_-_Live_in_Paris_79_l2qfwu.jpg"},
    {"tipo": "CD", "codigo": 17, "grupo": "Queen", "nombre": "Greathest Hits I y II", "precio": 24990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_500,w_500/v1693446632/Queen_-_Greathest_Hits_I_y_II_fa4zpa.jpg"},
    {"tipo": "CD", "codigo": 18, "grupo": "Queen", "nombre": "Greathest Hits ", "precio": 12900, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840160/Queen_-_Greathest_Hits_dcfl2i.jpg"},
    {"tipo": "CD", "codigo": 19, "grupo": "Queen", "nombre": "A night at the Opera", "precio": 12900, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840439/Queen_-_A_Night_at_the_Opera_og7gwr.jpg"},
    {"tipo": "CD","codigo": 20, "grupo": "Ray Charles", "nombre": "Genius Love Company", "precio": 19990, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840838/Ray_Charles_-_Genius_Love_Company_vw8u2m.jpg"},
    {"tipo": "CD", "codigo": 21, "grupo": "Nora Jones", "nombre": "Come Away with Me", "precio": 9900, "stock": 4, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693844155/Nora_Jones_-_Come_Away_with_Me_szavrd.jpg"},
    {"tipo": "CD", "codigo": 22, "grupo": "Nora Jones", "nombre": "Feels Like Home", "precio": 9900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693844492/Nora_Jones_-_Feels_Like_Home_wlb0c9.jpg"},
    {"tipo": "CD", "codigo": 23, "grupo": "Rod Stewart", "nombre": "The Great American Songbook", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_I_nttmss.jpg"},
    {"tipo": "CD", "codigo": 24, "grupo": "Rod Stewart", "nombre": "The Great American Songbook II", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_II_xwgcfh.jpg"},
    {"tipo": "CD", "codigo": 25, "grupo": "Rod Stewart", "nombre": "The Great American Songbook III", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_III_mtbmlc.jpg"},
    {"tipo": "CD", "codigo": 26, "grupo": "Rod Stewart", "nombre": "The Great American Songbook IV", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_IV_rtjmcy.jpg"},
    {"tipo": "CD", "codigo": 27, "grupo": "Rod Stewart", "nombre": "The Great American Songbook V", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_V_dg3qm4.jpg"},
    {"tipo": "CD", "codigo": 28, "grupo": "Rod Stewart", "nombre": "The definitive", "precio": 15900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Definitive_Rod_Stewart_tk7zsk.jpg"},
    {"tipo": "CD", "codigo": 29, "grupo": "Genesis", "nombre": "Platinum Collection", "precio": 25900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693862652/Genesis_-_Platinum_Collection_okbwmk.jpg"},
    {"tipo": "CD", "codigo": 30, "grupo": "Genesis", "nombre": "A Trick of the Tail", "precio": 9900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693863012/Genesis_-_A_Trick_of_the_Tail_cjbs6e.jpg"},
    {"tipo": "CD", "codigo": 31, "grupo": "Pink Floyd", "nombre": "The Division Bell", "precio": 9900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693869729/Pink_Floyd_-_The_Division_Bell_pmdfwr.jpg"},
    {"tipo": "CD", "codigo": 32, "grupo": "Santana", "nombre": "Supernatural", "precio": 24990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693961741/Santana_-_Supernatural_xs2lsg.jpg"},
    {"tipo": "CD", "codigo": 33, "grupo": "Santana", "nombre": "Ultimate", "precio": 12990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693961741/Santana_-_Ultimate_te9b4e.jpg"}
  ];

  console.log ('CATALOGO MOSTRAR *** /// +++')

  const pp = parseInt(sessionStorage.getItem('productosPorPagina'));
  const [productosPorPagina, setProductosPorPagina] = useState (pp)

  const po =  sessionStorage.getItem('productosPorOrden');
  const [productosPorOrden, setProductosPorOrden] = useState (po)

  const pa = parseInt(sessionStorage.getItem('paginaActual'));
  const [paginaActual, setPaginaActual] = useState (pa)

  const [productosDisplay, setProductosDisplay] = useState ([])

  const productosFiltro = productos
    .filter ( (producto) => ( producto.tipo == filtro || 
                              producto.grupo.toUpperCase().includes(filtro.toUpperCase()) || 
                              producto.nombre.toUpperCase().includes(filtro.toUpperCase()) 
                            ) )
      .map (( producto) => ({
              codigo: producto.codigo,
              grupo: producto.grupo,
              nombre: producto.nombre,
              precio: producto.precio,
              stock: producto.stock,
              url: producto.url
  }))

  switch (productosPorOrden) {
    case "N-":
      productosFiltro.sort((a, b) => a.nombre.localeCompare(b.nombre));
      console.log ('ooo entró a A-Z', productosFiltro)
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
      console.log("+++", productosPorOrden,'+++ - Standard');
      break;
  }

  const totalProductos  = productosFiltro.length
  if (totalProductos == 0) return;

  const totalPaginas  = Math.ceil ( (totalProductos / productosPorPagina))

  const paginas = []
    for (let  i = 0;
              i < totalPaginas;
              i++) {
    paginas.push((i * productosPorPagina) + 1);
  }

  console.log ("** catalogoMostrar: prductosFiltrados ", productosFiltro)
  console.log ("** catalogoMostrar: totalProductos    ", totalProductos)
  console.log ("** catalogoMostrar: totalPaginas      ", paginas)

    useEffect ( ()=> {
    defineMostrar();
  },
  [paginaActual, filtro, productosPorPagina, productosPorOrden]
  )

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
    console.log ('flechaIzquierda: paginaActual ', n)
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

    console.log ('flechaDerecha: paginaActual ', n)

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
                  <option value="N-">Nombre Nombre A-Z</option>
                  <option value="N+">Nombre Nombre Z-A</option>
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
