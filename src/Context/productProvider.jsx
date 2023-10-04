/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { ProductContext } from "./productContext"
import { productReducer } from "./productReducer"

export const ProductProvider = ({children}) => {

    console.log ('PRODUCT_PROVIDER')
    const initialState = {
        product: [],
    }

    const [state, dispatch] = useReducer (productReducer, initialState)

    return (
        <ProductContext.Provider value={[state, dispatch]}>
            {children}
        </ProductContext.Provider>
    )
}