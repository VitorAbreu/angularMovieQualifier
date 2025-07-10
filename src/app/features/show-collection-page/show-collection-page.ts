import { Component, inject, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage-service';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { iCollection } from '../../shared/interfaces/collections-interfaces';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-show-collection-page',
  imports: [NzGridModule, NzFlexModule, MovieCard, NzPaginationModule, RouterModule, NzListModule, NzModalModule],
  templateUrl: './show-collection-page.html',
  styleUrl: './show-collection-page.scss'
})
export class ShowCollectionPage implements OnInit {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #list_id = this.#activatedRoute.snapshot.paramMap.get('idCollection');
  #storageService = inject(LocalStorageService);
  #modal = inject(NzModalService);
  listMovies!: iCollection;

  ngOnInit(): void {
    this.listMovies = this.#storageService.getListItems().filter(list => list.id === this.#list_id)[0];
  }

  redirectToMovieDetails(id: number) {
    this.#router.navigate(['details', id], {
      relativeTo: this.#activatedRoute
    });
  }

  deleteMovieFromCollection(id: number) {
    this.#modal.confirm({
      nzTitle: 'are you sure you want to delete this collection?',
      nzContent: '<b>If you accept all the information will be lost forever</b>',
      nzOkText: "Yes, I'm sure",
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.#storageService.deleteMovieFromCollection(this.listMovies.id, id),
      nzCancelText: 'No',
    });
  }
}
