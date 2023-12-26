import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/tailwind.css';
import './assets/css/custom.css';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Suspense>
         <Provider store={store}>
            <App />
         </Provider>
      </Suspense>
   </React.StrictMode>
);
