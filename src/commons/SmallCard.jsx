import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { FavoritesContext } from '../contexts/FavoritesContext'
import { FetchContext } from '../contexts/FetchContext'
import { fetchUserFavorites } from '../utils/fetchFavorite'
import { contentFetch } from '../utils/multiSearch'
import { toggleFavorite } from '../utils/toggleFavorite'

export const SmallCard = ({ mediaElement }) => {

    const { user, setUser } = useContext(AuthContext)
    const { fetch, setFetch } = useContext(FetchContext)    // fetch es un array con las movies/tvshows/persons encontradas en la busqueda
    const { favorites, setFavorites } = useContext(FavoritesContext)

    const [isFavorite2, setisFavorite2] = useState(false)

    const activate = (mediaElement, arreglo) => {

        arreglo.forEach(element => {
            if (element.title === mediaElement.title) {
                setisFavorite2(true)
            }
        })
    }

    useEffect(() => {
        activate(mediaElement, favorites)
    }, [])

    const DetailsButton = () => mediaElement.media_type === "tv" ? <a href={`/${mediaElement.media_type}/${mediaElement.id}`} className="btn btn-primary">{`See ${mediaElement.media_type} show details`}</a> : <a href={`/${mediaElement.media_type}/${mediaElement.id}`} className="btn btn-primary">{`See ${mediaElement.media_type} details`}</a>

    const handleFavorite = (e) => {

        const isFavorite = e.target.checked
        toggleFavorite(!isFavorite, user.id, mediaElement.id, mediaElement.media_type)
            .then(res => {
                console.log("PRUEBA", res.data)
                e.target.checked = res.data

                // TODO ESTO LO TB USO EN APP Y SMALL CARD, TENGO QUE GENERAR UNA FUNCION PARA LLAMARLA DESDE AMBOS COMPONENTES:
                fetchUserFavorites(user.id)
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
                            setFavorites(tmdbFetchedFavorites)
                            //setFetch(tmdbFetchedFavorites)

                        })

                    })


            })
    }


    return (
        <>
            <div className="col-3">
                <div className="card h-100" style={{ width: "18rem" }}>
                    <img src={mediaElement.poster_path ? `https://image.tmdb.org/t/p/original/${mediaElement.poster_path}` : `https://i.imgur.com/M1wbKOT.jpg`} className="card-img-top" alt="Media Poster" />
                    <div className="card-body">
                        <h5 className="card-title">{mediaElement.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{`Released: ${mediaElement.release_date}`}</h6>
                        <p className="card-text">{mediaElement.overview}</p>
                        {<DetailsButton />}
                        <div className="form-check form-switch">
                            {(isFavorite2 === true) ? <input checked className="form-check-input" type="checkbox" role="switch" id={`favoritesSwitchCheck${mediaElement.id}`} onClick={handleFavorite} /> : <input className="form-check-input" type="checkbox" role="switch" id={`favoritesSwitchCheck${mediaElement.id}`} onClick={handleFavorite} />}
                            <label className="form-check-label" htmlFor={`favoritesSwitchCheck${mediaElement.id}`}>Favorite</label>
                        </div>
                        {/* <button className="btn btn-outline-secondary" onClick={handleFavourite}>Add to favorites</button> */}
                    </div>
                    <div className="card-footer">
                        <small className="text-muted p-2">{`Rating: ${mediaElement.vote_average}`}</small>
                        <small className="text-muted p-2">{`Popularity: ${mediaElement.popularity}`}</small>
                    </div>
                </div>
            </div>

        </>
    )
}