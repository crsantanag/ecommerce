

export const Footer = () => {
  return (
    <div>
      <>
        <footer>
          <div className="container p-4">
            <div className="row mt-4">
              <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">SANTANA</h5>
                <p>
                Santana es una empresa líder en el mercado de equipos de alta fidelidad Hi-Fi que ofrece una 
                amplia gama de productos de audio de alta calidad para los audiófilos y amantes de la
                música. Ven a visitarnos y te sorprenderás del sonido que escucharás.
                </p>
                
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">CONTACTO</h5>
                <ul className="fa-ul">
                  {" "}
                  <li className="mb-3">
                    <span className="ms-2">
                      Av. Libertador Bernardo OHiggins 214, Concepción - Chile
                    </span>
                  </li>
                  <li className="mb-3">
                    <span className="ms-2">contacto@santana.com</span>
                  </li>
                  <li className="mb-3">
                    <span className="ms-2">+ 56 41 5555555</span>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">HORARIOS</h5>

                <table className="table text-center text-white">
                  <tbody className="fw-normal" style={{ textAlign: 'left', alignItems: 'left',  justifyContent: 'left' }}>
                    <tr>
                      <td>Lunes - Viernes</td>
                      <td>10:00 - 20.00 hrs.</td>
                    </tr>
                    <tr>
                      <td>Sábado</td>
                      <td>10:00 - 14:00 hrs</td>
                    </tr>
                    <tr>
                      <td>Domingo</td>
                      <td>Cerrado</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center p-3">
            {" "}
            © 2023 Copyright:
            SANTANA
          </div>
        </footer>
      </>
    </div>
  )
}
