import { Component, inject, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-movie-card',
  imports: [NzCardModule, NzIconModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  title = input.required<string>();
  rating = input.required<number>();
  poster_path = input.required<string>();
  icon = input.required<string>();
  id = input.required<number>();
  #router = inject(Router);
  deleteEmitter = output<number>();

  openCollectionModal($event: Event) {
    $event.stopPropagation();
    if(this.icon() === 'heart') {
      this.#router.navigate(['/addCollection', this.id()]);
    } else {
      this.deleteEmitter.emit(this.id());
    }
  }
}
