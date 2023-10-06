import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/productContext';
import './CatalogoComprar.css'

export const CatalogoComprar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const { item } = useParams();
  const itemNum  = parseInt (item, 10)
  const index    = parseInt (item, 10) - 1

  const [state,] = useContext (ProductContext)
  const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

  const navigate = useNavigate();

  const [trackList, setTrackList] = useState ([{"nombre": "ERROR: No es posible obtener el TRACK LIST"}])
  const [cantidad, setCantidad] = useState(1)

  const leerTrackList = async () => {
    if (localStorage.getItem('carroCompras') !== null) 
      {
      const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
      const buscaIndex   = carroCompras.findIndex (objeto => objeto.codigo == itemNum)
      if (buscaIndex !== -1) 
        {
          const getCantidad = parseInt(carroCompras[buscaIndex].cantidad)
          setCantidad (getCantidad)
        }
      }

    // Si es CompactDisc ==> leerTracks; si no es CompactDisc ==> leer descripción

    const nombre = productos[index].nombre.replace (' ','+')
    const grupo  = productos[index].grupo.replace  (' ', '+')

    const urlIndicadores = "https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=2ee7569785c94e3b063786ac07345e13&artist="+grupo+"&album="+nombre+"&format=json"
    console.log (nombre, grupo)
    const respTrackList = await fetch(urlIndicadores);
    try {
      const dataTrackList = await respTrackList.json();
      setTrackList(dataTrackList.album.tracks.track)
      window.scrollTo(0, 0)
    }
    catch (error) 
    {
      console.log ("ERROR: No es posible obtener TRACK LIST", error)
    }
  }


  useEffect (() => {
    leerTrackList ()
  },[])


  const restaUno = () => {
    if (cantidad == 1) return;
    setCantidad (contador => contador - 1)
  }


  const sumarUno = () => {
    if (cantidad == productos[index].stock ) return;
    setCantidad (contador => contador + 1)
  }


  const actualizarCarro = (event, codigo) => {
    event.preventDefault()
    console.log ("Codigo es : ", codigo)

    if (localStorage.getItem('carroCompras') == null) 
    {
      console.log ("No existe carro de compras, se crea")
      const carroCompras = [{codigo, cantidad}];
      localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
      updateUserCart (cantidad)
    } 
    else 
    {
      const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
      console.log ("Existe carro de compras, se trae ", carroCompras)
      const buscaIndex = carroCompras.findIndex (objeto => objeto.codigo == codigo)
      if (buscaIndex !== -1) 
      {
        console.log ('Existe codigo, se actualiza ')
        const newObject = {codigo, cantidad }
        carroCompras[buscaIndex] = newObject;
        console.log ('Existe codigo, se actualiza carro de compras ', carroCompras)
      }
      else
      {
        carroCompras.push ({codigo, cantidad})
        console.log ('No existe codigo, se crea ', carroCompras)
      }
      localStorage.setItem('carroCompras', JSON.stringify(carroCompras))
      const totalArticulos = carroCompras.reduce((total, objeto) => total + objeto.cantidad, 0);
      updateUserCart  (totalArticulos)
    } 

    updateCartState (true)
    const rutaCatalogo = sessionStorage.getItem ('rutaCatalogo')
    navigate (rutaCatalogo);
  }


  const verCarro = () => {
    navigate(`/vercarro/`);
  }


  return (
    <div className="compraCD">
      <div className="container text-center">
        <div className='row'>
        <div className="col" style={{ justifyContent: "center", alignItems: "center"}}>
        <br />
        <img src={productos[index].url} className="img-fluid" style={{ minWidth: "200px"}}></img> <br/> <br/>
        </div>

        <div className="col" style={{ justifyContent: "center", alignItems: "center"}}>
        <div className="compraCD_center_content">
          <h4>Características</h4> <br/>
          Nombre álbum: {productos[index].nombre} <br/>
          Grupo: {productos[index].grupo} <br/>
          Precio: $ {productos[index].precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} <br/>
          Stock disponible: {productos[index].stock} unidad(es) <br/>
          { (productos[index].stock == 0) 
            // Enviar mensaje de NO STOCK
          }
          <br/><h4>Lista de Canciones</h4> <br/>
            {trackList.map((track, index) => (
              <div key={index}> 
                - {track.name} 
              </div>
            ))}
        </div> <br/>
        </div>

        <div className="col" style={{ justifyContent: "center", alignItems: "center"}}>
        <div className="compraCD_rigth_content">
          <h4>Carro de Compras</h4> <br/>
          <h5>Cantidad</h5>
          <button className= 'compraCD_boton_restasuma' onClick={ restaUno }> - </button>
          <div className='compraCD_cantidad'>  {cantidad} </div>
          <button className= 'compraCD_boton_restasuma' onClick={ sumarUno }> + </button> <br/> <br/>
          <button className='compraCD_boton_comprar' 
                  id='boton_comprar' 
                  type="submit"
                  /*onClick={() => window.history.back()}>*/
                  onClick= { (event) => actualizarCarro (event, productos[index].codigo) }>
                  Actualizar carro
          </button> <br/> <br/>
          <button className='compraCD_boton_comprar' 
                  id='boton_comprar' 
                  type="submit"
                  onClick= { verCarro }>
                  Ver carro
          </button>
        </div>
        </div>
        </div>
        </div>
    </div>
  );
}
