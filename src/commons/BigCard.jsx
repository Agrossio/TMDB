import React from 'react'

export const BigCard = ({ mediaElement }) => {
    console.log(mediaElement)

    return (
        <>

            <div className="card mb-3">
                <img src={`https://image.tmdb.org/t/p/original/${mediaElement.backdrop_path}`} className="card-img-top" alt={`${mediaElement.title} Header Image`} />
                <div className="card-body">
                    <h5 className="card-title">{mediaElement.title}</h5>
                    <p className="card-text">{mediaElement.overview}</p>
                    <a href={mediaElement.homepage} className="btn btn-primary" target={"blank"}>{`Official Website`}</a>
                </div>
            </div>

        </>
    )
}

