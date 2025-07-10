import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { InputMovieDirective } from '../../shared/directives/inputMovie/input-movie-directive';
import { SearchMovieService } from '../../shared/services/search-movie/search-movie-service';
import { iApiResult, iMovieResult } from '../../shared/interfaces/movies-interfaces';
import { map, tap } from 'rxjs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-page',
  imports: [
    RouterModule,
    NzInputModule,
    InputMovieDirective,
    FormsModule,
    NzPaginationModule,
    NzFlexModule,
    NzGridModule,
    MovieCard,
    NzIconModule,
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {
  
  #movieService = inject(SearchMovieService);
  #router = inject(Router);
  listMovies: iMovieResult[] = [];
  limitOfData = 100;
  totalOfResults: number = 0;
  pageIndex: number = 1;

  ngOnInit(): void {
    this.getMovies();
    this.#movieService.createGuestSession().subscribe();
  }

  searchMovie(form: NgForm, page: number = 1) {
    this.pageIndex = page;
    if(form.valid) {
      const value = form.value.movie;
      if(value) {
        this.#movieService.searchMovie(value, page).pipe(
          tap((data: iApiResult) => {
            this.totalOfResults = data.total_results > this.limitOfData ? this.limitOfData : data.total_results;
          }),
          map((data: iApiResult) => data.results)
        ).subscribe({
          next: data => {
            this.listMovies = data;
          }
        })
      } else {
        this.getMovies(page);
      }
    }
  }

  getMovies(page: number = 1) {
    this.#movieService.getMovies(page).pipe(
      tap((data: iApiResult) => {
        this.totalOfResults = data.total_results > this.limitOfData ? this.limitOfData : data.total_results;
      }),
      map((data: iApiResult) => data.results)
    ).subscribe(
      {
        next: data => {
          this.listMovies = data;
        }
      }
    )
  }

  redirectToMovieDetails(id: number) {
    this.#router.navigate(['details', id]);
  }
}
