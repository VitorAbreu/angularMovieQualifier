import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iApiResult, iMovieDetails, iSession } from '../../interfaces/movies-interfaces';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService {

  #http = inject(HttpClient);
  #apiKey = '908cb6703ecdfb1b42b6ea66dccd6fd6';
  #url = 'https://api.themoviedb.org/3';
  #guestSession: iSession | undefined;

  searchMovie(movie: string, page: number = 1): Observable<iApiResult> {
    return this.#http.get<iApiResult>(
      `${this.#url}/search/movie?include_adult=false&query=${movie}&api_key=${this.#apiKey}&language=en-US&page=${page}`
    );
  }

  getMovies(page: number = 1): Observable<iApiResult> {
    return this.#http.get<iApiResult>(
      `${this.#url}/movie/popular?include_adult=false&api_key=${this.#apiKey}&language=en-US&page=${page}`
    );
  }

  getMovieDetails(movie_id: number): Observable<iMovieDetails> {
    return this.#http.get<iMovieDetails>(
      `${this.#url}/movie/${movie_id}?api_key=${this.#apiKey}`
    );
  }

  createGuestSession(): Observable<iSession> {
    if(this.#guestSession) {
      return of(this.#guestSession);
    }
    return this.#http.get<iSession>(
      `${this.#url}/authentication/guest_session/new?api_key=${this.#apiKey}`
    ).pipe(tap((data: iSession) => this.#guestSession = data));
  }

  addRating(movie_id: number, rating: number) {
    return this.#http.post(
      `${this.#url}/movie/${movie_id}/rating?api_key=${this.#apiKey}&guest_session_id=${this.#guestSession?.guest_session_id}`, 
      {
        value: rating
      }
    )
  }
}
