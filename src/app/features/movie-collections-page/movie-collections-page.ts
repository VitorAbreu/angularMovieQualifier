import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzListModule } from 'ng-zorro-antd/list';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage-service';
import { RouterModule } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-movie-collections-page',
  imports: [NzListModule, NzButtonModule, NzFlexModule, RouterModule, NzModalModule],
  templateUrl: './movie-collections-page.html',
  styleUrl: './movie-collections-page.scss'
})
export class MovieCollectionsPage {
  collectionStorage = inject(LocalStorageService);
  #modal = inject(NzModalService);

  deleteAllCollections() {
    this.#modal.confirm({
      nzTitle: 'are you sure you want to delete all collections?',
      nzContent: '<b>If you accept all the information will be lost forever</b>',
      nzOkText: "Yes, I'm sure",
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.collectionStorage.deleteAllCollections(),
      nzCancelText: 'No',
    });
  }

  deleteSingleCollection(id: string) {
    this.#modal.confirm({
      nzTitle: 'are you sure you want to delete this collection?',
      nzContent: '<b>If you accept all the information will be lost forever</b>',
      nzOkText: "Yes, I'm sure",
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.collectionStorage.deleteCollection(id),
      nzCancelText: 'No',
    });
  }
}
