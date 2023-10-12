import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Context/productContext';

export const Exito = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();
    console.log ('>>> EXITO')

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const [totalCarro, setTotalCarro] = useState ([])

    window.scrollTo(0, 0);

    const informaExito = () => {
      updateUserCart (0)
      updateCartState(false)

      const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
      setTotalCarro (carroCompras)

    }

    const seguirComprando = () => {
      localStorage.removeItem ('carroCompras')
      const queryString = '/catalogo';
      navigate (queryString)
    }

    useEffect (() => {
      informaExito ()
      },[])

  return (
    <div>
        <br/>
        <h4>Su compra se ha realizado exitosamente</h4>
        <h4>Los datos de envío / retiro son: </h4>
        <br/>
        <br/>
        <h4>Los prouctos comprados son: </h4>

        <div className="container text-center" >
            <div className='row' style={{marginLeft: "0px", marginRight: "0px"}} >
                {totalCarro.map ((celda, index) => (
                <div className="catalogo_carro" style={{backgroundColor: "white"}} key={index}>
                    <img data-id={index} src={productos[celda.codigo-1].url} width={100}> 
                    </img> <br/> <br/>
                    {productos[celda.codigo-1].grupo}  <br/>
                    {productos[celda.codigo-1].nombre} <br/>
                    ${productos[celda.codigo-1].precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} x {celda.cantidad} 
                </div>
                ))}
                <br /><br />
            </div> <br />
        </div>
        <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "200px"}} onClick={seguirComprando}>Seguir comprando</button> <br/> <br/>
    </div>
  )
}
