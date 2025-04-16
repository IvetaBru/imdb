import { ActionTypes } from "./contexts/MoviesContext"
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  passwordText: string;
  profilePicture?: string;
  role: 'customer' | 'admin';
  joined: string;
};
export type ChildrenProp = {
  children: React.ReactElement
}
export type UsersReducerActionTypes = 
{ type: 'setUsers', data: User[]} |
{ type: 'addUser', newUser: User } |
{ type: 'deleteUser', id: User['id'] }

export type UsersContextTypes = {
  loggedInUser: User | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
  users: User[],
  dispatch: React.ActionDispatch<[UsersReducerActionTypes]>
}
export interface LoginValues {
  email: string;
  password: string;
  stayLoggedIn: boolean;
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
  deleteOneMovie: (id: Movie["id"]) => void,
  findMovie: (id: Movie["id"]) => Movie | string
}

export type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};