import { RouterProvider } from 'react-router-dom';
import router from './router/index';

function App() {
   return (
      <div className="relative">
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
