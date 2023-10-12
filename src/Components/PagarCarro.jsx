import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import { PaypalButton } from './Paypal/PaypalButton'
import './PagarCarro.css'

export const PagarCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate() 

    const [pagarPaypal, setPagarPaypal] = useState (0)

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))
    console.log ('>>> PAGAR_CARRO (inicio): ', productos)

    const [estadoProductosCon, setEstadoProductosCon] = useState (false)
    const [estadoProductosSin, setEstadoProductosSin] = useState (false)

    const [estadoWait, setEstadoWait] = useState (true)
    const [globalProductosConStock, setGlobalProductosConStock] = useState ([])
    const [globalProductosSinStock, setGlobalProductosSinStock] = useState ([])

    const [totalNeto, setTotalNeto] = useState (0)
    const [totalIVA,  setTotalIVA] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [gastosDeEnvio, setGastosDeEnvio] = useState (0)
    const [totalTotal, setTotalTotal] = useState (0)

    const [estadoEnvio, setEstadoEnvio] = useState (false)
    const [enviaADomicilio, setenviaADomicilio] = useState (false)
    const [retiraEnTienda,  setRetiraEnTienda]  = useState (false)

    const initialUpdateForm_user = {
        nombre:   '',
        apellido: '',
        rut:      '',
        email:    '',
        password: '',
        direccion: '',
        comuna: '',
        ciudad: '',
        region: '',
        telefono: '',
    }
    const [updateForm_user, setUpdateForm_user] = useState (initialUpdateForm_user)


    const hacerReservas = async () => {

        if (localStorage.getItem('token') !== null) { // Al modificar perfil DEBO actualizar el token
            const tokenString = localStorage.getItem('token')
            const decoded = jwt_decode (tokenString)
            setUpdateForm_user ({...decoded.data})
        }

        setEstadoProductosCon (false)
        setEstadoProductosSin (false)
        setEstadoWait (true)

        if (localStorage.getItem('carroCompras') !== null) {
            const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
            const productosConStock = []
            const productosSinStock = []

            for (let i = 0; i < carroCompras.length; i++) {
                
                const codigoString  = carroCompras[i].codigo.toString()
                const cantidadCarro = carroCompras[i].cantidad

                const urlProduct = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/' + codigoString
                const index = carroCompras[i].codigo-1
                try 
                {
                    const { data } = await axios.get (urlProduct)
                    const productoCodigo = data[0].codigo
                    const productoStock  = data[0].stock
                    const nuevoStock     = data[0].stock  - cantidadCarro
                    const nuevaVenta     = data[0].ventas + cantidadCarro

                    if (nuevoStock >= 0) {
                        const objeto  = productos[index]
                        console.log ("OJO 1", objeto)
                        objeto.stock  = nuevoStock
                        objeto.ventas = nuevaVenta
                        console.log ("OJO 2", objeto)
                        try 
                        {
                            await axios.put ( urlProduct, objeto)
                            productosConStock.push ({"codigo": productoCodigo, "cantidad": cantidadCarro, "stock": productoStock})
                            setEstadoProductosCon (true)
                        } catch (error) {
                            console.log ('Error en put', error)
                        }
                    } else {
                        productosSinStock.push ({"codigo": productoCodigo, "cantidad": cantidadCarro, "stock": productoStock})
                        setEstadoProductosSin (true)
                    }
                } catch (error) {
                    console.log ('Error en get', error)
                }
            }
            if (setEstadoProductosCon) {   // Debo asegurarme que cada componente al que vaya después de estar aquí debe liberar productos reservados
                sessionStorage.setItem ('ultimaRuta', '/pagarcarro' )
                sessionStorage.setItem ('carroConStock', JSON.stringify(productosConStock))
            }
            setGlobalProductosConStock ([...productosConStock])
            console.log ("Productos con Stock ", productosConStock)
            setGlobalProductosSinStock ([...productosSinStock])
            console.log ("Productos sin Stock ", productosSinStock)
        }
        setEstadoWait (false)
    }

    useEffect (() => {
        hacerReservas ()
    },[])


    const calculaValores = () => {
        let suma = 0
        const carroCompras = JSON.parse(localStorage.getItem('carroCompras'));

        for (let i = 0; i < carroCompras.length; i++) {
            const codigo   = parseInt(carroCompras[i].codigo)
            const cantidad = parseInt(carroCompras[i].cantidad)
            const precio   = productos[codigo-1].precio
            const subTotal = cantidad * precio
            suma = suma + subTotal
        }

        const pesos = suma
        setTotalPesos (suma)
        const neto = Math.round (pesos / 1.19)
        setTotalNeto (neto)
        const iva = Math.round (pesos - neto)
        setTotalIVA  (iva)
        const transporte = 0
        setGastosDeEnvio (transporte)
        const grandTotal = pesos + gastosDeEnvio
        setTotalTotal (grandTotal)

        const totalValueAux = (grandTotal / 900)
        const totalValueRnd = parseFloat(totalValueAux.toFixed(2))
        setPagarPaypal (totalValueRnd)
    }

    useEffect (() => {
        calculaValores ()
    },[updateForm_user])


    const handleupdateFormChange = (event) => {
        const keyForm   = event.target.name
        const valueForm = event.target.value
        console.log (keyForm, valueForm)
        setUpdateForm_user ({ ...updateForm_user, [keyForm]: valueForm })
    }


    const envioDomicilio = (event) => {
        event.preventDefault()
        if (!enviaADomicilio) {
            const transporte = 3990
            setGastosDeEnvio (transporte)
            const grandTotal = totalPesos + transporte
            setTotalTotal (grandTotal)
        }
        setenviaADomicilio (true)
        setRetiraEnTienda (false)
    }


    const retiraTienda = (event) => {
        event.preventDefault()
        if (!retiraEnTienda) {
            const transporte = 0
            setGastosDeEnvio (transporte)
            const grandTotal = totalPesos
            setTotalTotal (grandTotal)
        }
        setRetiraEnTienda (true)
        setenviaADomicilio (false)
    }


    const irAPagar = (event) => {
        event.preventDefault()
        // Debe revisar que todos los campos están OK, es decit, que todos los campos estén!!

        if (enviaADomicilio || retiraEnTienda) {
            setEstadoEnvio (true)
        } else {
            alert ('Debe seleccionar una opcion: envio o retiro')
        }
    }


    const regresar = (event) => {
        event.preventDefault()

        const rutaAnterior = sessionStorage.getItem ('rutaActual')
        navigate (rutaAnterior);
    }


    const eliminaProduct = (event) => {
        event.preventDefault()
        // Debo habilitar eliminar producto del carro de compras (como en catalogoMostrar)
    }
    

