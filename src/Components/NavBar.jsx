import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../Context/userContext'

export const NavBar = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();
  const [buscar, setBuscar] = useState ('')
  const [state, dispatch] = useContext (UserContext)

  const location = useLocation()
  const rutaActual = location.pathname;

  const scrollPosition = window.scrollY;
  sessionStorage.setItem('scrollPosition', scrollPosition.toString());

  console.log ('NAVBAR *** /// +++', rutaActual)

  // Hay un problema cuando elimino la busqueda (botón X)... se mantiene el SEARCH (p.e. SANTANA)
  const handleChange = (event) => {
    const nuevoValor = event.target.value;
    setBuscar(nuevoValor);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validaBuscar = () => {
    console.log ('Buscar : ', buscar.length)
    const pa = 1
    sessionStorage.setItem('paginaActual', pa);
    if (buscar.length == 0 ) {
      const queryString = `/catalogo`;
      navigate( queryString );
    } else {
      const queryString = `/catalogomostrar/${buscar}`;
      navigate( queryString );
    }
  }

  const iniciarSesion = (event) => {
    event.preventDefault();


    const queryString = `/iniciarsesion/`;
    navigate( queryString );
  }

  const crearCuenta = (event) => {
    event.preventDefault();
    
    const queryString = `/crearcuenta/`;
    navigate( queryString );
  }

  const miPerfil = (event) => {
    event.preventDefault();

    const queryString = `/miperfil/`;
    navigate( queryString );

  }
  const cerrarSesion = (event) => {
    event.preventDefault();

    localStorage.removeItem ('rut')
    localStorage.removeItem ('token')
    dispatch({ type: 'LOGOUT'}) // No necesita enviar carga (no necesita el payload)
    updateNameState (false)
  }

  const verCarro = (event) => {
    event.preventDefault();
    navigate(`/vercarro/`);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">

        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="/assets/images/logo.jpg" alt="Logo" height="50" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/nosotros">
                  Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogo">
                  Catálogo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">
                  Contacto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ubicacion">
                  Ubicación
                </NavLink>
              </li>
            </ul>

            <form className="d-flex" role="search" style={{width: "500px"}} onSubmit={handleSubmit}>
              <input  className="form-control me-1" 
                      type="search" 
                      placeholder="Buscar en el todo el catálogo" 
                      aria-label="Search"
                      id="buscar" 
                      value={ buscar } 
                      onChange={ handleChange }
              />
              <button className="btn btn-outline-dark" 
                      type="submit"
                      onClick = { validaBuscar }>
                      Buscar
              </button>
            </form>

            <p>&nbsp;&nbsp;</p>

            <form className="d-flex"  >

              { !nameState &&
              <div id="navbarNavDarkDropdown">
                <ul className="navbar-nav" >
                  <li className="nav-item dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle"
                            style={{width: "200px", textAlign: "center",   display: "inline-block"}}
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                            Mi cuenta
                    </button>
                      <ul className="dropdown-menu dropdown-menu-dark" style={{width: "200px"}}>
                        <li><a className="dropdown-item bg-dark" href="#" onClick = { iniciarSesion }>Iniciar sesión</a></li>
                        <li><a className="dropdown-item bg-dark" href="#" onClick = { crearCuenta }>Crear cuenta</a></li>
                      </ul> 
                  </li>
                </ul>
                </div>
              }
              { nameState &&
                <div id="navbarNavPrimaryDropdown">
                <ul className="navbar-nav" >
                  <li className="nav-item dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                            style={{width: "200px", textAlign: "center",   display: "inline-block"}}
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                            Bienvenido { userName }
                    </button>
                      <ul className="dropdown-menu bg-primary " style={{width: "200px"}}>
                        
                        <li><a className="dropdown-item bg-primary text-white" href="#" onClick = { miPerfil }>Mi perfil</a></li>
                        <li><a className="dropdown-item bg-primary text-white" href="#" onClick = { cerrarSesion }> Cerrar sesión</a></li>
                      </ul> 
                  </li>
                  </ul>
                </div>
              }
            </form>

            &nbsp;&nbsp;&nbsp;

            <form className="d-flex"  >
              { !cartState &&
              <button className="btn btn-outline-dark" 
                      style={{width: "200px", textAlign: "center",   display: "inline-block"}}
                      type="submit"
                      onClick = { verCarro }>
                      <img src="/assets/images/carrocompras.png" style={{width: "20px", height:"20px"}}/>
                      &nbsp;&nbsp;Carro de compras
              </button>
              }
              { cartState &&
              <button className="btn btn-primary" 
                      style={{width: "200px", textAlign: "center",   display: "inline-block"}}
                      type="submit"
                      onClick = { verCarro }>
                      Artículos : {userCart}
              </button>
              }
            </form>
          
          </div>
        
        </div>
      
      </nav>
    </>
  );
};
