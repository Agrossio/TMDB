import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'

export const RegisterForm = () => {

    const { user, setUser } = useContext(AuthContext)   // importo el estado global de authContext
    const navigate = useNavigate()

    // al inicializar los estados como strings vacios no funciona la validacion de notNull porque esta tomando los datos como '' y no como falsy
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleEmailChange = (event) => {
        const value = event.target.value
        setEmail(value)
    }
    // lo mismo refactorizando:
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleNameChange = (event) => setName(event.target.value)
    const handleLastNameChange = (event) => setLastName(event.target.value)


    //  console.log(email, password, name, lastName)

    function handleSubmit(event) {
        event.preventDefault()

        axios.post('/api/users/register', { email, password, name, lastName })  // pido crear el user
            .then(() => axios.post('/api/users/login', { email, password }))    // cuando termino de crear el user, lo logueo
            .then(res => setUser(res.data))
            .then(() => navigate('/'))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create your Account</h2>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Email</span>
                    <input className='form-control' type='email' onChange={handleEmailChange} value={email} placeholder='Enter your email' />
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Password</span>
                    <input className='form-control' type='password' onChange={handlePasswordChange} placeholder='Enter your password' />
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Name</span>
                    <input className='form-control' type='text' onChange={handleNameChange} placeholder='Enter your name' />
                </div>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Last Name</span>
                    <input className='form-control' type='text' onChange={handleLastNameChange} placeholder='Enter your last name' />
                </div>
                <div className='input-group mb-3'>
                    <button className='btn btn-outline-primary'>Register!</button>
                </div>
            </form>
        </div>
    )
}
