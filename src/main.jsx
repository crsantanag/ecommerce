import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HomePage }  from './Pages/HomePage.jsx'

  // Defino los parámetros iniciales
  const rutaActual = '/'
  sessionStorage.setItem('rutaActual', rutaActual);

  const productosPorPagina = 4;
  sessionStorage.setItem('productosPorPagina', productosPorPagina);

  const productosPorOrden =''
  sessionStorage.setItem('productosPorOrden', productosPorOrden)

  const scrollPosition = 0;
  sessionStorage.setItem('scrollPosition', scrollPosition);

  const paginaActual = 1
  sessionStorage.setItem('paginaActual', paginaActual);

  console.log ('MAIN *** /// +++')
  
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  // </React.StrictMode>,
)