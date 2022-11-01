import { createContext, useState } from 'react';

// creamos el contexto para la busqueda:

// Default context values (creamos la estructura que va a tener el contexto NO ES SETEAR EL ESTADO INICIAL)

const fetchContextDefaultValues = [] // seteo la estructura del estado como arreglo vacio


// Generamos el Contexto
export const FetchContext = createContext(fetchContextDefaultValues)

// Generamos el Componente Provider
const FetchContextProvider = ({ children }) => {

    const [fetch, setFetch] = useState(fetchContextDefaultValues)        // ACA SI ESTABLEZCO EL ESTADO INICIAL

    return <FetchContext.Provider value={{ fetch, setFetch }}> {children}</FetchContext.Provider >

}

export default FetchContextProvider; // exporto el provider para envolver a todos los componentes que necesitan usar el contexto