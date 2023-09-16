import { useNavigate } from 'react-router-dom';

export const CerrarSesion = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {
    
    const navigate = useNavigate();
    
    const validarClose = (event) => {
        event.preventDefault();

        const rut = ''
        sessionStorage.setItem ('rut', rut)
        console.log ('rut : *'+rut+'*')
        updateNameState (false)

        const regresar = sessionStorage.getItem ('rutaActual');
        navigate( regresar );
    }
    
  return (
    <>
        Cerrando
{/*        Realmente desea cerrar sesión de {userName} &nbsp;&nbsp;
            <button type="submit" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Continuar
            </button>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <!-- Modal -->
            <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cerrando sesión... </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                Sesión de {userName} cerrada!
                            </div>
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
*/}


<div className="modal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={validarClose}>Save changes</button>
      </div>
    </div>
  </div>
</div>



    </>
    )
}
