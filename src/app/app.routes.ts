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
        ]
    },
    {
        path: 'collections',
        loadComponent: () => import('./features/movie-collections-page/movie-collections-page').then(mod => mod.MovieCollectionsPage),
    },
    {
        path: '**',
        redirectTo: ''
    }
];
