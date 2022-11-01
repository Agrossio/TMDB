import { createContext, useState } from 'react';

// creamos el contexto para la busqueda:

// Default context values (creamos la estructura que va a tener el contexto NO ES SETEAR EL ESTADO INICIAL)

const favoritesContextDefaultValues = [] // seteo la estructura del estado como arreglo vacio


// Generamos el Contexto
export const FavoritesContext = createContext(favoritesContextDefaultValues)

// Generamos el Componente Provider
const FavoritesContextProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(favoritesContextDefaultValues)        // ACA SI ESTABLEZCO EL ESTADO INICIAL

    return <FavoritesContext.Provider value={{ favorites, setFavorites }}> {children}</FavoritesContext.Provider >

}

export default FavoritesContextProvider; // exporto el provider para envolver a todos los componentes que necesitan usar el contexto