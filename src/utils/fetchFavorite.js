import axios from "axios"

// export const fetchFavorite = (mediaElementId, userId) => {

//     return axios.get(`/api/users/${userId}/favorites/${mediaElementId}`)

// }

export const fetchUserFavorites = (userId) => {

    console.log(`fetching favorites...`)

    return axios.get(`/api/favorites/${userId}`)

}