import axios from 'axios';

export const AnulaReservas = async () => {

        console.log ('>>> Eliminando reservas (desde función) ...')

        if (sessionStorage.getItem('carroConStock') !== null) {
            const carroCompras = JSON.parse(sessionStorage.getItem('carroConStock'))
            sessionStorage.removeItem ('ultimaRuta')
            sessionStorage.removeItem ('carroConStock')

            for (let i = 0; i < carroCompras.length; i++) {
            
                const codigoString = carroCompras[i].codigo.toString()
                const cantidadCarro = carroCompras[i].cantidad

                const urlProduct = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/products/' + codigoString

                try 
                {
                    const { data } = await axios.get (urlProduct)
                    const product_stock = data[0].stock
                    const nuevo_stock = product_stock + cantidadCarro

                    const objeto = data[0]
                    console.log ('Anula reserva - antes', objeto)
                    objeto.stock = nuevo_stock
                    objeto.ventas = objeto.ventas - cantidadCarro
                    console.log ('Anula reserva - despues', objeto)

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

        } else {
            console.log ('>>> No hay reservas para eliminar')
        }

    return (
    <></>
    )
}
