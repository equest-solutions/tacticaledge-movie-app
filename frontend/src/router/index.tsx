import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../layouts/BlankLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
   return {
      ...route,
      element: <BlankLayout>{route.element}</BlankLayout>,
   };
});

const router = createBrowserRouter(finalRoutes);

export default router;
