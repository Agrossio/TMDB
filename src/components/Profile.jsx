import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { FetchContext } from '../contexts/FetchContext'
import { FavoritesContext } from '../contexts/FavoritesContext'

import { Grid } from './Grid'

export const Profile = () => {

    //ESTADOS GLOBALES:
    const { user, setUser } = useContext(AuthContext)
    const { fetch, setFetch } = useContext(FetchContext)    // fetch es un array con las movies/tvshows/persons encontradas en la busqueda
    const { favorites, setFavorites } = useContext(FavoritesContext)

    useEffect(() => {

        setFetch(favorites)

    }, [])

    const Favorites = () => fetch.length === 0 ? <p>Grab some favorites to see them here..</p> : <Grid />


    return (
        <>
            <h1>Welcome back {user.name}!</h1>
            <p>Your email is: <span>{user.email}</span></p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWapGqqlKlSq6uFMMhnksciy5cC_CIUiXqfQ&usqp=CAU" alt={`Welcome Back ${user.name} Image`} />
            <p>Here are your Favorites:</p>
            {<Favorites />}
        </>
    )
}


/* EJEMPLOS GABI:
 
useEffect(() => {
if (user.id) {
  let { favorite_movie } = user;
  setMovies([]);
  let movieArray = [];
  Promise.all(
    favorite_movie.map((item) =>
      axios
        .get(http://localhost:5000/api/media/request/movie/${item})
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          movieArray.push(data);
        })
    )
  ).then(() => {
    setMovies(movieArray);
    setFetchingMovies(false);
  });
}
}, [user]);

--------------------

useEffect(() => {
let { favorite_movie } = user;
setMovies([]);
favorite_movie.forEach((item) =>
  axios
    .get(http://localhost:5000/api/media/request/movie/${item})
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      setMovies((previous) => {
        return [...previous, data];
      });
    })
);
}, []);
 
 
 
*/