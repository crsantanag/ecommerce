import { useContext } from 'react';
import { ProductContext } from '../Context/productContext';
import axios from 'axios';

export const AnulaReservas = async () => {

        console.log ('>>> Eliminando reservas (desde función) ...')
        const [state, dispatch] = useContext (ProductContext)
        const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

        if (sessionStorage.getItem('carroConStock') !== null) {
            const carroCompras = JSON.parse(sessionStorage.getItem('carroConStock'))
            sessionStorage.removeItem ('ultimaRuta')
            sessionStorage.removeItem ('carroConStock')

            for (let i = 0; i < carroCompras.length; i++) {

                const index         = carroCompras[i].codigo - 1
                const codigoString  = carroCompras[i].codigo.toString()
                const cantidadCarro = carroCompras[i].cantidad

                const urlProduct = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/' + codigoString

                try 
                {
                    const { data } = await axios.get (urlProduct)

                    const nuevoStock     = data[0].stock  + cantidadCarro
                    const nuevaVenta     = data[0].ventas - cantidadCarro

                    const newProductos = [...productos]
                    const objeto  = newProductos[index]
                    objeto.stock  = nuevoStock
                    objeto.ventas = nuevaVenta

                    newProductos[index] = objeto
                    dispatch ({ type: 'OBTENER_PRODUCTO', payload: newProductos })
                    console.log ('Modificando PRODUCTOS ANULA RESERVAS', newProductos)

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
        } 
        else 
        {
            console.log ('>>> No hay reservas para eliminar')
        }

    return (
    <></>
    )
}
