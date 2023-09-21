import { Routes, Route } from "react-router-dom";
import { Portada } from '../Components/Portada'
import { Nosotros } from '../Components/Nosotros'
import { Catalogo } from '../Components/Catalogo'
import { CatalogoMostrar } from '../Components/CatalogoMostrar'
import { CatalogoComprar } from '../Components/CatalogoComprar'
import { VerCarro } from '../Components/VerCarro'
import { Contacto } from "../Components/Contacto";
import { Ubicacion } from '../Components/Ubicacion'
import { IniciarSesion } from "../Components/IniciarSesion";
import { CrearCuenta } from "../Components/CrearCuenta"
import { MiPerfil } from "../Components/MiPerfil";

export const MainRoutes = ({ nameState, updateNameState, userName, updateUserName, cartState, updateCartState, userCart, updateUserCart }) => {

  console.log  ('MAINROUTES *** /// +++')
  return (
    <Routes>
      <Route path='/' element={<Portada                     nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='/nosotros' element={<Nosotros />} />
      <Route path='/catalogo' element={<Catalogo            nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='/catalogomostrar/:filtro' element={<CatalogoMostrar  nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />
      <Route path='/catalogocomprar/:item' element={<CatalogoComprar    nameState={nameState} 
                                                                        updateNameState={updateNameState}
                                                                        userName={userName} 
                                                                        updateUserName={updateUserName}
                                                                        cartState = {cartState}
                                                                        updateCartState = {updateCartState}
                                                                        userCart = {userCart}
                                                                        updateUserCart = {updateUserCart}
                                                                        />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/ubicacion' element={<Ubicacion />} />
      <Route path='/vercarro' element={<VerCarro            nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='/iniciarsesion' element= {<IniciarSesion nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='/crearcuenta' element={<CrearCuenta      nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='/miperfil' element= {<MiPerfil           nameState={nameState} 
                                                            updateNameState={updateNameState}
                                                            userName={userName} 
                                                            updateUserName={updateUserName}
                                                            cartState = {cartState}
                                                            updateCartState = {updateCartState}
                                                            userCart = {userCart}
                                                            updateUserCart = {updateUserCart}
                                                            />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
};

