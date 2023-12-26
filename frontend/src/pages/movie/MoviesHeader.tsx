import { NavLink } from 'react-router-dom';
import LogoutIcon from '../../components/icon/LogoutIcon';
import PlusIcon from '../../components/icon/PlusIcon';
import HeadingMedium from '../../components/typography/HeadingMedium';
import TextPrimary from '../../components/typography/TextPrimary';

function MoviesHeader() {
   return (
      <div className="flex items-center justify-between">
         <div className="flex space-x-4 items-center">
            <HeadingMedium>My movies</HeadingMedium>
            <NavLink to='add' className="w-6 md:w-7 icon">
               <PlusIcon />
            </NavLink>
         </div>
         <button className="flex space-x-4 items-center">
            <TextPrimary className="font-bold hidden md:block">Logout</TextPrimary>
            <div className="w-6 md:w-7 icon">
               <LogoutIcon />
            </div>
         </button>
      </div>
   );
}
export default MoviesHeader;
