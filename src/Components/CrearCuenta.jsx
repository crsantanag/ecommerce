import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import './CrearCuenta.css'

export const CrearCuenta = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  const [esperaModal, setEsperaModal] = useState (false)
  const [exito, setExito]   = useState (false)

  const [titulo, setTitulo] = useState ("")
  const [mensaje, setMensaje] = useState ("")
  const [cierre, setCierre] = useState ("")

  const [errorDatos, setErrorDatos] = useState (false)
  const [errorRutEmail, setErrorRutEmail] = useState (false)
  const [errorServer, setErrorServer] = useState (false)

  const initialCreateForm = {
    nombre:   '',
    apellido: '',
    rut:      '',
    email:    '',
    password: '',
    passwordAux: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    region: '',
    telefono: '',
  }

  const [createForm, setCreateForm] = useState (initialCreateForm)
  
  const handleCreateFormChange = (event) => {
    const keyForm   = event.target.name
    const valueForm = event.target.value
    setCreateForm ({
                    ...createForm, 
                    [keyForm]: valueForm
                })
  }

  const onSubmitCreateForm = async (event) => {
    event.preventDefault();

    console.log (createForm)
    setEsperaModal (false)
    setExito (false)
    setErrorDatos (false)
    setErrorRutEmail (false)
    setErrorServer (false)

    if (  createForm.nombre == "" || createForm.apellido == "" || createForm.email== "" || createForm.rut == ""  ||
          createForm.password == "" || createForm.passwordAux == "" ||
          createForm.direccion == "" || createForm.comuna == "" || createForm.ciudad == "" || createForm.telefono == ""  ) 
    {
      console.log ("Campos en blanco")
      setErrorDatos (true)
      setTitulo  ("Error!")
      setMensaje ("Hay campos vacios, ingrese todos los datos")
      setCierre  ("Salir sin crear usuario")
    } 
    else 
    {
      if ( createForm.password !== createForm.passwordAux ) 
      {
        console.log ("Password no coincide")
        setErrorDatos (true)
        setTitulo  ("Error!")
        setMensaje ("Password no coincide")
        setCierre  ("Salir sin crear usuario")
      }
      else 
      {
        setEsperaModal (true)
        setTitulo ("Creando usuario  ...")
        const url = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users'
        try {
          const data = await axios.post(url, createForm, { headers: { "Content-Type": "application/json" } })
          console.log (data)
          setExito (true)
          setMensaje ("Usuario exitosamente creado: ")
        }
        catch (error) {
          console.log ('Codigo : ',  error.response.status)
          console.log ('Mensaje : ', error.response.data.message)
          setTitulo ("Error!")
          const status  = error.response.status
          if (status == 400) {
            setErrorDatos (true)
            setMensaje ("Hay campos vacios, ingrese todos los datos")
          }
          if (status == 410) {
            setErrorRutEmail (true)
            setMensaje ("Rut existe")
          }
          if (status == 500) {
            setErrorServer (true)
            setMensaje ("eMail existe")
          }
          setExito (false)
        }
        setEsperaModal (false)
      }
    }
  }


  const validarClose = (event) => {
    event.preventDefault();

    if (exito) {
      const login = '/iniciarsesion'
      navigate( login )
    }
  }

  return (

  <div className="iniciar_sesion">
    <br />
    <div className="contenedor_800">
    <div className="container-md">
      <br/>
      <h2>Para crear una cuenta ingrese sus datos</h2>
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
                    value={createForm.nombre}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="col-sm">
            <label  form="apellido" className="form-label">Apellido</label>
            <input  type="text" 
                    name="apellido"
                    className="form-control" 
                    id="apellido"  
                    aria-label="apellido"
                    value={createForm.apellido}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="row g-1">
            <div className="col-sm">
            <label  form="email" className="form-label">eMail</label>
            <input  type="email" 
                    name="email"
                    className="form-control" 
                    id="email" 
                    value={createForm.email}
                    onChange={handleCreateFormChange} 
                    required />
            </div>
            <div className="col-sm">
              <label  form="rut" className="form-label">Rut</label>
              <input  type="text"
                      name="rut"
                      className="form-control"
                      id="rut"
                      value={createForm.rut}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>
          
          <div className="row g-1">
          <div className="col-sm">
            <label  form="password" className="form-label">Password</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword"
                    value={createForm.password}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          <div className="col-sm">
            <label form="passworAux" className="form-label">Password (reingrese)</label>
            <input  type="password" 
                    name="passwordAux"
                    className="form-control" 
                    id="inputPasswordAux"
                    value={createForm.passwordAux}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          </div>

          <div className="row g-1">
          <div className="mb-3">
            <label form="direccion" className="form-label">Dirección (calle y número)</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={createForm.direccion}
                    onChange={handleCreateFormChange}
                    required />
          </div>
          </div>

          <div className="row g-1">
            <div className="col-sm">
              <label form="comuna" className="form-label">Comuna</label>
              <input type="text"  name="comuna" className="form-control" id="comuna" value={createForm.comuna}
                      onChange={handleCreateFormChange}
                      required />
            </div>
            <div className="col-sm">
              <label form="ciudad" className="form-label">Ciudad</label>
              <input type="text" name="ciudad" className="form-control" id="ciudad"  value={createForm.ciudad}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>

            <div className="row g-1">
            <div className="col-sm">
              <label form="region" className="form-label">Region</label>
              <input type="text" name="region" className="form-control" id="region"  value={createForm.region}
                      onChange={handleCreateFormChange}
                      required />
            </div>
            <div className="col-sm">
              <label form="telefono" className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" id="telefono"  value={createForm.telefono}
                      onChange={handleCreateFormChange}
                      required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <br/>
              <div className="form-check" >
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" form="gridCheck">Acepto las políticas de Santana </label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick= { onSubmitCreateForm } >Continuar</button>
      </form>

              {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {esperaModal &&  
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        }
                        {!esperaModal && exito &&
                            <div>
                                {mensaje} {createForm.nombre} {createForm.apellido} 
                            </div>
                        }

                        {!esperaModal && errorDatos &&
                            <div>
                                {mensaje}
                            </div>
                        }
                        {!esperaModal && errorRutEmail &&
                            <div>
                                Rut ya existe
                            </div>
                        }

                        {!esperaModal && errorServer &&
                            <div>
                                Mail ya existe
                            </div>
                        }

                    </div>
                    <div className="modal-footer">
                        <button type="submit" 
                                className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" 
                                data-bs-dismiss="modal"
                                onClick= { validarClose } >
                                Cerrar</button>
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
