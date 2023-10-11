import { AnulaReservas } from './AnulaReservas';
import './Nosotros.css'

export const Nosotros = () => {

  AnulaReservas ()

  return (
    <div>
      <div className="texto">
        <br />
        <div className='mostrar'>
          <div className="left-content">
            <h2>NUESTRO CONCEPTO</h2>
            <br/>
            <h2>MAXIMA CALIDAD DE AUDIO</h2>
            <br/> 
            Santana nace en el año 1988 como una empresa enfocada en la importación y venta de equipos de sonido,
            concentrándose principalmente en equipos de Audio Profesional.
            <br/>
            Al paso de los años, la experiencia y solidez de un gran equipo humano, nos posicionó como una de las empresas con mayor
            proyección en el mercado de la Alta Fidelidad, representando en forma exclusiva para Chile marcas mundialmente conocidas,
            convirtiéndonos en líderes en Alta Fidelidad..
            <br />
            <br />      
            MISIÓN<br/>
            La música es un gusto universal y nuestra misión, es buscar y seleccionar marcas y equipos a nivel mundial, que le permitan
            a nuestros clientes, disfrutar de la mejor  experiencia en audio.
            <br />
            <br />      
            VISIÓN<br/>
            Estar siempre a la vanguardia de las nuevas tecnologías en equipos de audio de alta fidelidad, para convertirnos en especialistas
            y referentes en el mercado nacional
            <br />
            <br />
            VALORES<br/>
            A través de los años hemos conformado un gran equipo, creando una experiencia única, generando satisfacción de nuestros 
            servicios y estableciendo lazos de confianza con nuestros clientes.
            <br />
            <br />
          </div>
          <div className="right-content">
            <br/>
            <img src="/assets/images/nosotros2.jpg" alt="Nosotros" />
          </div>
          <br/>
        </div>
      </div>
    </div>
  );
};
