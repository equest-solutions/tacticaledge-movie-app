import { PropsWithChildren } from 'react';
import BGVector from '../components/ui/BGVector';

const AppLayout = ({ children }: PropsWithChildren) => {
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
