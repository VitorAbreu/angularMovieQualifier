import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SearchMovieService } from '../../shared/services/search-movie/search-movie-service';
import { iMovieDetails } from '../../shared/interfaces/movies-interfaces';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-movie-details-page',
  imports: [NzModalModule, NzLayoutModule, CommonModule, ReactiveFormsModule, NzInputModule, NzButtonModule],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss'
})
export class MovieDetailsPage implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #movieService = inject(SearchMovieService);
  isVisible = true;
  movieDetails!: iMovieDetails
  movie_id!: number;
  private formBuilder = inject(FormBuilder);
  rateForm = this.formBuilder.group({
    rateValue: ['', [Validators.maxLength(2), Validators.min(0), Validators.max(10), Validators.pattern(/^[0-9]*$/), Validators.required]]
  });
  isConfirmLoading: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.movie_id = Number(this.#activatedRoute.snapshot.paramMap.get('id'));

    this.#movieService.getMovieDetails(this.movie_id).subscribe({
      next: (data: iMovieDetails) => {
        this.movieDetails = data;
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
    this.#router.navigate(['../../'], { relativeTo: this.#activatedRoute });
  }

  sendRating() {
    if(this.rateForm.valid) {
      this.isConfirmLoading = true;
      this.#movieService.addRating(this.movie_id, Number(this.rateForm.value.rateValue)).subscribe({
        next: () => {
          this.isConfirmLoading = false;
          this.submitted = true;
        }
      })
    }
  }
}
