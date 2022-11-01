import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import { FavoritesContext } from '../contexts/FavoritesContext'
import { fetchUserFavorites } from '../utils/fetchFavorite'
import { contentFetch } from '../utils/multiSearch'

export const LoginForm = () => {

    const { user, setUser } = useContext(AuthContext)   // importo el estado global de authContext
    const { favorites, setFavorites } = useContext(FavoritesContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
    }

    const handlePasswordChange = (event) => setPassword(event.target.value)

    function handleSubmit(event) {

        event.preventDefault()

        axios.post('/api/users/login', { email, password })
            .then(logedUser => {
                setUser(logedUser.data)

                // TODO ESTO LO TB USO EN APP Y SMALL CARD, TENGO QUE GENERAR UNA FUNCION PARA LLAMARLA DESDE AMBOS COMPONENTES:

                fetchUserFavorites(logedUser.data.id)
                    .then(localFetchedFavorites => {
                        let tmdbFetchedFavorites = []

                        // console.log("FETCH USER FAVORITES", localFetchedFavorites.data)

                        // localFetchedFavoritesData es un arreglo con los mediaIds  y mediaTypes Favoritos:
                        let localFetchedFavoritesData = localFetchedFavorites.data

                        // console.log("localFetchedFavoritesData", localFetchedFavoritesData)

                        Promise.all(localFetchedFavoritesData.map(favorite => {

                            return contentFetch(favorite.mediaType, favorite.mediaId)
                                .then(favContent => {
                                    // console.log("FAV CONTENT", favContent.data)

                                    let obj = { ...favContent.data, "media_type": favorite.mediaType }  // agrego el mediaType que perdi al hacer el axios

                                    tmdbFetchedFavorites.push(obj)
                                })
                        })).then(() => {
                            console.log("TMDB FETCHED FAVORITES", tmdbFetchedFavorites)
                            // setFetch(tmdbFetchedFavorites)
                            setFavorites(tmdbFetchedFavorites)

                        })
                    })
            })
            .then(() => navigate('/'))
            .catch(({ response }) => console.log(response.status, response.statusText));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login to your Account</h2>
                <div className='input-group input-group-lg'>
                    <span className='input-group-text'>Email</span>
                    <input className='form-control' type='email' onChange={handleEmailChange} placeholder='Enter your email' />
                </div>
                <div className='input-group input-group-lg'>
                    <span className='input-group-text'>Password</span>
                    <input className='form-control' type='password' onChange={handlePasswordChange} placeholder='Enter your password' />
                </div>
                <div className='input-group input-group-lg'>
                    <button className='btn btn-outline-primary'>Login</button>
                </div>
            </form>
        </div>
    )
}
