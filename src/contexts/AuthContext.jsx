import { createContext, useState } from 'react';

// creamos el contexto para la autentificacion:

// Default context values (creamos la estructura que va a tener el contexto NO ES SETEAR EL ESTADO INICIAL)

const authContextdefaultValues = {} // seteo la estructura del estado como objeto vacio


// Generamos el Contexto
export const AuthContext = createContext(authContextdefaultValues)

// Generamos el Componente Provider
const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(authContextdefaultValues)        // ACA SI ESTABLEZCO EL ESTADO INICIAL

    /*
    * {...isLoggedIn, toggleAuth}
    * es lo mismo que hacer:
    * const value = { user: isLoggedIn.user, isAuthenticated: isLoggedIn.isAuthenticated, toggleAuth }
    */
    return <AuthContext.Provider value={{ user, setUser }}> {children}</AuthContext.Provider >

}

export default AuthContextProvider; // exporto el provider para envolver a todos los componentes que necesitan usar el contexto