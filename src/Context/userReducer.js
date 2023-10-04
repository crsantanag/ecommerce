// En el reducer van "cayendo" las peticiones
// Cada vez que se ejecuta y que "lanza" una petición retorna un nuevo estado
// Esto sirve para re-renderizar la vista

// El state es el estado en el que está la aplicación
// El action es lo que le van "mandar", es lo que trae la "carga"
// La mochila de carga lleva el tipo (type) y la carga (payload)

const userReducer = (state, action) => {
    
    console.log ('USER_REDUCER')
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload
            }
        case 'LOGOUT':
            console.log ('LOGOUT')
            return {
                ...state,
                token: null
            }

        default:
            return state
    }
}

export default userReducer