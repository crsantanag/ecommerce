import { NavBar } from '../Components/NavBar'
import { MainRoutes } from '../Router/MainRoutes'
import { Footer } from '../Components/Footer'
import { useState } from 'react';
import ErrorBoundary from '../Components/Error'
import './HomePage.css'

export const HomePage = () => {

  console.log ('HOMEPAGE *** /// +++')

  // Defino un estado que pueda ser modificado por NavBar
  const [nameState, setNameState] = useState(false);
  const [userName, setUserName] = useState ('')

  const [cartState, setCartState] = useState (false)
  const [userCart, setUserCart] = useState (0)

  // Defino funciones para actualizar el estado del inicio de sesión y del carro de compras
  const updateNameState = (nuevoEstado) => {
        setNameState(nuevoEstado);
  };

  const updateUserName = (nuevoValor) => {
        setUserName(nuevoValor);
  };

  const updateCartState = (nuevoEstado) => {
        setCartState (nuevoEstado)
  }

  const updateUserCart = (nuevoValor) => {
        setUserCart (nuevoValor)
  }

  return (
    <>
      <ErrorBoundary>
        <NavBar     nameState={nameState}   updateNameState={updateNameState}
                    userName={userName}     updateUserName={updateUserName}
                    cartState = {cartState} updateCartState = {updateCartState}
                    userCart = {userCart}   updateUserCart = {updateUserCart} />

        <MainRoutes nameState={nameState}   updateNameState={updateNameState}
                    userName={userName}     updateUserName={updateUserName}
                    cartState = {cartState} updateCartState = {updateCartState}
                    userCart = {userCart}   updateUserCart = {updateUserCart} />
        <Footer />
      </ErrorBoundary>
    </>
  )
}

