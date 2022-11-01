import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { SmallCard } from '../commons/SmallCard'

import { FetchContext } from '../contexts/FetchContext'

export const Grid = () => {

    const { fetch, setFetch } = useContext(FetchContext)    // fetch es un array con las movies/tvshows/persons encontradas en la busqueda

    // console.log("FETCH EN GRID", fetch)

    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    {fetch?.map((mediaElement, i) => {
                        // console.log(mediaElement)
                        return < SmallCard mediaElement={mediaElement} key={mediaElement.id} />

                    })}
                </div>
            </div>

        </>
    )
}
