import './Boton.css'

export const BotonRestar = ( { comensales, setComensales } ) => {
    
    // console.log ('*** RESTAR - Comensales antes de la función : ', comensales)
    
    const restarUno = () => {
        // console.log ('RESTAR - ^^^^^^^^^^^^^^^^^^^^^^^^')
        // console.log ('RESTAR - Comensales antes de cambiar de estado : ', comensales)

        if (comensales == 1) return;

        setComensales (contador => contador - 1)

        // console.log ('RESTAR - Comensales después de cambiar el estado : ', comensales)
        // console.log ('RESTAR - vvvvvvvvvvvvvvvvvvvvvvvvv')
    }

    return (
        <>
        <button className= 'boton_restasuma' onClick={restarUno}> - </button>
        </>
    )
}