import { PropsWithChildren, useEffect } from 'react';
import BGVector from '../components/ui/BGVector';
import {useSelector} from 'react-redux';
import { IRootState } from '../store';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children }: PropsWithChildren) => {

   const navigate = useNavigate();
   const authToken = useSelector((state: IRootState) => state.auth.token);

   useEffect(() => {
      if(!authToken) {
         navigate('/login');
      }
   }, [])

   return (
      <main className="min-h-screen bg-dark relative">

         {/* bottom curves vector */}
         <div className="absolute bottom-0 left-0 w-full icon">
            <BGVector />
         </div>
         
         {children}
      </main>
   );
};

export default AppLayout;