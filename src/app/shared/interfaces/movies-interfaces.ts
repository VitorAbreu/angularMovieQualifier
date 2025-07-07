export interface iApiResult {
  page: number
  results: iMovieResult[]
  total_pages: number
  total_results: number
}

export interface iMovieResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface iMovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: any[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: any[]
  production_countries: any[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: iSpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface iSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface iSession {
  expires_at: string
  guest_session_id: string
  success: boolean
}
