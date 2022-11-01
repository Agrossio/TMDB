import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BigCard } from '../commons/BigCard'

import { contentFetch } from '../utils/multiSearch'

export const Content = () => {

    const { mediaType, id } = useParams()
    const [content, setContent] = useState({})

    useEffect(() => {                   // sin el use effect queda en un loop infinito seteando el content (no se porque)

        contentFetch(mediaType, id)
            .then(mediaElement => {
                setContent(mediaElement.data)
            })
    }, [])

    console.log(content)


    return (
        <BigCard mediaElement={content} />
    )
}
