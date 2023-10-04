import ReactDOM from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { BrowserRouter } from 'react-router-dom'
import { HomePage }  from './Pages/HomePage.jsx'
import { UserProvider } from './Context/userProvider.jsx'
import { ProductProvider } from './Context/productProvider.jsx'

// Defino los parámetros iniciales
  const rutaActual = '/'
  sessionStorage.setItem('rutaActual', rutaActual);

  const rutaCatalogo = '/'
  sessionStorage.setItem('rutaCatalogo', rutaCatalogo);

  const paginaActual = 1
  sessionStorage.setItem('paginaActual', paginaActual);

  const productosPorPagina = 4;
  sessionStorage.setItem('productosPorPagina', productosPorPagina);

  const productosPorOrden =''
  sessionStorage.setItem('productosPorOrden', productosPorOrden)

  const scrollPosition = 0;
  sessionStorage.setItem('scrollPosition', scrollPosition);

  console.log ('MAIN *** /// +++')

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>

  <UserProvider>
    <ProductProvider>
    <PayPalScriptProvider options = { {"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID } }>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
      </PayPalScriptProvider>
    </ProductProvider>
  </UserProvider>

  //</React.StrictMode>,
)