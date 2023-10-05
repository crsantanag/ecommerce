export const ConsolidaCarro = () => {

    if (localStorage.getItem('carroCompras') !== null) {

        let carroCompras = JSON.parse(localStorage.getItem('carroCompras'))
        for (let i = 0; i < carroCompras.length - 1; i++) {
            for (let j = i+1;  j < carroCompras.length; j++) {
                if (carroCompras[i].codigo == carroCompras[j].codigo) {
                    carroCompras[i].cantidad = carroCompras[i].cantidad + carroCompras[j].cantidad
                    carroCompras[j].cantidad = 0
                }
            }
        }

        const carroComprasAux = carroCompras
        .filter ((producto) => ( producto.codigo !== 0 ))
        .map    ((producto) => ( {
                                codigo: producto.codigo,
                                cantidad: producto.cantidad } ))

        carroCompras = [...carroComprasAux]
        localStorage.setItem ('carroCompras', JSON.stringify(carroCompras))
        console.log ('>>> CONSOLIDA_CARRO ',  carroCompras)
    } 
  return (
    <></>
  )
}
