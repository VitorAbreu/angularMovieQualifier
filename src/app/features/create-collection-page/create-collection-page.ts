import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage-service';
import { iCollection } from '../../shared/interfaces/collections-interfaces';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-collection-page',
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule, RouterModule],
  templateUrl: './create-collection-page.html',
  styleUrl: './create-collection-page.scss'
})
export class CreateCollectionPage {
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #collectionStorage = inject(LocalStorageService);
  created = false;
  collectionForm = this.#formBuilder.group({
    collection_name: ['', [Validators.required]],
    collection_description: ['', [Validators.required]]
  });

  createCollection(){
    if(this.collectionForm.valid) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const id = `ID_${timestamp}`;
      const collection: iCollection = {
        id,
        name: this.collectionForm.get('collection_name')!.value!,
        description: this.collectionForm.get('collection_description')!.value!,
        movie_collection: []
      }
      this.#collectionStorage.createCollection(collection);
      this.created = true;

      setTimeout(() => {
        this.#router.navigate(['/collections']);
      }, 1500)
    }
  }
}
