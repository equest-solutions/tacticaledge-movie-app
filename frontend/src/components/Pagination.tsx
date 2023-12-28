import { PropsWithChildren, MouseEventHandler } from 'react';
import Button from './button/Button';
import ButtonDark from './button/ButtonDark';

interface PaginationProps {
   totalPages: number;
   activePage: number;
   onPageChange: any;
}

function Pagination({ totalPages, activePage, onPageChange }: PropsWithChildren<PaginationProps>) {
   return (
      <div className="flex items-center justify-center space-x-5">
         <button disabled={activePage === 1} onClick={() => onPageChange('prev')} className="font-bold disabled:opacity-80">
            Prev
         </button>
         <div className="flex space-x-3">
            {Array.from(Array(totalPages).keys()).map((n, idx) => {
               const num = n + 1;
               if (num === activePage)
                  return (
                     <Button onClick={() => onPageChange(num)} key={idx} className="w-7 h-7 p-0">
                        {num}
                     </Button>
                  );
               else
                  return (
                     <ButtonDark onClick={() => onPageChange(num)} key={idx} className="w-7 h-7 p-0">
                        {num}
                     </ButtonDark>
                  );
            })}
         </div>
         <button
            disabled={activePage === totalPages}
            onClick={() => onPageChange('next')}
            className="font-bold disabled:opacity-80"
         >
            Next
         </button>
      </div>
   );
}
export default Pagination;
