import { useContext, useEffect} from 'react';
import { ProductContext } from '../Context/productContext';
import axios from 'axios';

export const AnulaReservas = () => {

    const [state,] = useContext (ProductContext)
    const productos = [...state.product].sort((a, b) => a.codigo - (b.codigo))

    const eliminaReservas = async () => {
        console.log ('>>> Eliminando reservas (desde función) ...')

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
            sessionStorage.removeItem ('ultimaRuta')
            sessionStorage.removeItem ('carroConStock')
        }
    }

    useEffect (() => {
        eliminaReservas ()
    },[])

    return (
    <></>
    )
}
