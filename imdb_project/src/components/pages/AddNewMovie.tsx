import { useContext } from "react";
import { v4 as generateID} from 'uuid';
import * as Yup from 'yup';
import styled from "styled-components";
import { Formik, Form, Field, FieldArray, ErrorMessage} from "formik";

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
            writers:[
            {
                name: "", 
                role: ""
            }
            ],
            actors: [
            {
                name: "", 
                character: [], 
                actorPhoto: ""
            }
            ]
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
            .max(new Date().getFullYear(), 'The movie could not be released yet')
            .positive('Year must be a positive number')
            .integer('Year must be a whole number')
            .required('Must fill this field'),
        eirinCategory: Yup.string()
            .oneOf(['G', 'PG', 'PG-13', 'R', 'NC-17'], 'Invalid category')
            .required('You must select one of the categories')
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
            poster: Yup.array()
              .of(Yup.string()
              .url('Must be a valid URL')
              .required('URL is required')
            )
              .min(1, 'At least one poster is required'),
            cutscenes: Yup.array()
              .of(Yup.string()
              .url('Must be a valid URL')
              .required('URL is required')
            ),
        }),
        videos: Yup.object({
            trailers: Yup.array()
              .of(Yup.string()
              .url('Must be a valid URL')
              .required('URL is required')
            )
              .min(1, 'At least one poster is required'),
            cutscenes: Yup.array()
              .of(Yup.string()
              .url('Must be a valid URL')
              .required('URL is required')
            ),
        }),
        genres: Yup.array()
            .of(Yup.string())
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
                    <div>
                        <label htmlFor="releaseYear">Year:</label>
                        <Field 
                            name="releaseYear"
                            id="releaseYear"
                            placeholder="Enter movie release year..."
                            type="number" 
                        />
                        <ErrorMessage name="releaseYear" component="span" className="error" />
                    </div>   
                    <div>
                        <label htmlFor="eirinCategory">Eirin Category:</label>
                        <Field as="select" name="eirinCategory" id="eirinCategory">
                            <option value="">Select a category</option>
                            <option value="G">G</option>
                            <option value="PG">PG</option>
                            <option value="PG-13">PG-13</option>
                            <option value="R">R</option>
                            <option value="NC-17">NC-17</option>
                        </Field>
                        <ErrorMessage name="eirinCategory" component="span" className="error" />
                    </div>
                    <div>
                        <label htmlFor="length">Length(min):</label>
                        <Field 
                            name="length"
                            id="length"
                            placeholder="Enter movie length in minutes..."
                            type="number" 
                        />
                        <ErrorMessage name="length" component="span" className="error" />
                    </div> 
                    <div>
                        <label htmlFor="IMDB.totalScore">IMDB Score:</label>
                        <Field
                            name="IMDB.totalScore"
                            id="IMDB.totalScore"
                            placeholder="Enter IMDb score..."
                            type="number"
                        />
                        <ErrorMessage name="IMDB.totalScore" component="span" className="error" />
                    </div>
                    <FieldArray name="photos.poster">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Posters:</label>
                            {form.values.photos.poster.map((poster: string, index: number) => (
                                <div key={index}>
                                <Field
                                    name={`photos.poster[${index}]`}
                                    placeholder="Enter poster image URL"
                                />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                                <ErrorMessage name={`photos.poster[${index}]`} component="span" className="error" />
                                </div>
                            ))}
                            <button type="button" onClick={() => push('')}>Add Poster</button>
                            </div>
                        )}
                    </FieldArray>
                    <FieldArray name="photos.cutscenes">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Cutscenes:</label>
                            {form.values.photos.cutscenes.map((scene: string, index: number) => (
                                <div key={index}>
                                <Field
                                    name={`photos.cutscenes[${index}]`}
                                    placeholder="Enter cutscene image URL"
                                />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                                <ErrorMessage name={`photos.cutscenes[${index}]`} component="span" className="error" />
                                </div>
                            ))}
                            <button type="button" onClick={() => push('')}>Add Cutscene</button>
                            </div>
                        )}
                    </FieldArray>
                    <FieldArray name="videos.trailers">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Trailers:</label>
                            {form.values.videos.trailers.map((trailer: string, index: number) => (
                                <div key={index}>
                                <Field
                                    name={`videos.trailers[${index}]`}
                                    placeholder="Enter trailer video URL"
                                />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                                <ErrorMessage name={`videos.trailers[${index}]`} component="span" className="error" />
                                </div>
                            ))}
                            <button type="button" onClick={() => push('')}>Add Trailer</button>
                            </div>
                        )}
                    </FieldArray>
                    <FieldArray name="videos.cutscenes">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Trailer cutscenes:</label>
                            {form.values.videos.cutscenes.map((scene: string, index: number) => (
                                <div key={index}>
                                <Field
                                    name={`videos.cutscenes[${index}]`}
                                    placeholder="Enter trailer cutscene URL"
                                />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                                <ErrorMessage name={`videos.cutscenes[${index}]`} component="span" className="error" />
                                </div>
                            ))}
                            <button type="button" onClick={() => push('')}>Add Cutscene</button>
                            </div>
                        )}
                    </FieldArray>
                    <div>
                        <label htmlFor="genres">Genre:</label>
                        <Field 
                            name="genres"
                            id="genres"
                            placeholder="Select movie genre..."
                            type="text" 
                        />
                        <ErrorMessage name="genres" component="span" className="error" />
                    </div>
                    <div>
                        <label>
                        <Field type="checkbox" name="genres" value="Action" />
                        Action
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Comedy" />
                        Comedy
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Drama" />
                        Drama
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Sci-Fi" />
                        Sci-Fi
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Horror" />
                        Horror
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Fantasy" />
                        Fantasy
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Romance" />
                        Romance
                        </label>
                        <label>
                        <Field type="checkbox" name="genres" value="Crime" />
                        Crime
                        </label>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <Field 
                            as="textarea"
                            name="description"
                            id="description"
                            placeholder="Type movie description..."
                            rows="5" 
                            cols="40"
                        />
                        <ErrorMessage name="description" component="span" className="error" />
                    </div>
                    <div>
                        <label htmlFor="castAndCrew.director">Director:</label>
                        <Field 
                            name="castAndCrew.director"
                            id="castAndCrew.director"
                            placeholder="Type movie director..."
                            type="text" 
                        />
                        <ErrorMessage name="castAndCrew.director" component="span" className="error" />
                    </div>
                    <FieldArray name="castAndCrew.writers">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Writers:</label>
                            {form.values.castAndCrew.writers.map((writer:string, index:number) => (
                                <div key={index}>
                                <Field name={`castAndCrew.writers[${index}].name`} placeholder="Writer name" />
                                <Field name={`castAndCrew.writers[${index}].role`} placeholder="Writer role" />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => push({ name: '', role: '' })}>Add Writer</button>
                            </div>
                        )}
                    </FieldArray>
                    <FieldArray name="castAndCrew.actors">
                        {({ push, remove, form }) => (
                            <div>
                            <label>Actors:</label>
                            {form.values.castAndCrew.actors.map((actor:string, index:number) => (
                                <div key={index}>
                                <Field name={`castAndCrew.actors[${index}].name`} placeholder="Actor name" />
                                <Field name={`castAndCrew.actors[${index}].actorPhoto`} placeholder="Actor photo URL" />

                                <FieldArray name={`castAndCrew.actors[${index}].character`}>
                                    {({ push: pushChar, remove: removeChar, form }) => (
                                    <div>
                                        <label>Characters:</label>
                                        {form.values.castAndCrew.actors[index].character.map((char:string, charIndex:number) => (
                                        <div key={charIndex}>
                                            <Field name={`castAndCrew.actors[${index}].character[${charIndex}]`} placeholder="Character name" />
                                            <button type="button" onClick={() => removeChar(charIndex)}>Remove</button>
                                        </div>
                                        ))}
                                        <button type="button" onClick={() => pushChar('')}>Add Character</button>
                                    </div>
                                    )}
                                </FieldArray>

                                <button type="button" onClick={() => remove(index)}>Remove Actor</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => push({ name: '', character: [''], actorPhoto: '' })}>Add Actor</button>
                            </div>
                        )}
                    </FieldArray>
                <input type="submit" value="Add Movie" className="button"/>
                </Form>
            </Formik>
        </StyledSection>
     );
}
 
export default AddNewMovie;