import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
   return {
      ...route,
      element: <AppLayout>{route.element}</AppLayout>,
   };
});

const router = createBrowserRouter(finalRoutes);

export default router;
