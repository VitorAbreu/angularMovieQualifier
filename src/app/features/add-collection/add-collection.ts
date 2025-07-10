import { Component, inject } from '@angular/core';
import { iMovieDetails } from '../../shared/interfaces/movies-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchMovieService } from '../../shared/services/search-movie/search-movie-service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage-service';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-add-collection',
  imports: [NzModalModule, NzListModule],
  templateUrl: './add-collection.html',
  styleUrl: './add-collection.scss'
})
export class AddCollection {
  #activatedRoute = inject(ActivatedRoute);
  #route = inject(Router);
  #movieService = inject(SearchMovieService);
  collectionStorage = inject(LocalStorageService);
  isVisible = true;
  movieDetails!: iMovieDetails
  movie_id!: number;
  submitted: boolean = false;

  ngOnInit(): void {
    this.movie_id = Number(this.#activatedRoute.snapshot.paramMap.get('id'))
    this.#movieService.getMovieDetails(this.movie_id).subscribe({
      next: (data: iMovieDetails) => {
        this.movieDetails = data;
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
    this.#route.navigate(['']);
  }

  saveOnCollection(movieDetails: iMovieDetails, id: string) {
    this.collectionStorage.addMovieToCollection(movieDetails, id);
    this.submitted = true;
    setTimeout(() => {
      this.#route.navigate(['']);
    }, 1500);
  }
}
