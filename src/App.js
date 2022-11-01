import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Content } from './components/Content'
import { Grid } from './components/Grid'
import { LoginForm } from './components/LoginForm'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'
import { RegisterForm } from './components/RegisterForm'
import { AuthContext } from './contexts/AuthContext'
import { FavoritesContext } from './contexts/FavoritesContext'
import { fetchUserFavorites } from './utils/fetchFavorite'
import { contentFetch } from './utils/multiSearch'

const App = () => {

    const { user, setUser } = useContext(AuthContext)   // importo el estado global de authContext
    const { favorites, setFavorites } = useContext(FavoritesContext)

    useEffect(() => {

        // busco el usuario logueado y lo agrego al estado global user
        // console.log(`fetching user...`)
        axios.get('/api/users/me')
            .then(fetchedUser => {
                setUser(fetchedUser.data)

                console.log("USER", fetchedUser.data)
                // busco los favoritos y los agrego al estado global favorites:

                // TODO ESTO LO TB USO EN APP Y SMALL CARD, TENGO QUE GENERAR UNA FUNCION PARA LLAMARLA DESDE AMBOS COMPONENTES:
                fetchUserFavorites(fetchedUser.data.id)
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
    }, [])

    return (
        <>
            <div >
                <Navbar />
            </div>
            <div>
                <div>¡Welcome to The Movie Database!</div>
            </div>
            <Routes>
                <Route path='/' element={<Grid />} />
                <Route path='/:mediaType/:id' element={<Content />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </>
    )
}

export default App
