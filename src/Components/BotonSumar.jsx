import './Boton.css'

export const BotonSumar = ( { comensales, setComensales } ) => {
    
    // console.log ('*** SUMAR - Comensales antes de la función : ', comensales)
    
    const sumarUno = () => {
        // console.log ('SUMAR - ^^^^^^^^^^^^^^^^^^^^^^^^')
        // console.log ('SUMAR - Comensales antes de cambiar de estado : ', comensales)

        if (comensales == 12) return;

        setComensales (contador => contador + 1)

        // console.log ('SUMAR - Comensales después de cambiar el estado : ', comensales)
        // console.log ('SUMAR - vvvvvvvvvvvvvvvvvvvvvvvvv')
    }
    
    return (
        <>
        <button className= 'boton_restasuma' onClick={sumarUno }> + </button>
        </>
    )
}