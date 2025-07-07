import { Component, inject, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-movie-card',
  imports: [NzCardModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  title = input.required<string>();
  rating = input.required<number>();
  poster_path = input.required<string>();
}
