import { useContext } from "react";
import { v4 as generateID} from 'uuid';
import * as Yup from 'yup';
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage} from "formik";

import MoviesContext from "../../contexts/MoviesContext";
import { Movie, MoviesContextTypes } from "../../types";
import { useNavigate } from "react-router";

const StyledSection = styled.section`
    
`

const AddNewMovie = () => {

    const { dispatch } = useContext(MoviesContext) as MoviesContextTypes;
    const navigate = useNavigate();
    const initialValues: Movie = {
        id: "",
        title: "",
        releaseYear: 0,
        eirinCategory: "",
        length: 0,
        IMDB: {
            totalScore: 0
        },
        photos: {
            poster: [],
            cutscenes: []
        },
        videos: {
            trailers: [],
            cutscenes: []
        },
        genres: [],
        description: "",
        castAndCrew: {
            director: "",
            writers:{
                name: "",
                role: ""
            },
            actors: {
                name: "",
                character: [],
                actorPhoto: ""
            }
        }
    }

    const handleSubmit = (values: Movie) => {
        const newMovie: Movie = {
            ...values,
            id: generateID()
        };
        fetch(`http://localhost:8080/movies`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newMovie),
        })
        dispatch({
            type:'addMovie',
            newMovie: newMovie
        });
        navigate("/");
    }

    const validSchema = Yup.object({
        title: Yup.string()
            .required('Must fill this field')
            .trim(),
        releaseYear: Yup.number()
            .min(1895, 'The movie could not have been made before 1895')
            .max(2025, 'The movie could not be released yet')
            .positive('Year must be a positive number')
            .required('Must fill this field'),
        eirinCategory: Yup.string()
            .oneOf(['G', 'PG', 'PG-13', 'R', 'NC-17'], 'Invalid category')
            .required('Must fill this field')
            .trim(),
        length: Yup.number()
            .typeError('Length must be a number')
            .positive('Movie length must be a positive number')
            .required('Length is required')
            .integer('Length must be a whole number')
            .max(600, 'Length seems too long'),
        IMDB: Yup.object({
            totalScore: Yup.number()
                .typeError('Score must be a number')
                .required('Score is required')
                .min(0, 'Score must be between 0 and 10')
                .max(10, 'Score must be between 0 and 10'),
        }),
        photos: Yup.object({
            posters: Yup.array()
              .of(Yup.string().url('Must be a valid URL'))
              .min(1, 'At least one poster is required'),
            cutscenes: Yup.array()
              .of(Yup.string().url('Must be a valid URL')),
        }).required(),
        videos: Yup.object({
            trailers: Yup.array()
              .of(Yup.string().url('Must be a valid URL'))
              .min(1, 'At least one poster is required'),
            cutscenes: Yup.array()
              .of(Yup.string().url('Must be a valid URL')),
        }).required(),
        genres: Yup.array()
            .of(Yup.string().trim().required('Genre cannot be empty'))
            .min(1, 'Select at least one genre')
            .required('Genres are required'),
        description: Yup.string()
            .min(20, 'Description is too short')
            .max(1000, 'Description is too long')
            .required('Must fill this field')
            .trim(),
        castAndCrew: Yup.object({
            director: Yup.string()
                .required('Director is required')
                .trim(),
            writers: Yup.array().of(
                Yup.object({
                    name: Yup.string()
                      .required('Writer name is required')
                      .trim(),
                    role: Yup.string()
                      .required('Writer role is required')
                      .trim(),
                })
            ).min(1, 'At least one writer is required'),
            actors: Yup.array().of(
                Yup.object({
                    name: Yup.string()
                      .required('Actor name is required')
                      .trim(),
                    character: Yup.array()
                      .of(Yup.string().required('Character name is required').trim())
                      .min(1, 'At least one character is required'),
                    actorPhoto: Yup.string()
                      .url('Must be a valid URL')
                      .required('Actor photo is required'),
                })
            ).min(1, 'At least one actor is required'),
        }),
    })

    return ( 
        <StyledSection>
            <h2>Add new Movie</h2>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validSchema}
            >
                <Form>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <Field 
                            name="title"
                            id="title"
                            placeholder="Type movie title..."
                            type="text" 
                        />
                        <ErrorMessage name="title" component="span" className="error" />
                    </div>  
                </Form>
            </Formik>
        </StyledSection>
     );
}
 
export default AddNewMovie;