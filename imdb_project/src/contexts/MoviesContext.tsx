import { createContext, useReducer, useEffect, useContext } from "react";

import { ChildrenProp, Movie, MoviesContextTypes } from "../types";
import { useNavigate } from "react-router";

export type ActionTypes = 
{ type: 'setData', data: Movie[]} |
{ type: 'addMovie', newMovie: Movie } |
{ type: 'deleteMovie', id: Movie['id'] }

const reducer = (state: Movie[], action: ActionTypes) => {
    switch(action.type){
        case 'setData':
            return action.data;
        case 'addMovie':
            return [...state, action.newMovie];
        case 'deleteMovie':
            return state.filter(movie => movie.id !== action.id);
    }
}

const MoviesContext = createContext<undefined | MoviesContextTypes>(undefined);
function useMoviesContext() 
{
    const movies = useContext(MoviesContext);

    if(movies === undefined)
    {
        throw new Error('MoviesContext is undefined');
    }

    return movies;
}

const MoviesProvider = ({ children }: ChildrenProp) => {

    const [movies, dispatch] = useReducer(reducer, []);
    const navigate = useNavigate();

    const addNewMovie = (newMovie: Movie) => {
        fetch(`http://localhost:8080/movies`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newMovie)
        });
        dispatch({
            type:'addMovie',
            newMovie: newMovie
        })
    }

    const deleteOneMovie = (id: Movie['id']) => {
        fetch(`http://localhost:8080/movies/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            dispatch({
                type: 'deleteMovie',
                id: id
            });
            navigate('/');
        })
    }

    const findMovie = (id: Movie['id']): Movie | string => {
        const foundMovie = movies.find(movie => movie.id === id);
        if(foundMovie){
            return foundMovie;
        }else{
            return 'Error: movie not found';
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8080/movies`)
        .then(res => res.json())
        .then((data: Movie[]) => dispatch({
            type:'setData',
            data: data
        }));
    }, []);

    return (

        <MoviesContext.Provider
            value={{
                movies,
                dispatch,
                addNewMovie,
                deleteOneMovie,
                findMovie
            }}
        >
            { children }
        </MoviesContext.Provider>
    )
}

// export { MoviesProvider };
// // export default MoviesContext;
// export default useMoviesContext;

export { MoviesProvider, MoviesContext }; 
export default useMoviesContext;