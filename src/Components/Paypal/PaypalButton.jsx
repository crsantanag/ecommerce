import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js"


export const PaypalButton = ({invoice, totalValue}) => {

  const approve = async (data, actions) => {
        
    try {
      const order = await actions.order?.capture ()
      console.log ('>>> PAYPAL', order)
      sessionStorage.removeItem ('ultimaRuta')
      sessionStorage.removeItem ('carroConStock')
      navigate ('/exito')
      }
    catch (error) {
      console.log (error)
      }
    }

  const navigate = useNavigate();

  return (
    < PayPalButtons

      createOrder = {(data, actions) => {
        return actions.order.create ({ purchase_units: [ { description: invoice, amount: {value: totalValue} } ] })
      }}
      
      onApprove = { approve }

      onError = {(error) => {
        console.error (error)
        alert ('Error al procesar el pago')
      }}

      onCancel = {(data) => {

      }}
      
    />
  )
}
