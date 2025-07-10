import { Injectable, signal } from '@angular/core';
import { iCollection } from '../../interfaces/collections-interfaces';
import { eLIST } from '../../enum/list-enum';
import { iMovieDetails } from '../../interfaces/movies-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  #setListItems = signal<iCollection[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    let list = localStorage.getItem(eLIST.COLLECTION_LIST);
    list = list !== 'undefined' && list ? list : '[]'
    return JSON.parse(list);
  }

  createCollection(collection: iCollection) {
    localStorage.setItem(
      eLIST.COLLECTION_LIST,
      JSON.stringify([...this.#setListItems(), collection])
    );
    return this.#setListItems.set(this.#parseItems());
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      eLIST.COLLECTION_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  deleteAllCollections() {
    localStorage.removeItem(eLIST.COLLECTION_LIST);
    return this.#setListItems.set(this.#parseItems());
  }

  addMovieToCollection(movie: iMovieDetails, collection_id: string) {
    this.#setListItems.update((oldValue: iCollection[]) => {
      oldValue.filter((item) => {
        if (item.id === collection_id) {
          if(!Boolean(item.movie_collection.filter(movies => movies.id === movie.id).length)) {
            item.movie_collection.push(movie);
          }
        }
        return item;
      });

      return oldValue;
    });

    this.#updateLocalStorage();
  }

  deleteMovieFromCollection(collection_id: string, movie_id: number) {
    this.#setListItems.update((oldValue: iCollection[]) => {
      oldValue.filter((item) => {
        if (item.id === collection_id) {
          item.movie_collection = item.movie_collection.filter(movies => movies.id !== movie_id);
        }
        return item;
      });

      return oldValue;
    });

    this.#updateLocalStorage();
  }

  deleteCollection(id: string) {
    this.#setListItems.update((oldValue: iCollection[]) => {
      return oldValue.filter((item) => item.id !== id);
    });
    this.#updateLocalStorage();
  }
}
