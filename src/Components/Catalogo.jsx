import { useNavigate } from 'react-router-dom';
import { AnulaReservas } from './AnulaReservas';
import './Catalogo.css'

export const Catalogo = () => {

  const navigate = useNavigate();

  const rutaActual = '/catalogo/'
  sessionStorage.setItem('rutaActual', rutaActual);

  const rutaCatalogo = '/catalogo/'
  sessionStorage.setItem('rutaCatalogo', rutaCatalogo);

  const paginaActual = 1
  sessionStorage.setItem('paginaActual', paginaActual);

  AnulaReservas()
  
  const handleClick1 = () => {
    navigate('/catalogomostrar/CompactDisc');
  }

  const handleClick2 = () => {
    navigate('/catalogomostrar/Amplifier');
  }

  const handleClick3 = () => {
    navigate('/catalogomostrar/Speaker');
  }

  return (
    <div className='catalogo'>
      <br></br>
      <div className="catalogo">
        <h2>CD Musicales</h2>
        <img  className= "catalogo_producto" 
              src="/assets/images/producto1.jpg" 
              alt="CompactDisc" 
              onClick={ handleClick1 } 
              style={{ cursor: 'pointer' }}/>
        <br/><br/><br/>
        <h2>Amplificadores</h2>
        <img  className= "catalogo_producto" 
              src="/assets/images/producto2.jpg" 
              alt="Amplificadores" 
              onClick={ handleClick2 } 
              style={{ cursor: 'pointer' }} />
        <br/><br/><br/>
        <h2>Parlantes</h2>
        <img  className= "catalogo_producto" 
              src="/assets/images/producto3.jpg" 
              alt="Parlantes" 
              onClick={ handleClick3 } 
              style={{ cursor: 'pointer' }} />
        <br/>
        <br/>
      </div>
    </div>
  )
}

