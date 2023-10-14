import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/userContext'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import './MiPerfil.css'

export const MiPerfil = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  const [esperaModal, setEsperaModal] = useState (false)
  const [titulo, setTitulo] = useState ("")
  const [mensaje, setMensaje] = useState ("")
  const [cierre, setCierre] = useState ("")

  const initialUpdateForm = {
    nombre:   '',
    apellido: '',
    rut:      '',
    email:    '',
    password: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    region: '',
    telefono: '',
  }
  
  const [updateForm, setUpdateForm] = useState (initialUpdateForm)

  //const data       = JSON.parse (localStorage.getItem ('token'))
  //const rut        = localStorage.getItem ('rut')
  //const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

  const [state, dispatch] = useContext (UserContext)
 
  const token = state.token
  console.log ("MIPERFIL - CONTEXT token: ",  token )

  const leerToken = () => {
    if (localStorage.getItem('token') !== null) {
      const tokenString = localStorage.getItem('token')
      const decoded = jwt_decode (tokenString)
      setUpdateForm ({...decoded.data})
    }
  }

{/*
    const leerUsuario = async () => {
    try {
      const traeUsuario = await axios.get ( urlUsuario, { headers:  { authorization: data } } )
      console.log ('Leyó : ', traeUsuario)
      const datosUsuario = traeUsuario.data[0]
      console.log (datosUsuario)
      console.log ("miPerfil ***: ", datosUsuario)
      setUpdateForm ({...datosUsuario})
    }
    catch (error) {
      console.log ('Salió por error', error)
    }
  } 
*/}

  useEffect (() => {
    leerToken ()
  },[])


  const handleUpdateFormChange = (event) => {
    const keyForm   = event.target.name
    const valueForm = event.target.value
    setUpdateForm ({
                    ...updateForm, 
                    [keyForm]: valueForm
                })
  }


  const onSubmitUpdateForm = async (event) => {
    event.preventDefault();

    const data = state.token
    // const data       = JSON.parse (localStorage.getItem ('token'))
    
    const rut        = localStorage.getItem ('rut')
    const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

    if (updateForm.nombre == "" || updateForm.apellido == "" || updateForm.direccion == "" || updateForm.comuna == "" || updateForm.ciudad == "" || updateForm.telefono == ""  ) {
      setTitulo  ("Error!")
      setMensaje ("Hay campos vacios, ingrese todos los datos")
      setCierre  ("Salir sin modificar")
    } else {

    setTitulo ("Actualizando datos ...")
    setEsperaModal (true)
    
    try {
      console.log (updateForm)
      const token       = await axios.put ( urlUsuario, updateForm,  { headers:  { authorization: data } } )
      const tokenString = JSON.stringify (token.data)
      localStorage.setItem ('token', tokenString)

      const nombreUsuario = updateForm.nombre
      updateUserName (nombreUsuario)
      setMensaje ("Sus datos se han actualizado")
      setCierre  ("Cerrar")

      //const { data } = await axios.post (urlLogin, loginForm)
      //const tokenString = JSON.stringify (data)
      //const  decoded = jwt_decode (tokenString);
      //setNombre (decoded.data.nombre + ' ' + decoded.data.apellido)
      //localStorage.setItem ('token', tokenString)


      // Hago Dispatch
      // dispatch ({ type:'LOGIN', payload: token})

    }
    catch (error) {
      console.log ('Codigo : ',  error.response.status)
      console.log ('Mensaje : ', error.response.data.mesagge)
    }
    setEsperaModal (false)
    }
  }


  const validarClose = (event) => {
    event.preventDefault();

    const regresar = sessionStorage.getItem ('rutaActual');
    navigate( regresar );
  }


  return (

  <div className="mi_perfil">
    <br />
    <div className="contenedor_800">
    <div className="container-md">
      <br/>
      <h2>Edición de perfil</h2>
      <br/>

      <form>
        <div className="row g-1">
          <div className="col-sm">
            <label  form="nombre" className="form-label">Nombre</label>
            <input  type="text"
                    name="nombre"
                    className="form-control" 
                    id="nombre"  
                    aria-label="nombre"
                    value={updateForm.nombre}
                    onChange={handleUpdateFormChange} />
          </div>
          <div className="col-sm">
            <label  form="apellido" className="form-label">Apellido</label>
            <input  type="text" 
                    name="apellido"
                    className="form-control" 
                    id="apellido"  
                    aria-label="apellido"
                    value={updateForm.apellido}
                    onChange={handleUpdateFormChange} />
          </div>

{/*         <div className="row g-1">
            <div className="col-sm">
            <label  form="email" className="form-label">eMail</label>
            <input  type="email" 
                    name="email"
                    className="form-control" 
                    id="email" 
                    value={updateForm.email}
                    onChange={handleUpdateFormChange} />
            </div>
            <div className="col-sm">
              <label  form="rut" className="form-label">Rut</label>
              <input  type="text"
                      name="rut"
                      className="form-control"
                      id="rut"
                      value={updateForm.rut}
                      onChange={handleUpdateFormChange} />
            </div>
          </div>

        <div className="row g-1">
          <div className="col-sm">
            <label  form="password" className="form-label">Password</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword"
                    value={updateForm.password}
                    onChange={handleUpdateFormChange} />
          </div>

          <div className="col-sm">
            <label form="password" className="form-label">Password (reingrese)</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword2"/>
          </div>
          </div>
*/}

          <div className="mb-3">
            <label form="direccion" className="form-label">Dirección (calle y número)</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={updateForm.direccion}
                    onChange={handleUpdateFormChange}  />
          </div>


          <div className="row g-1">
            <div className="col-sm">
              <label form="comuna" className="form-label">Comuna</label>
              <input type="text"  name="comuna" className="form-control" id="comuna" value={updateForm.comuna}
                      onChange={handleUpdateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="ciudad" className="form-label">Ciudad</label>
              <input type="text" name="ciudad" className="form-control" id="ciudad"  value={updateForm.ciudad}
                      onChange={handleUpdateFormChange}   />
            </div>
          </div>

            <div className="row g-1">
            <div className="col-sm">
              <label form="region" className="form-label">Region</label>
              <input type="text" name="region" className="form-control" id="region"  value={updateForm.region}
                      onChange={handleUpdateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="telefono" className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" id="telefono"  value={updateForm.telefono}
                      onChange={handleUpdateFormChange}  />
            </div>
          </div>

        </div>
        <br/>
        <button type="submit" className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick= { onSubmitUpdateForm } >Actualizar</button>
      </form>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {esperaModal     &&  
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        }
                        {!esperaModal  && 
                            <div>
                                {mensaje}
                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="submit" 
                                className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" 
                                data-bs-dismiss="modal"
                                onClick= { validarClose } >
                                {cierre}</button>
                    </div>
                </div>
            </div>
        </div>


      <br />
    </div>
    </div>
    <br />
  </div>

  )
}
