import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { EmptyButton, RoundButton } from '../commons/Buttons'
import { multiSearch } from '../utils/multiSearch';

import { AuthContext } from '../contexts/AuthContext';
import { FetchContext } from '../contexts/FetchContext';

export const Navbar = () => {
    const navigate = useNavigate()

    const authContext = useContext(AuthContext)     // uso el estado global de AuthContext
    const user = authContext.user
    const setUser = authContext.setUser

    const fetchContext = useContext(FetchContext)   // uso el estado global de FetchContext
    const fetch = fetchContext.fetch
    const setFetch = fetchContext.setFetch


    // console.log("USER", user)
    // console.log("AUTHCONTEXT", authContext)

    const handleLogout = () => {

        axios.post('/api/users/logout')
            .then(() => {
                setUser({})
                setFetch([])
            })
            .catch(({ response }) => {
                console.log(response.status, response.statusText);
            });
    }

    const [navBarSearchInput, setNavBarSearchInput] = useState('')

    const handleSearchInput = (e) => setNavBarSearchInput(e.target.value)

    const handleSearchForm = (e) => {
        e.preventDefault()
        console.log(navBarSearchInput)
        multiSearch(navBarSearchInput)
            .then(searchResults => {
                setFetch(searchResults)
                // console.log(fetch)
                navigate('/')
            })
    }

    return (
        <>
            <Link to='/'>
                <img id='navLogo' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Data Base Logo" />
            </Link>
            <form className='form-floating mb-3' onSubmit={handleSearchForm}>
                <input type='search' className='form-control' id='floating-search-input' onChange={handleSearchInput} placeholder='Search Movies, TV Shows or People' />
                <label htmlFor='floating-search-input'>Search Movies, TV Shows or People</label>
            </form>

            {
                user.email ? (
                    <>
                        <Link to='/profile'>
                            <EmptyButton>{user.name}</EmptyButton>
                        </Link>
                        <Link to='/'>
                            <RoundButton onClick={handleLogout}>Logout</RoundButton>
                        </Link>
                    </>) : (
                    <>
                        <Link to='/login'>
                            <EmptyButton>Login</EmptyButton>
                        </Link>
                        <Link to='/register'>
                            <RoundButton>Register</RoundButton>
                        </Link>

                    </>)
            }
        </>
    )
}
