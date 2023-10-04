export const productReducer = (state, action) => {

    switch (action.type) {

        case "OBTENER_PRODUCTO":
            return {
                ...state,
                product: action.payload
            }

        default:
            return state

    }

}
