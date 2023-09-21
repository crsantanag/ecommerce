import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'
import './CrearCuenta.css'

export const MiPerfil = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  const initialCreateForm = {
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
  const [createForm, setCreateForm] = useState (initialCreateForm)

  const data       = JSON.parse (localStorage.getItem ('Token'))
  const rut        = sessionStorage.getItem ('rut')
  const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

  const leerUsuario = async () => {
    try {
      const traeUsuario = await axios.get ( urlUsuario, {
                                    headers:  {
                                              authorization: data
                                              }
                                    }
                      )
      console.log ('Leyó : ', traeUsuario)
      const datosUsuario = traeUsuario.data[0]
      console.log ("miPerfil ***: ", datosUsuario)
      setCreateForm ({...datosUsuario})
    }
    catch (error) {
      console.log ('Salió por error', error)
    }
  }

  const handleCreateFormChange = (event) => {
    const keyForm   = event.target.name
    const valueForm = event.target.value
    setCreateForm ({
                    ...createForm, 
                    [keyForm]: valueForm
                })
    console.log (createForm)
  }

  const onSubmitUpdateForm = async (event) => {
    event.preventDefault();

    const data       = JSON.parse (localStorage.getItem ('Token'))
    const rut        = sessionStorage.getItem ('rut')
    const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

    try {
      const actualizaUsuario = await axios.put ( urlUsuario, createForm,  {
        headers:  {
                  authorization: data
                  }
        }
      )
      console.log (actualizaUsuario)
      updateUserName (createForm.nombre)
      sessionStorage.setItem ('rut', createForm.rut)

      const regresar = sessionStorage.getItem ('rutaActual');
      navigate( regresar );
    }
    catch (error) {
      
      console.log ('Codigo : ',  error.response.status)
      console.log ('Mensaje : ', error.response.data.mesagge)

    }
  }

  useEffect (() => {
    leerUsuario ()
  },[])
 

  return (

  <div className="iniciar_sesion">
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
                    value={createForm.nombre}
                    onChange={handleCreateFormChange} />
          </div>
          <div className="col-sm">
            <label  form="apellido" className="form-label">Apellido</label>
            <input  type="text" 
                    name="apellido"
                    className="form-control" 
                    id="apellido"  
                    aria-label="apellido"
                    value={createForm.apellido}
                    onChange={handleCreateFormChange} />
          </div>
          <div className="row g-1">
            <div className="col-sm">
            <label  form="email" className="form-label">eMail</label>
            <input  type="email" 
                    name="email"
                    className="form-control" 
                    id="email" 
                    value={createForm.email}
                    onChange={handleCreateFormChange} />
            </div>
            <div className="col-sm">
              <label  form="rut" className="form-label">Rut</label>
              <input  type="text"
                      name="rut"
                      className="form-control"
                      id="rut"
                      value={createForm.rut}
                      onChange={handleCreateFormChange} />
            </div>
          </div>

{/*          <div className="row g-1">
          <div className="col-sm">
            <label  form="password" className="form-label">Password</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword"
                    value={createForm.password}
                    onChange={handleCreateFormChange} />
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
          <div className="row g-1">
          <div className="mb-3">
            <label form="direccion" className="form-label">Dirección (calle y número)</label>
            <input  type="text" 
                    name="direccion"
                    className="form-control" 
                    id="direccion"
                    value={createForm.direccion}
                    onChange={handleCreateFormChange}  />
          </div>
          </div>

          <div className="row g-1">
            <div className="col-sm">
              <label form="comuna" className="form-label">Comuna</label>
              <input type="text"  name="comuna" className="form-control" id="comuna" value={createForm.comuna}
                      onChange={handleCreateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="ciudad" className="form-label">Ciudad</label>
              <input type="text" name="ciudad" className="form-control" id="ciudad"  value={createForm.ciudad}
                      onChange={handleCreateFormChange}   />
            </div>
          </div>

            <div className="row g-1">
            <div className="col-sm">
              <label form="region" className="form-label">Region</label>
              <input type="text" name="region" className="form-control" id="region"  value={createForm.region}
                      onChange={handleCreateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="telefono" className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" id="telefono"  value={createForm.telefono}
                      onChange={handleCreateFormChange}  />
            </div>
          </div>

        </div>
        <br/>
        <button type="submit" className="btn btn-primary" onClick= { onSubmitUpdateForm } >Actualizar</button>
      </form>
      <br />
    </div>
    </div>
    <br />
  </div>

  )
}
