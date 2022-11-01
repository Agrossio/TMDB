import React from 'react'

export const EmptyButton = ({ children, onClick }) => {
    return (
        <button type='button' className='btn btn-info' onClick={onClick}>{children}</ button>
    )
}

export const RoundButton = ({ children, onClick }) => {
    return (
        <button type='button' className='btn btn-secondary' onClick={onClick}>{children}</button>
    )
}
