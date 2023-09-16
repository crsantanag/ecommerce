import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import './IniciarSesion.css'

export const IniciarSesion = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();

    const initialLoginForm = {
        email: '',
        password: ''
    }

    const [loginForm, setLoginForm] = useState (initialLoginForm)
    const [usuario, setUsuario] = useState ()
    const [exito, setExito] = useState (false)
    const [espera, setEspera] = useState (false)
    const [error, setError] = useState (false)
    const [nombre, setNombre] = useState ('')

    const handleLoginFormChange = (event) => {
        const keyForm   = event.target.name
        const valueForm = event.target.value
        setLoginForm ({
                        ...loginForm, 
                        [keyForm]: valueForm
                    })
    }

    const onSubmitLoginForm = async (event) => {
        event.preventDefault();
        const urlLogin = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/login'

        setEspera (true)
        setError  (false)
        setExito  (false)

        try {

            const { data } = await axios.post (urlLogin, loginForm)

            const tokenString = JSON.stringify (data)
            const  decoded = jwt_decode (tokenString);
            setNombre (decoded.data.nombre)

            localStorage.setItem ('Token', tokenString)

            setEspera (false)
            setExito  (true)

            updateNameState (true)
            updateUserName (decoded.data.nombre)

            const rut       = decoded.data.rut

            console.log ('rut :', typeof(rut), rut)
            sessionStorage.setItem ('rut', rut)
            console.log (data)

            const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

            const traeUsuario = await axios.get ( urlUsuario, {
                                                                headers: {
                                                                        authorization: data
                                                                        }
                                                                }
                                                )
            setUsuario (traeUsuario.data)

            console.log (traeUsuario.data)
        }
        catch {
            setEspera (false)
            setError  (true)
        }
    }

    const validarClose = (event) => {
        event.preventDefault();

        if (exito) {
            const regresar = sessionStorage.getItem ('rutaActual');
            navigate( regresar );
        }
    }

  return (
    <div className="iniciar_sesion">
        <br />
        <div className="contenedor_500">
        <div className="container-md">
        <br/>
        <h2>Ingrese su eMail y password</h2>
        <br/>
        <form onSubmit={onSubmitLoginForm}>
            <div className="mb-3">
                <label  form="inputEmail" className="form-label">eMail</label>
                <input  type="email" 
                        name="email"
                        className="form-control" 
                        id="inputEmail" 
                        aria-describedby="emailHelp"
                        value={loginForm.email}
                        onChange={handleLoginFormChange} 
                />
            </div>
            <div className="mb-3">
                <label  form="inputPassword1" className="form-label">Password</label>
                <input  type="password" 
                        name="password"
                        className="form-control" 
                        id="inputPassword1"
                        value={loginForm.password}
                        onChange={handleLoginFormChange}
                />
            </div>
            <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Continuar
            </button>

        </form>
        <br/>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Verificando </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {espera     &&  
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        {exito  && 
                            <div>
                                Bienvenido {nombre}
                            </div>
                        }
                        {error  && 
                            <div>
                                Email y/o password errónea
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="submit" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                                onClick= { validarClose } >
                                Close</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
        </div>
        <br/>

    {/*    { JSON.stringify (usuarios)}  */}

    </div>
    )
}
