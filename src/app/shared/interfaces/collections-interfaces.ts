import { iMovieDetails } from "./movies-interfaces";

export interface iCollection {
    name: string,
    description: string,
    id: string,
    movie_collection: iMovieDetails[]
}