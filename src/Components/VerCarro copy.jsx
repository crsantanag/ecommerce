import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/productContext';
import axios from 'axios';
import './VerCarro.css'

export const VerCarro = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    console.log ('>>> VER carro')
    const navigate = useNavigate();

    const [estado, setEstado] = useState (false)

    const [totalArticulos, setTotalArticulos] = useState (0)
    const [totalPesos, setTotalPesos] = useState (0)
    const [totalCarro, setTotalCarro] = useState ([])

    const [esperaModal, setEsperaModal] = useState (true)
    const [muestraMensaje, setMuestraMensaje] = useState (false)
    const [globalProductosStock, setGlobalProductosStock] = useState ([])


    const rutaActual   = '/vercarro'
    sessionStorage.setItem ('rutaActual', rutaActual)

    window.scrollTo(0, 0)

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const consolidaCarro = () => {
        if (localStorage.getItem('carroCompras') !== null) 
        {
            let carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
            for (let i = 0; i < carroCompras.length - 1; i++) {
                for (let j = i+1;  j < carroCompras.length; j++) {
                    if (carroCompras[i].codigo == carroCompras[j].codigo) {
                        carroCompras[i].cantidad = carroCompras[i].cantidad + carroCompras[j].cantidad
                        carroCompras[j].cantidad = 0
                    }
                }
            }   
            let  totalCarroAux = []
            for (let i = 0; i < carroCompras.length; i++) {
                const codigo   = parseInt(carroCompras[i].codigo)
                const cantidad = parseInt(carroCompras[i].cantidad)
                if (cantidad !== 0)
                {
                    setEstado (true)
                    const precio   = productos[codigo-1].precio
                    const subTotal = cantidad * precio
                    setTotalArticulos (contador => contador + cantidad)
                    setTotalPesos (contador => contador + subTotal)
                    totalCarroAux.push ({ codigo, cantidad, precio, subTotal })
                }
            }
            carroCompras = totalCarroAux.map (articulo => ({ codigo: articulo.codigo, cantidad: articulo.cantidad }))
            localStorage.setItem('carroCompras', JSON.stringify(carroCompras))
            setTotalCarro (totalCarroAux)
        
            if (sessionStorage.getItem('ultimaRuta') !== null) 
            {
                const ultimaRuta = sessionStorage.getItem ('ultimaRuta')
                if (ultimaRuta == '/pagarcarro') {
                    sessionStorage.removeItem('ultimaRuta')
                    eliminaReservas ()
                }
            }
        }
    }

    useEffect (() => {
        consolidaCarro ()
    },[])


    const eliminaReservas = async () => {
        console.log ('>>> Eliminando reservas ...')

        if (sessionStorage.getItem('carroConStock') !== null) {
            const carroCompras = JSON.parse(sessionStorage.getItem('carroConStock'))

            for (let i = 0; i < carroCompras.length; i++) {
            
                const codigoString = carroCompras[i].codigo.toString()
                const cantidadCarro = carroCompras[i].cantidad

                const urlProduct = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/' + codigoString
                const index = carroCompras[i].codigo-1

                try 
                {
                    const { data } = await axios.get (urlProduct)
                    const product_stock = data[0].stock
                    const nuevo_stock = product_stock + cantidadCarro

                    const objeto = productos[index]
                    objeto.stock = nuevo_stock
                    objeto.ventas = objeto.ventas - cantidadCarro

                    try 
                    {
                        await axios.put ( urlProduct, objeto)
                    } 
                    catch (error) 
                    {
                        console.log ('Error en put', error)
                    }

                } 
                catch (error) 
                {
                    console.log ('Error en get', error)
                }
            }
            sessionStorage.removeItem ('carroConStock')
        }
    }

    const revisaReservas = async () => {
        const carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
        const productosStock = []
        setEsperaModal (true)
        setMuestraMensaje (false)
        console.log ('Muestra Mensaje antes del FOR ', muestraMensaje)

            for (let i = 0; i < carroCompras.length; i++) {
                
                const codigoString  = carroCompras[i].codigo.toString()
                const cantidadCarro = carroCompras[i].cantidad
                const urlProduct = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/' + codigoString

                try 
                {
                    const { data } = await axios.get (urlProduct)
                    const product_codigo = data[0].codigo
                    const product_stock  = data[0].stock
                    const nuevo_stock    = product_stock - cantidadCarro

                    if (nuevo_stock >= 0) 
                    {
                        productosStock.push ({"codigo": product_codigo, "imagen": "/assets/images/ok.png"})
                    } else 
                    {
                        productosStock.push ({"codigo": product_codigo, "imagen": "/assets/images/no.png"})
                        setMuestraMensaje (true)
                        console.log ('Muestra Mensaje dentro del FOR', muestraMensaje)
                    }
                } catch (error) {
                    console.log ('Error en get', error)
                }
            }
            setEsperaModal (false)
            setGlobalProductosStock ([...productosStock])
            console.log ("Productos Stock y Muestra Mensaje", productosStock, muestraMensaje)
    }


    const restaUno = (event, index) => {
        event.preventDefault();
    
        let totalCarroAux = [...totalCarro]
        const cantidadAux = totalCarroAux[index].cantidad

        if (cantidadAux == 1) return;

        totalCarroAux[index].cantidad = cantidadAux - 1
        totalCarroAux[index].subTotal =  totalCarroAux[index].cantidad *  totalCarroAux[index].precio

        const totalArticulosAux = totalArticulos -1
        const totalPesosAux = totalPesos - totalCarroAux[index].precio

        updateUserCart  (totalArticulosAux)
        setTotalCarro (totalCarroAux)
        setTotalArticulos (totalArticulosAux)
        setTotalPesos (totalPesosAux)

        const carroCompras = totalCarroAux.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }))
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }
    
    const sumarUno = (event, index) => {
        event.preventDefault();

        const codigo = totalCarro[index].codigo
        const maximo = productos [codigo-1].stock
    
        let totalCarroAux = [...totalCarro]
        const cantidadAux = totalCarroAux[index].cantidad

        if (cantidadAux == maximo) return;

        totalCarroAux[index].cantidad = cantidadAux + 1
        totalCarroAux[index].subTotal =  totalCarroAux[index].cantidad *  totalCarroAux[index].precio

        const totalArticulosAux = totalArticulos + 1
        const totalPesosAux = totalPesos + totalCarroAux[index].precio

        updateUserCart  (totalArticulosAux)
        setTotalCarro (totalCarroAux)
        setTotalArticulos (totalArticulosAux)
        setTotalPesos (totalPesosAux)

        const carroCompras = totalCarroAux.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }))
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }


    const eliminaProduct = (event, index) => {
        event.preventDefault();

        const NewTotalArticulos = totalArticulos - totalCarro[index].cantidad
        setTotalArticulos (NewTotalArticulos)
        updateUserCart (NewTotalArticulos)
        const NewTotalPesos = totalPesos - totalCarro[index].subTotal
        setTotalPesos (NewTotalPesos)

        if (NewTotalArticulos == 0) {
            updateCartState(false)
            setEstado (false)
        }
        totalCarro.splice(index, 1)

        const carroCompras = totalCarro.map(objeto => ({ codigo: objeto.codigo, cantidad: objeto.cantidad }));
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
    }


    const seguirComprando = (event) => {
        event.preventDefault();
        const rutaCatalogo = sessionStorage.getItem ('rutaCatalogo')
        navigate (rutaCatalogo);
    }


    const irAPagar = (event) => {
        event.preventDefault();
        // const verificaLogin = nameState
        // Si carro está vacío NO HAY QUE IR A PAGAR
        if (cartState == false || userCart == 0) {
            alert ('Carro está vacío')
        } else {
            revisaReservas ()
        }
    }

    const cerrarModal = (event) => {
        event.preventDefault()
        const avanzar = !muestraMensaje
        if (avanzar) 
        {
            const queryString = `/pagarcarro`;
            navigate (queryString)
        }
    }


    return (
    <div className='ver_carro'>
        <br />
        <div className="container text-center">
        <div className="bs-warning-rgb" style={{ border: "solid black",  borderRadius: "2%", color: "black"}}>
                <br/><h4>IMPORTANTE: Al seleccionar "Proceder a Pagar" se verificará el stock de cada artículo, ya que éste</h4>
                <h4> podría ser distinto del actual por compras simultáneas.  Si un producto no tiene stock se indicará.</h4><br/>
            </div> 
    
            <br/>
            <div className="row">
                <div className="col col-md-auto" style={{textAlign: "left", width: "400px"}}>
                    <h4>Total Artículos {totalArticulos}</h4> <br/>
                    <h4>Total Compra &nbsp; ${totalPesos.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )}</h4>
                </div>
                <div className="col col-md-auto" style={{textAlign: "left"}}>
                    <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "200px"}} onClick={seguirComprando}>Seguir comprando</button> <br/> <br/>
                    {estado && <button type="button" className="p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" style={{width: "200px"}} onClick={irAPagar} data-bs-toggle="modal" data-bs-target="#exampleModal">Proceder a pagar</button>}

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Revisando stock de productos ...</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                {esperaModal &&  
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden"></span>
                                    </div>
                                }
                                <div className="modal-body">
                                    {globalProductosStock.map ((celda, index) => (
                                        <div  key={index}> 
                                            <img src={celda.imagen} width={30}> 
                                            </img> 
                                            {productos[celda.codigo-1].grupo} - {productos[celda.codigo-1].nombre} 
                                        </div>
                                        ))
                                    }
                                </div>
                                <div className="modal-footer">
                                    {muestraMensaje && <h5> Antes de continuar con el pago debe eliminar los productos sin stock </h5>}
                                    {muestraMensaje && <h6> Esto se produce por demora entre seleccionar productos y ir a pagar</h6>}
                                    <button type="button>" className="btn btn-secondary" data-bs-dismiss="modal" style={{justifyContent: "left"}} onClick={ cerrarModal }>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <br />
        <div className="container text-center" >
            <div className='row' style={{marginLeft: "0px", marginRight: "0px"}} >
                {totalCarro.map ((celda, index) => (
                <div className="catalogo_carro" style={{backgroundColor: "white"}} key={index}>
                    <img data-id={index} src={productos[celda.codigo-1].url} width={100}> 
                    </img> <br/> <br/>
                    <button className= 'compraCD_boton_restasuma' style={{ width: "40px", fontSize: "14px"}} onClick={(event) => restaUno (event, index)}> - </button>
                    &nbsp;&nbsp;&nbsp;Cantidad &nbsp;&nbsp;&nbsp;
                    <button className= 'compraCD_boton_restasuma' style={{ width: "40px", fontSize: "14px"}} onClick={(event) => sumarUno (event, index)}> + </button> <br/>
                    {productos[celda.codigo-1].grupo}  <br/>
                    {productos[celda.codigo-1].nombre} <br/>
                    ${productos[celda.codigo-1].precio.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} x {celda.cantidad} = ${celda.subTotal.toLocaleString('es-ES',{style: 'decimal',minimumFractionDigits: 0, maximumFractionDigits: 0} )} &nbsp;&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" style={{ cursor: 'pointer' }} onClick={(event) => eliminaProduct (event, index)}>
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg> <br />

                </div>
                ))}
                <br /><br />
            </div> <br />
        </div>
    </div>
  )
}
