import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Exito = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

    const navigate = useNavigate();
    console.log ('>>> EXITO')

    useEffect (() => {
        updateUserCart (0)
        updateCartState(false)
        localStorage.removeItem ('carroCompras')
        const queryString = `/`;
        navigate (queryString)
      },[])
  return (
    <div>Exito
        
    </div>
  )
}
