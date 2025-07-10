import { Routes } from '@angular/router';
import { SearchPage } from './core/search-page/search-page';

export const routes: Routes = [
    {
        path: '',
        component: SearchPage,
        children: [
            {
                path: 'details/:id',
                loadComponent: () => import('./features/movie-details-page/movie-details-page').then(mod => mod.MovieDetailsPage),
            },
            {
                path: 'addCollection/:id',
                loadComponent: () => import('./features/add-collection/add-collection').then(mod => mod.AddCollection),
            },
        ]
    },
    {
        path: 'collections',
        loadComponent: () => import('./features/movie-collections-page/movie-collections-page').then(mod => mod.MovieCollectionsPage),
    },
    {
        path: 'create',
        loadComponent: () => import('./features/create-collection-page/create-collection-page').then(mod => mod.CreateCollectionPage),
    },
    {
        path: 'show/:idCollection',
        loadComponent: () => import('./features/show-collection-page/show-collection-page').then(mod => mod.ShowCollectionPage),
        children: [
            {
                path: 'details/:id',
                loadComponent: () => import('./features/movie-details-page/movie-details-page').then(mod => mod.MovieDetailsPage),
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
