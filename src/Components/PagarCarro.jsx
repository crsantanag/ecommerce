import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import axios from 'axios'
import { PaypalButton } from './Paypal/PaypalButton'
import './PagarCarro.css'

export const PagarCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();

    
    const rutaActual   = '/pagarcarro'
    sessionStorage.setItem ('rutaActual', rutaActual)

    var pagarPaypal = 0

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const [totalNeto, setTotalNeto] = useState (0)
    const [totalIVA,  setTotalIVA] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [gastosDeEnvio, setGastosDeEnvio] = useState (0)
    const [totalTotal, setTotalTotal] = useState (0)
    const [newTotalValue, setNewTotalValue] = useState (0)

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
        // Si rut no existe en la sessionStorage entonces sale!
        if (sessionStorage.getItem('rut') !== null) {
            const data       = JSON.parse (localStorage.getItem ('token'))
            const rut        = sessionStorage.getItem ('rut')
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
        } else {
            alert ('Debe ingresar datos')
        }
    }

    useEffect (() => {
        leerUsuario ()
    },[])

    const calculaValores = () => {
        console.log ('0', newTotalValue)
        let suma = 0
        const carroCompras = JSON.parse(sessionStorage.getItem('carroCompras'));
        console.log ("Carro : ", carroCompras)
        for (let i = 0; i < carroCompras.length; i++) {
            const codigo   = parseInt(carroCompras[i].codigo)
            const cantidad = parseInt(carroCompras[i].cantidad)
            const precio   = productos[codigo-1].precio
            const subTotal = cantidad * precio
            suma = suma + subTotal
            // setTotalPesos (contador => contador + subTotal)
            console.log ("Acumulado : ", suma)
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
        pagarPaypal = totalValueRnd

        console.log ('1', totalValueRnd)
        setNewTotalValue (totalValueRnd)
        console.log ('2', pagarPaypal)
        console.log ("newTotalValue *"+ newTotalValue + "*")
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

    const onSubmitUpdateForm = async (event) => {
        event.preventDefault();

            // guardar direccion de destino
            const regresar = sessionStorage.getItem ('rutaActual');
            navigate( regresar );
    }

return (
    <div className="pagar_carro" style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
    <div className="row">
    <br/> <br/>
    <div className="contenedor_600">
    <br/> <br/>
    <div className="container-md">
    <h4>Información de envío</h4>
    <h5>¿ Cómo quieres recibir tu pedido ?</h5> <br/>
    <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="row">
        <div className="col col-md-auto" >
            <button type="button" className="btn btn-outline-primary" style={{width: "250px"}}>Envío a domicilio</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" className="btn btn-outline-primary " style={{width: "250px"}}>Retiro en tienda</button>
        </div>
        <br/> <br/><br/>
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
        <div className="mb-3">
            <label form="direccion" className="form-label">Dirección (calle y número)</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={updateForm.direccion}
                    onChange={handleupdateFormChange}  />
        </div>
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
        <button type="submit" className="btn btn-primary" onClick= { onSubmitUpdateForm } >Volver a la página anterior</button>
        </div>
    </form>
    <br/>
    </div>
    </div>
    <br/><br/>
    <div className="contenedor_600">
    <br/>
    <div className="bs-warning-rgb" style={{ border: "solid green",  borderRadius: "2%", backgroundColor: "green", color: "white", textAlign: "center"}}>
        <br/>
        <h4>Todos sus productos están en stock</h4>
        <br/>
    </div>
    <br/>
    <div className="bs-warning-rgb" style={{ border: "solid black",  borderRadius: "2%", color: "black", textAlign: "center"}}>
        <div className="container text-center">
            <br/>
            <h4>Detalle de la compra:</h4>
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
        <br/>
    </div>
    <br/>
    <PaypalButton invoice = {'CD 1 \n CD2'} totalValue = {28.99} />
    </div>
    </div>
    </div>
)
}
