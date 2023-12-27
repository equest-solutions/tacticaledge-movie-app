import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '../../components/icon/LogoutIcon';
import PlusIcon from '../../components/icon/PlusIcon';
import HeadingMedium from '../../components/typography/HeadingMedium';
import TextPrimary from '../../components/typography/TextPrimary';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';

function MoviesHeader() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   function logoutHandler() {
      dispatch(authActions.logoutUser());
      navigate('/');
   }

   return (
      <div className="flex items-center justify-between">
         <div className="flex space-x-4 items-center">
            <HeadingMedium>My movies</HeadingMedium>
            <NavLink to='add' className="w-6 md:w-7 icon">
               <PlusIcon />
            </NavLink>
         </div>
         <button onClick={logoutHandler} className="flex space-x-4 items-center">
            <TextPrimary className="font-bold hidden md:block">Logout</TextPrimary>
            <div className="w-6 md:w-7 icon">
               <LogoutIcon />
            </div>
         </button>
      </div>
   );
}
export default MoviesHeader;
