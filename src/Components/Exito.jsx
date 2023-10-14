import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Context/productContext';
import './Exito.css'
export const Exito = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();
    console.log ('>>> EXITO')

    const initialUpdateForm_user = {
      nombre:   '',
      apellido: '',
      email:    '',
      direccion: '',
      comuna: '',
      ciudad: '',
      region: '',
      telefono: '',
  }
    const [updateForm_user, setUpdateForm_user] = useState (initialUpdateForm_user)

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const [totalCarro, setTotalCarro] = useState ([])
    

    window.scrollTo(0, 0);

    const informaExito = () => {
      updateUserCart (0)
      updateCartState(false)

      const formulario = JSON.parse (sessionStorage.getItem ('formulario'))
      setUpdateForm_user (formulario)
      sessionStorage.removeItem ('formulario')

      const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
      setTotalCarro (carroCompras)
      localStorage.removeItem ('carroCompras')


    }

    const seguirComprando = () => {
      const queryString = '/catalogo';
      navigate (queryString)
    }

    useEffect (() => {
      informaExito ()
      },[])

  return (
    <div className="exito">
      <div className="container text-left">
        <br/>
        <h4>Su compra se ha realizado exitosamente</h4>
        <h4>Los datos de envío / retiro son: </h4>
        {updateForm_user.nombre} {updateForm_user.apellido} <br/>
        {updateForm_user.email} {updateForm_user.telefono}<br/>
        {updateForm_user.direccion} {updateForm_user.ciudad}
        <br/> <br/>
        <h4>Sus productos comprados: </h4>

        <div className="container text-center" >
            <div className='row' style={{marginLeft: "0px", marginRight: "0px", height: ""}} >
                {totalCarro.map ((celda, index) => (
                <div className="catalogo_exito" style={{backgroundColor: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} key={index}>
                    <img data-id={index} src={productos[celda.codigo-1].url} width={100}> 
                    </img> <br/> <br/>
                    {productos[celda.codigo-1].nombre} <br/>
                    {productos[celda.codigo-1].grupo}  <br/>
                    ${productos[celda.codigo-1].precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} x {celda.cantidad} 
                </div>
                ))}
                <br /><br />
            </div> <br />
        </div>
        <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "200px"}} onClick={seguirComprando}>Seguir comprando</button> <br/> <br/>
      </div>
    </div>
  )
}
