import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
    director: '',
    title: '',
    metascore: 0
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie)
    useEffect(() => {
        const id = props.match.params.id;
        const movieInArr = props.movies.find(movie => `${movie.id}` === id);
        if (movieInArr) setMovie(movieInArr);
    }, [props.movies, props.match.params.id])



    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                setMovie(initialMovie);
                props.updateMovies(res.data);
                props.history.push('/');
            })
            .catch(err => console.log(err.response));
    };


    return (
        <div className='save-wrapper'>
            <h1>Update Movie Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />
                <button className="md-button form-button">Update</button>
            </form>

        </div>
    )
}

export default UpdateMovie; 