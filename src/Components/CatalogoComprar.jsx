import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import './CatalogoComprar.css'

export const CatalogoComprar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const { item } = useParams();
  const index = parseInt (item, 10) - 1

  const navigate = useNavigate();

  const [trackList, setTrackList] = useState ([])

  const productos = [ 
    {"tipo": "CompactDisc", "codigo": 1, "grupo": "Pink Floyd", "nombre": "Animals", "precio": 10900, "stock": 10, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_459,w_459/v1693358556/Pink_Floyd_-_Animals_qrlo52.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 2, "grupo": "Pink Floyd", "nombre": "The Dark Side of the Moon", "precio": 12900, "stock": 10, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1695221733/Pink_Floyd_-_Dark_Side_to_the_Moon_zklszd.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 3, "grupo": "Led Zeppelin", "nombre": "Led Zeppelin IV", "precio": 10900, "stock": 5, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693358497/Led_Zeppelin_-_IV_r3mp1j.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 4, "grupo": "Pink Floyd", "nombre": "Wish you Were Here", "precio": 10900, "stock": 10, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_430,w_430/v1693358928/Pink_Floyd_-_Wish_you_Were_Here_oigiob.jpg", "ventas":0}, 
    {"tipo": "CompactDisc", "codigo": 5, "grupo": "Pink Floyd", "nombre": "The Wall", "precio": 19900, "stock": 8, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_450,w_450/v1693359054/Pink_Floyd_-_The_Wall_ep1csz.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 6, "grupo": "Led Zeppelin", "nombre": "The Song Remains the Same", "precio": 19900, "stock": 8, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693360349/Led_Zeppelin_-_The_Song_Remains_the_Same_sfadpt.jpg", "ventas":0},
    {"tipo": "Amplifier", "codigo": 7, "grupo": "McIntosh", "nombre": "Amplificador Digital 8 canales MI128", "precio": 4199000, "stock": 1, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,w_500/v1693411698/McIntosh_-_Amplificador_Digital_8_Canales_McIntosh_MI128_-_a_suyol3.jpg", "ventas":0},
    {"tipo": "Amplifier", "codigo": 8, "grupo": "Yamaha", "nombre": "Amplificador multicanal RX V385", "precio": 529000, "stock": 2, "url":"https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,h_500,w_500/v1693412280/Yamaha_-_AV_RX-V385_-_1_jqq6tq.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 9, "grupo": "Led Zeppelin", "nombre": "Led Zeppelin I", "precio": 12990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693426981/Led_Zeppelin_-_I_mvw9ca.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 10, "grupo": "Led Zeppelin", "nombre": "Physical Graffiti", "precio": 12990, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693427182/Led_Zeppelin_-_Physical_Graffiti_2015_x7kw59.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 11, "grupo": "Eagles", "nombre": "Their Greatest Hits", "precio": 9900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693427360/Eagles_-_The_Geatest_Hist_lgzgkf.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 12, "grupo": "Pink Floyd", "nombre": "Pulse", "precio": 24990, "stock": 3, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1695221787/Pink_Floyd_-_Pulse_n9yeqo.jpg", "ventas":0},
    {"tipo": "Amplifier", "codigo": 13, "grupo": "Cambridge Audio", "nombre": "Amplificador estéreo CX A61", "precio": 599000, "stock": 1, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_scale,w_500/v1693441869/Cambridge_Audio_-_CXA61_muyqa2.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 14, "grupo": "Supertramp", "nombre": "Breakfast in America", "precio": 15990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693445285/Supertramp_-_Breakfast_in_America_ll2sn7.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 15, "grupo": "Supertramp", "nombre": "Brother Where You Bound", "precio": 12990, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1695233849/Supertramp_-_Brotrher_Were_Yoy_Bound_zdjfqn.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 16, "grupo": "Supertramp", "nombre": "Live in Paris '79", "precio": 22990, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693445315/Supertramp_-_Live_in_Paris_79_l2qfwu.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 17, "grupo": "Queen", "nombre": "Greatest Hits I & II", "precio": 24990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/c_fill,h_500,w_500/v1693446632/Queen_-_Greathest_Hits_I_y_II_fa4zpa.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 18, "grupo": "Queen", "nombre": "Greatest Hits ", "precio": 12900, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840160/Queen_-_Greathest_Hits_dcfl2i.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 19, "grupo": "Queen", "nombre": "A night at the Opera", "precio": 12900, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840439/Queen_-_A_Night_at_the_Opera_og7gwr.jpg", "ventas":0},
    {"tipo": "CompactDisc","codigo": 20, "grupo": "Ray Charles", "nombre": "Genius Love Company", "precio": 19990, "stock": 0, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693840838/Ray_Charles_-_Genius_Love_Company_vw8u2m.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 21, "grupo": "Norah Jones", "nombre": "Come Away With Me", "precio": 9900, "stock": 4, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693844155/Nora_Jones_-_Come_Away_with_Me_szavrd.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 22, "grupo": "Norah Jones", "nombre": "Feels Like Home", "precio": 9900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693844492/Nora_Jones_-_Feels_Like_Home_wlb0c9.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 23, "grupo": "Rod Stewart", "nombre": "It Had To Be You... The Great American Songbook", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_I_nttmss.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 24, "grupo": "Rod Stewart", "nombre": "As Time Goes By... The Great American Songbook: Volume II", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_II_xwgcfh.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 25, "grupo": "Rod Stewart", "nombre": "Stardust...The Great American Songbook III", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_III_mtbmlc.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 26, "grupo": "Rod Stewart", "nombre": "Thanks For The Memory... The Great American Songbook Vol. IV", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_IV_rtjmcy.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 27, "grupo": "Rod Stewart", "nombre": "Fly Me To The Moon... The Great American Songbook Volume V", "precio": 12900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Great_American_Songbook_V_dg3qm4.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 28, "grupo": "Rod Stewart", "nombre": "The definitive", "precio": 15900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693861601/Rod_Stewart_-_The_Definitive_Rod_Stewart_tk7zsk.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 29, "grupo": "Genesis", "nombre": "Platinum Collection", "precio": 25900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693862652/Genesis_-_Platinum_Collection_okbwmk.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 30, "grupo": "Genesis", "nombre": "A Trick of the Tail", "precio": 9900, "stock": 2, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693863012/Genesis_-_A_Trick_of_the_Tail_cjbs6e.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 31, "grupo": "Pink Floyd", "nombre": "The Division Bell", "precio": 9900, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693869729/Pink_Floyd_-_The_Division_Bell_pmdfwr.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 32, "grupo": "Santana", "nombre": "Supernatural", "precio": 24990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693961741/Santana_-_Supernatural_xs2lsg.jpg", "ventas":0},
    {"tipo": "CompactDisc", "codigo": 33, "grupo": "Santana", "nombre": "Ultimate Santana", "precio": 12990, "stock": 5, "url": "https://res.cloudinary.com/dtcg4qg4u/image/upload/v1693961741/Santana_-_Ultimate_te9b4e.jpg", "ventas":0}
];
  const [cantidad, setCantidad] = useState(1)
  window.scrollTo(0, 0);

  const leerTrackList = async () => {
    const nombre = productos[index].nombre.replace (' ','+')
    const grupo  = productos[index].grupo.replace  (' ', '+')

    const urlIndicadores = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=2ee7569785c94e3b063786ac07345e13&artist="+grupo+"&album="+nombre+"&format=json"
    console.log (nombre, grupo)
    const respTrackList = await fetch(urlIndicadores);
    try {
      const dataTrackList = await respTrackList.json();
      setTrackList(dataTrackList.album.tracks.track)
      console.log (dataTrackList)
    }
    catch (error) 
    {
      alert ("Error al recuperar Tracks List! ", error)
    }
  }

  const restaUno = () => {
    if (cantidad == 1) return;
    setCantidad (contador => contador - 1)
  }

  const sumarUno = () => {
    if (cantidad == productos[index].stock ) return;
    setCantidad (contador => contador + 1)
  }

  const agregarCarro = (event, codigo) => {
    event.preventDefault()

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

  const verCarro = () => {
    navigate(`/vercarro/`);
    
  }

  useEffect (() => {
    leerTrackList ()
  },[])

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
                  onClick= { (event) => agregarCarro (event, productos[index].codigo) }>
                  Agregar al carro
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
