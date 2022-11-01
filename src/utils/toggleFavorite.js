import axios from "axios"

export const toggleFavorite = (isFavorite, userId, mediaElementId, mediaType) => {

    console.log("IS FAVORITE", isFavorite)
    console.log("MEDIA ELEMENT ID", mediaElementId)
    console.log("USER ID", userId)

    return axios.post(`/api/users/${userId}/favorites/${mediaElementId}/${isFavorite}`, { isFavorite, userId, mediaElementId, mediaType })


}