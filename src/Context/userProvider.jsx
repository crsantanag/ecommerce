/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { UserContext } from "./userContext";
import userReducer from "./userReducer";

console.log ('USER_PROVIDER')
const funcionInicializadoraDelReducer = () => {
    const tokenLS = localStorage.getItem('token')
    const token = JSON.parse (tokenLS)
    return {token}
}

//     Higher Order Component (componente de orden alto)
//     Puede envolver a otros componentes. 
//     Por ej: <UserProvider> puede envolver a otros componentes y termina con </UserProvider>
//     en cambio los otros componentes van así: <ComponenteComun />
//     Le ponemos UserProvider pq "provee" información

export const UserProvider = ({children}) => {

//     El state está "dentro" del reducer,  viene con el reducer y con el provider "proveemos" del state
//     El dispatch es el "lanzador" de eventos. Lanza los eventos hacia el reducer (el reducer estará "leyendo" esos eventos)
//     El provider "provee" con información que viene desde el reducer, y el reducer "manipula" según lo que le enviemos
    const [state, dispatch] = useReducer (userReducer, null, funcionInicializadoraDelReducer)

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}