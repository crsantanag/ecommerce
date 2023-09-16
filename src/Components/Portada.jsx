import { useNavigate } from 'react-router-dom';
import "./Portada.css";

export const Portada = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  const navigate = useNavigate();

  console.log ('PORTADA *** /// +++')
  const handleClick = () => {
    navigate('/catalogo');
  }

  return (

    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/assets/images/portada1.jpg" className="d-block w-100" alt="..." onClick={ handleClick } style={{ cursor: 'pointer' }}/>
        </div>
        <div className="carousel-item">
          <img src="/assets/images/portada2.jpg" className="d-block w-100" alt="..." onClick={ handleClick } style={{ cursor: 'pointer' }}/>
        </div>
        <div className="carousel-item">
          <img src="/assets/images/portada3.jpg" className="d-block w-100" alt="..." onClick={ handleClick } style={{ cursor: 'pointer' }}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  );
};