return (
    <div className="pagar_carro" >
        <br/>
        <div className="row g-2">
            <br/>
            <div className="contenedor_650">
                <div className='container-md'>
                    <h4>Información de envío</h4>
                    <h5>¿ Cómo quieres recibir tu pedido ?</h5> 
                    
                    <div className="row g-1">
                        <div className="col-sm" >
                            {!enviaADomicilio && <button type="button" className="btn btn-outline-primary"   style={{width: "250px", marginLeft: "20px", paddingRight: "20px"}} onClick= { envioDomicilio }>Envío a domicilio</button>}
                            { enviaADomicilio && <button type="button" className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "250px", marginLeft: "20px", paddingRight: "20px"}}>Envío a domicilio</button>}
                            {!retiraEnTienda  && <button type="button" className="btn btn-outline-primary"   style={{width: "250px", marginLeft: "20px"}} onClick={ retiraTienda }>Retiro en tienda</button>}
                            { retiraEnTienda  && <button type="button" className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "250px", marginLeft: "20px"}}>Retiro en tienda</button>}
                        </div>
                        <br/><br/><br/>
                    </div>

                    <form>
                        <div className="row g-1">
                            <div className="col-sm">
                                <label  form="nombre" className="form-label">Nombre</label>
                                <input  type="text"
                                        name="nombre"
                                        className="form-control" 
                                        id="nombre"  
                                        aria-label="nombre"
                                        value={updateForm_user.nombre}
                                        onChange={handleupdateFormChange} />
                            </div>
                            <div className="col-sm">
                                <label  form="apellido" className="form-label">Apellido</label>
                                <input  type="text" 
                                        name="apellido"
                                        className="form-control" 
                                        id="apellido"  
                                        aria-label="apellido"
                                        value={updateForm_user.apellido}
                                        onChange={handleupdateFormChange} />
                            </div>

                            <div className="row g-1">
                                <label form="direccion" className="form-label">Dirección (calle y número)</label>
                                <input  type="text" 
                                        name="direccion"
                                        className="form-control" 
                                        id="direccion"
                                        value={updateForm_user.direccion}
                                        onChange={handleupdateFormChange}  />
                            </div>

                            <div className="row g-1">
                                <div className="col-sm">
                                    <label form="comuna" className="form-label">Comuna</label>
                                    <input type="text"  name="comuna" className="form-control" id="comuna" value={updateForm_user.comuna}
                                            onChange={handleupdateFormChange}  />
                                </div>
                                <div className="col-sm">
                                    <label form="ciudad" className="form-label">Ciudad</label>
                                    <input type="text" name="ciudad" className="form-control" id="ciudad"  value={updateForm_user.ciudad}
                                            onChange={handleupdateFormChange}   />
                                </div>
                            </div>

                            <div className="row g-1">
                                <div className="col-sm">
                                    <label form="region" className="form-label">Region</label>
                                    <input type="text" name="region" className="form-control" id="region"  value={updateForm_user.region}
                                        onChange={handleupdateFormChange}  />
                                </div>
                                <div className="col-sm">
                                    <label form="telefono" className="form-label">Teléfono</label>
                                    <input type="text" name="telefono" className="form-control" id="telefono"  value={updateForm_user.telefono}
                                                onChange={handleupdateFormChange}  />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm">
                                    <br/>
                                    <div className="form-check" >
                                        < input className="form-check-input" type="checkbox" id="gridCheck" />
                                        <label className="form-check-label" form="gridCheck">Acepto las políticas de envío </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col col-md-auto" >
                            <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "250px", marginLeft: "20px", paddingRight: "20px"}} onClick= { regresar }>Regresar sin comprar</button>
                            {!estadoWait && !estadoProductosSin && <button type="button" className="p-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" style={{width: "250px", marginLeft: "20px"}} onClick= { irAPagar }>Pagar</button>}
                        </div>
                        <br/>
                    </div>
                    <br/>
                </div>
            </div>

            <br/><br/>
            <div className="contenedor_650">
            <div className='container-md'>
                <br/>

                <div className="p-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" style={{textAlign: "center", height: "150px"}}>
                
                    {estadoWait &&  
                    <div>
                        <h4>Verificando stock ... </h4>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                    }

                    {!estadoWait && !estadoProductosSin && 
                    <div> 
                        <br/>
                        <h4>Sus  productos  están  reservados</h4>
                        <h5>(tiene 15 minutos para realizar el pago de éstos,</h5>
                        <h5>pasado ese tiempo los productos serán liberados)</h5>
                        <br/>
                    </div>
                    }

                    {!estadoWait && estadoProductosSin && <h5>
                    Producto(s) sin stock suficiente <br/> <br/>
                    <div style={{textAlign: "left"}}> 
                    <h6>
                    {globalProductosSinStock.map ((celda, index) => (
                        <div  key={index}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" style={{ cursor: 'pointer' }} onClick={(event) => eliminaProduct (event, index)}>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>&nbsp;&nbsp;&nbsp;
                            {productos[celda.codigo-1].nombre} - {productos[celda.codigo-1].grupo} (stock: {celda.stock})
                        </div>
                        ))
                    } 
                    </h6>
                    </div>
                    </h5>
                    }

                </div> 
                <br/> 
                

                <div className="bs-warning-rgb" style={{ border: "solid black",  borderRadius: "2%", color: "black", textAlign: "center"}}>
                    <div className="container text-center">
                        <br/>
                        <div className="row">
                            <div className="col col-md-auto" style={{textAlign: "right", width: "300px"}}>
                                <h4>Neto</h4>
                                <h4>IVA</h4>
                                <h4>SubTotal</h4>
                                <h4>Gastos de Envío</h4>
                                <h4>Total</h4>
                            </div>
                            <div className="col col-md-auto" style={{textAlign: "right", width: "150px"}}>
                                <h4>$ {totalNeto.toLocaleString('es-CL', {style: 'decimal'})} </h4>
                                <h4>$ {totalIVA.toLocaleString('es-Cl',  {style: 'decimal'})} </h4>
                                <h4>$ {totalPesos.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                                <h4>$ {gastosDeEnvio.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                                <h4>$ {totalTotal.toLocaleString('es-CL',{style: 'decimal'})} </h4>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
        
                { estadoEnvio && <PaypalButton invoice = {'CD 1 \n CD2'} totalValue = {pagarPaypal} /> }
            </div>
            </div>
        </div>
        <br/>
    </div>
)
}
