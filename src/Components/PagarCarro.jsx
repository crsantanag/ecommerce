import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import axios from 'axios'
import { PaypalButton } from './Paypal/PaypalButton'
import './PagarCarro.css'

export const PagarCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();

    const [pagarPaypal, setPagarPaypal] = useState (0)

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const [totalNeto, setTotalNeto] = useState (0)
    const [totalIVA,  setTotalIVA] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [gastosDeEnvio, setGastosDeEnvio] = useState (0)
    const [totalTotal, setTotalTotal] = useState (0)

    const [estado, setEstado] = useState (false)
    const [enviaADomicilio, setenviaADomicilio] = useState (false)
    const [retiraEnTienda,  setRetiraEnTienda]  = useState (false)

    const initialUpdateForm = {
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
    const [updateForm, setUpdateForm] = useState (initialUpdateForm)

    const leerUsuario = async () => {
        // Si rut no existe en la localStorage entonces sale!
        if (localStorage.getItem('rut') !== null) {
            const rut        = localStorage.getItem ('rut')
            const data       = JSON.parse (localStorage.getItem ('token'))
            const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut
            try 
            {
                const traeUsuario = await axios.get ( urlUsuario, { headers:  { authorization: data } } )
                const datosUsuario = traeUsuario.data[0]
                setUpdateForm ({...datosUsuario})
            }
            catch (error) 
            {
                console.log ('Salió por error', error)
            }   
        }
    }

    useEffect (() => {
        leerUsuario ()
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
        
        setTotalPesos (suma)
        const pesos = suma
        console.log (pesos)

        const neto = Math.round (pesos / 1.19)
        setTotalNeto (neto)
        console.log (neto)

        const iva = Math.round (pesos - neto)
        setTotalIVA  (iva)
        console.log (iva)

        const transporte = 3990
        setGastosDeEnvio (transporte)
        console.log (transporte)

        const grandTotal = pesos + gastosDeEnvio
        setTotalTotal (grandTotal)
        console.log (grandTotal)

        const totalValueAux = (grandTotal / 900)
        const totalValueRnd = parseFloat(totalValueAux.toFixed(2))
        setPagarPaypal (totalValueRnd)
    }

    useEffect (() => {
        calculaValores ()
    },[updateForm])


    const handleupdateFormChange = (event) => {
        const keyForm   = event.target.name
        const valueForm = event.target.value
        setUpdateForm ({
                        ...updateForm, 
                        [keyForm]: valueForm
                        })
    }


    const envioDomicilio = async (event) => {
        event.preventDefault()
        setenviaADomicilio (true)
        setRetiraEnTienda (false)
    }


    const retiraTienda = async (event) => {
        event.preventDefault()
        setRetiraEnTienda (true)
        setenviaADomicilio (false)
    }


    const irAPagar = async (event) => {
        event.preventDefault()
        // Debe revisar que todos los campos están OK
        // Debe revisar que esté seleccionado uno de: "envio a domicilio" o "retira en tienda"
        if (enviaADomicilio || retiraEnTienda) {
            setEstado (true)
        } else {
            alert ('Debe seleccionar una opcion: envio o retiro')
        }
 
    }


    const regresar = async (event) => {
        event.preventDefault()
        const rutaCatalogo = sessionStorage.getItem ('rutaActual')
        navigate (rutaCatalogo);
    }

return (
    <div className="pagar_carro">
    <br/>
    <div className="row">
    <br/> <br/>
    <div className="contenedor_650">
        <div className='container'>
        <br/>
        <h4>Información de envío</h4>
        <h5>¿ Cómo quieres recibir tu pedido ?</h5> <br/>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="row">
                <div className="col col-auto" >
                    {!enviaADomicilio && <button type="button" className="btn btn-outline-primary" style={{width: "250px", paddingLeft: "20px", paddingRight: "20px"}} onClick= { envioDomicilio }>Envío a domicilio</button>}
                    { enviaADomicilio && <button type="button" className="btn bg-primary text-white" style={{width: "250px", paddingLeft: "20px", paddingRight: "20px"}}>Envío a domicilio</button>}
                    {!retiraEnTienda  && <button type="button" className="btn btn-outline-primary" style={{width: "250px", marginLeft: "20px"}} onClick={ retiraTienda }>Retiro en tienda</button>}
                    { retiraEnTienda  && <button type="button" className="btn bg-primary text-white" style={{width: "250px", marginLeft: "20px"}}>Retiro en tienda</button>}
                </div>
                <br/><br/><br/>
            </div>
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
                        value={updateForm.nombre}
                            onChange={handleupdateFormChange} />
                </div>
                <div className="col-sm">
                    <label  form="apellido" className="form-label">Apellido</label>
                    <input  type="text" 
                            name="apellido"
                            className="form-control" 
                            id="apellido"  
                            aria-label="apellido"
                            value={updateForm.apellido}
                            onChange={handleupdateFormChange} />
                </div>

        <div className="row g-1">

            <label form="direccion" className="form-label">Dirección (calle y número)</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={updateForm.direccion}
                    onChange={handleupdateFormChange}  />
        
        </div>

        <div className="row g-1">
            <div className="col-sm">
                <label form="comuna" className="form-label">Comuna</label>
                <input type="text"  name="comuna" className="form-control" id="comuna" value={updateForm.comuna}
                    onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
                <label form="ciudad" className="form-label">Ciudad</label>
                <input type="text" name="ciudad" className="form-control" id="ciudad"  value={updateForm.ciudad}
                        onChange={handleupdateFormChange}   />
            </div>
        </div>

            <div className="row g-1">
            <div className="col-sm">
                <label form="region" className="form-label">Region</label>
                <input type="text" name="region" className="form-control" id="region"  value={updateForm.region}
                        onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
                <label form="telefono" className="form-label">Teléfono</label>
                <input type="text" name="telefono" className="form-control" id="telefono"  value={updateForm.telefono}
                        onChange={handleupdateFormChange}  />
            </div>
        </div>

        <div className="row mb-3">
            <div className="col-sm">
                <br/>
                <div className="form-check" >
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" form="gridCheck">Acepto las políticas de envío </label>
                </div>
            </div>
        </div>
        </div>
        <div className="row">
            <div className="col col-md-auto" >
                <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "250px", marginLeft: "20px"}} onClick= { regresar }><strong>Regresar sin comprar</strong></button>
                <button type="button" className="p-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" style={{width: "250px", marginLeft: "20px"}} onClick= { irAPagar }><strong>Pagar</strong></button>
            </div>
            <br/>
        </div>
    </form>
    <br/>
    </div>
    </div>
    
    <br/><br/>
    <div className="contenedor_650">
    <br/>
    <div className="p-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" style={{textAlign: "center"}}>
        <br/>
        <h4>Sus  productos  están  reservados</h4>
        <h5>(tiene 15 minutos para realizar el pago de éstos,</h5>
        <h5>pasado ese tiempo los productos serán liberados)</h5>
        <br/>
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
    { estado && <PaypalButton invoice = {'CD 1 \n CD2'} totalValue = {pagarPaypal} /> }
    </div>
    </div>
    <br/>
    </div>
)
}
