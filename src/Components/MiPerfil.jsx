import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/userContext'
import axios from 'axios'
import jwtDecode from "jwt-decode"
import './MiPerfil.css'

export const MiPerfil = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

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

  const data       = JSON.parse (localStorage.getItem ('token'))
  const rut        = localStorage.getItem ('rut')
  const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

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

const [state, dispatch] = useContext (UserContext)
console.log ("MIPERFIL - CONTEXT 1: ")
const token = state.token
console.log ("CATALOGO MOSTRAR - CONTEXT 2: ",  token )

console.log ("USE_EFFECT de MIPERFIL")

useEffect (() => {
  leerUsuario ()
},[])


  const handleupdateFormChange = (event) => {
    const keyForm   = event.target.name
    const valueForm = event.target.value
    setUpdateForm ({
                    ...updateForm, 
                    [keyForm]: valueForm
                })
    console.log (updateForm)
  }

  const onSubmitUpdateForm = async (event) => {
    event.preventDefault();

    const data       = JSON.parse (localStorage.getItem ('token'))
    const rut        = localStorage.getItem ('rut')
    const urlUsuario = 'https://backend-proyecto-5-53yd.onrender.com/api/v1/users/' + rut

    try {
      const actualizaUsuario = await axios.put ( urlUsuario, updateForm,  { headers:  { authorization: data } } )
      console.log (actualizaUsuario)
      updateUserName (updateForm.nombre)
      sessionStorage.setItem ('rut-', updateForm.rut)

      const regresar = sessionStorage.getItem ('rutaActual');
      navigate( regresar );
    }
    catch (error) {
      
      console.log ('Codigo : ',  error.response.status)
      console.log ('Mensaje : ', error.response.data.mesagge)

    }
    dispatch ({ type:'LOGIN', payload: data})
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
                    onChange={handleupdateFormChange} />
          </div>
          <div className="col-sm">
            <label  form="apellido" className="form-label">Apellido</label>
            <input  type="text" 
                    name="apellido"
                    className="form-control" 
                    id="apellido"  
                    aria-label="apellido"
                    value={updateForm.apellido}
                    onChange={handleupdateFormChange} />
          </div>
          <div className="row g-1">
            <div className="col-sm">
            <label  form="email" className="form-label">eMail</label>
            <input  type="email" 
                    name="email"
                    className="form-control" 
                    id="email" 
                    value={updateForm.email}
                    onChange={handleupdateFormChange} />
            </div>
            <div className="col-sm">
              <label  form="rut" className="form-label">Rut</label>
              <input  type="text"
                      name="rut"
                      className="form-control"
                      id="rut"
                      value={updateForm.rut}
                      onChange={handleupdateFormChange} />
            </div>
          </div>

{/*          <div className="row g-1">
          <div className="col-sm">
            <label  form="password" className="form-label">Password</label>
            <input  type="password" 
                    name="password"
                    className="form-control" 
                    id="inputPassword"
                    value={updateForm.password}
                    onChange={handleupdateFormChange} />
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
                    onChange={handleupdateFormChange}  />
          </div>


          <div className="row g-1">
            <div className="col-sm">
              <label form="comuna" className="form-label">Comuna</label>
              <input type="text"  name="comuna" className="form-control" id="comuna" value={updateForm.comuna}
                      onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="ciudad" className="form-label">Ciudad</label>
              <input type="text" name="ciudad" className="form-control" id="ciudad"  value={updateForm.ciudad}
                      onChange={handleupdateFormChange}   />
            </div>
          </div>

            <div className="row g-1">
            <div className="col-sm">
              <label form="region" className="form-label">Region</label>
              <input type="text" name="region" className="form-control" id="region"  value={updateForm.region}
                      onChange={handleupdateFormChange}  />
            </div>
            <div className="col-sm">
              <label form="telefono" className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" id="telefono"  value={updateForm.telefono}
                      onChange={handleupdateFormChange}  />
            </div>
          </div>

        </div>
        <br/>
        <button type="submit" className="btn p-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3" onClick= { onSubmitUpdateForm } >Actualizar</button>
      </form>
      <br />
    </div>
    </div>
    <br />
  </div>

  )
}
