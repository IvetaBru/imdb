import { ActionTypes } from "./contexts/MoviesContext"

export type ChildrenProp = {
    children: React.ReactElement
}

type IMDBRating = {
    score: number,
    votes: number
}

type IMDBData = {
    totalScore: number,
    userRatings?: IMDBRating[]
}

type MoviePopularity = {
    ranking: number,
    weeklyChange: number
}

type MoviePhotos = {
    poster: string[],
    cutscenes: string[]
}

type MovieVideos = {
    trailers: string[],
    cutscenes: string[]
}

type MovieWriter = {
    name: string,
    role: string
}

type MovieActor = {
    name: string,
    character: string[],
    actorPhoto: string
}

type CastAndCrew = {
    director: string,
    writers: MovieWriter[],
    actors: MovieActor[]
}

type MovieReviews = {
    users: number,
    critics: number,
    metascore: number
}

export type Movie = {
    id: string,
    title: string,
    releaseYear: number,
    eirinCategory: string,
    length: number,
    IMDB: IMDBData,
    popularity?: MoviePopularity,
    photos: MoviePhotos,
    videos: MovieVideos,
    genres: string[],
    description: string,
    castAndCrew: CastAndCrew,
    reviews?: MovieReviews
}

export type MoviesContextTypes = {
    movies: Movie[],
    dispatch: React.ActionDispatch<[action: ActionTypes]>
    addNewMovie: (newMovie: Movie) => void,
    findProduct: (id: Movie["id"]) => Movie | string
}