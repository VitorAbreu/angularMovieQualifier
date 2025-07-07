import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [
    {
        path: '/:id',
        loadChildren: () => import('./movie-details-page/movie-details-page').then(mod => mod.MovieDetailsPage),
    },
    {
        path: 'collections',
        loadChildren: () => import('./movie-collections-page/movie-collections-page').then(mod => mod.MovieCollectionsPage),
    }
];
