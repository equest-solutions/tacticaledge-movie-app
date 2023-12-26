import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import MovieList from "./views/MovieList";
import AddMovie from "./views/AddMovie";
import EditMovie from "./views/EditMovie";
import Login from "./views/Login";
import DefaultLayout from "./views/Layout/DefaultLayout";
import "./assets/css/custom.css"

function App() {
  
  const UserData = useSelector((state) => state.data);
  const authToken = UserData.auth_token;


  const appRoute = () => (<>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/movies" element={<MovieList/>} />
      <Route path="/movie/add" element={<AddMovie/>} />
      <Route path="/movie/edit/:id" element={<EditMovie/>} />
  </>)

  const authRoute = () => (<>
    <Route path="*" element={<Navigate to="/" replace />} />
    <Route path="/" element={<DefaultLayout PageComponent={Login} />}/>
  
  </>)

  return (
    <div>
      <Router>
        <Routes>
          {authToken ? appRoute() : authRoute()}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
