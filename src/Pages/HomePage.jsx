import { useContext, useState, useEffect } from 'react';
import { ProductContext }  from "../Context/productContext";
import { NavBar } from '../Components/NavBar'
import { MainRoutes } from '../Router/MainRoutes'
import { Footer } from '../Components/Footer'
import ErrorBoundary from '../Components/Error'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import './HomePage.css'

export const HomePage = () => {
  console.log ('HOME PAGE *** /// +++')

  // Defino un estado que pueda ser modificado por NavBar
  const [nameState, setNameState] = useState(false);
  const [userName, setUserName] = useState ('')

  const [cartState, setCartState] = useState (false)
  const [userCart, setUserCart] = useState (0)

  // Defino funciones para actualizar el estado del inicio de sesión
  const updateNameState = (nuevoEstado) => {
        setNameState(nuevoEstado) }
  const updateUserName = (nuevoValor) => {
        setUserName(nuevoValor) }

  // Defino funciones para actualizar el estado del carro de compras
  const updateCartState = (nuevoEstado) => {
        setCartState (nuevoEstado) }
  const updateUserCart = (nuevoValor) => {
        setUserCart (nuevoValor) }

  // Cargo los productos desde la base de datos
  const [,dispatch] = useContext (ProductContext)

  const getAllProducts = async () => {

    if (localStorage.getItem('token') !== null) {
      const tokenString = localStorage.getItem('token')
      const decoded = jwt_decode (tokenString)
      updateUserName  (decoded.data.nombre)
      updateNameState (true)
    }

    let totalArticulos = 0
    if (localStorage.getItem('carroCompras') !== null) 
      {
        const carroCompras = JSON.parse(localStorage.getItem('carroCompras'));
        for (let i = 0; i < carroCompras.length; i++) {
            totalArticulos += carroCompras[i].cantidad;
        }
        updateUserCart (totalArticulos)
        if (totalArticulos == 0) 
        {
          updateCartState (false)
        }
        else 
        {
          updateCartState (true)
        }
      } 
      
      const { data } = await axios.get ("https://backend-proyecto-5-53yd.onrender.com/api/v1/products")
      dispatch ({ type: 'OBTENER_PRODUCTO', payload: data })
      console.log ('HOME PAGE - dispatch', data)
  }

  useEffect(() => {
      getAllProducts()
  }, [])

  return (
    <>
      <ErrorBoundary>
        <NavBar     nameState = {nameState}   updateNameState = {updateNameState}
                    userName = {userName}     updateUserName = {updateUserName}
                    cartState = {cartState} updateCartState = {updateCartState}
                    userCart = {userCart}   updateUserCart = {updateUserCart} />

        <MainRoutes nameState = {nameState}   updateNameState = {updateNameState}
                    userName = {userName}     updateUserName = {updateUserName}
                    cartState = {cartState} updateCartState = {updateCartState}
                    userCart = {userCart}   updateUserCart = {updateUserCart} />
        <Footer />
      </ErrorBoundary>
    </>
  )
}

