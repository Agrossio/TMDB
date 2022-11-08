import axios from 'axios'

const apiKey = process.env.REACT_APP_TMDB_API_KEY


/*
*   searchString: es el string a buscar que ingresa el usuario
*   type (multi, movie, tv, person): es si busca, movie, tv shows o personas. Por defecto tomamos multi que incluye los 3.
*/

export const multiSearch = (searchString, type = 'multi') => {

    return axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${searchString}`)
        .then(res => res.data.results)
}

export const contentFetch = (mediaType, id) => {

    // console.log("CONTENT FETCH", mediaType, id)
    return axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`)
        .then(res => res)

}