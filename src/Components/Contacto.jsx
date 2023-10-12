import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { AnulaReservas } from './AnulaReservas';
import './Contacto.css'

export const Contacto = () => {
  // Estados para guardar los valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [showErrorDatos, setShowErrorDatos] = useState(false);
  const [showExito, setShowExito] = useState(false);

  AnulaReservas ()

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí agregar la lógica para enviar los datos del formulario a un servidor
  };

  const validarDatos = () => {
    if (nombre.trim() === '' || email.trim() === '' || mensaje === '') 
      {
        setShowErrorDatos (true)
      } 
    else
      {
        const contacto = {
          nombre: nombre,
          email : email,
          mensaje : mensaje
        }
        enviarMensaje (contacto)
      }
    }

  const  enviarMensaje  =  (contacto) => {
    setShowExito (true)
    setNombre ('')
    setEmail('')
    setMensaje('')
    }

    function AlertaErrorDatos ( { variante, mensaje1, mensaje2 } ) {
      if (showErrorDatos) {
        return (
          <Alert variant={variante} onClose={() => setShowErrorDatos (false)} dismissible>
            <Alert.Heading> {mensaje1} </Alert.Heading>
            <p> {mensaje2} </p>
          </Alert>
        );
      }
      return <Button onClick={() => setShowErrorDatos (true)}>Show Alert</Button>;
    }

    function AlertaExito () {
      if (showExito) {
        return (
          <Alert variant="success" onClose={() => setShowExito(false)} dismissible>
            <Alert.Heading>Mensaje enviado exitosamente</Alert.Heading>
            <p>
              SANTANA agradece su comentario
            </p>
          </Alert>
        );
      }
        return <Button onClick={() => setShowExito(true)}>Show Alert</Button>;
      }

  return (
    <div className="contacto">
      <br/>
      <h2>¿ALGUNA PREGUNTA O COMENTARIO?</h2>
      <h5>No dudes en contactarnos. Estamos encantados <br/>
          de ayudarte en todo lo que puedas necesitar.</h5>
      <br />
      <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='contacto_mensaje'>
          {showExito && (
            <AlertaExito />
          )}
          {showErrorDatos && (
            <AlertaErrorDatos variante = 'warning' 
                mensaje1 = 'Error en ingreso de datos' 
                mensaje2 = 'Todos los datos solicitados deben ingresarse' />
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <br />
              <label  className="nombre" 
                      htmlFor="nombre">Nombre : 
              </label>
              <input  className="campo" 
                      type="text" 
                      id="nombre" 
                      value={nombre} 
                      onChange={(e) => {setNombre(e.target.value)
                                        setShowExito (false)
                                        setShowErrorDatos (false)}}
              />
            </div>
            <div>
              <br />
              <label  className="email" 
                  htmlFor="email">Email @ : 
              </label>
              <input  className="campo" 
                      type="email" 
                      id="email" 
                      value={email} 
                      onChange={(e) => {setEmail(e.target.value)
                                        setShowExito (false)
                                        setShowErrorDatos (false)}}
              />
            </div>
            <div>
              <br />
              <label  className="mensaje" 
                      htmlFor="mensaje">Mensaje : 
              </label>
              <textarea className="campo" 
                        id="mensaje" 
                        value={mensaje} 
                        onChange={(e) => {setMensaje(e.target.value)
                                          setShowExito (false)
                                          setShowErrorDatos (false)}}
              />
            </div>
            <br />
            <button className='boton_contacto' 
                    type="submit"
                    id="boton_contacto"
                    onClick= {validarDatos}>
                    Enviar mensaje
            </button>
            <br/>
          </form>
          <br/>
        </div>
      </div>
    </div>

  );
};

