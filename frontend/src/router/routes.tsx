import { lazy } from 'react';
import { Route } from '../typescript/interfaces/router';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/auth/Login'));

const routes: Route[] = [
    {
        path: '/',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }

];

export { routes };
