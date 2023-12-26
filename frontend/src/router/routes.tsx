import { lazy } from 'react';
import { Route } from '../typescript/interfaces/global';
import { Navigate } from 'react-router-dom';
import AddMovie from '../pages/movie/AddMovie';

const Login = lazy(() => import('../pages/auth/Login'));
const MovieList = lazy(() => import('../pages/movie/MovieList'));

const routes: Route[] = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/movies',
        element: <MovieList />,
    },
    {
        path: '/movies/add',
        element: <AddMovie />,
    },
    {
        path: '/movies/edit/:movieId',
        element: <AddMovie />,
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }

];

export { routes };
