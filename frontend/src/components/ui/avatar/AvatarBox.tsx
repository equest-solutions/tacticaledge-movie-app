import { PropsWithChildren, memo } from 'react';
import { AvatarProps } from '../../../typescript/interfaces/global';

const AvatarBox = memo(function ({
   img,
   title,
   desc,
   className,
   imgSize,
   titleClass,
   descClass,
}: PropsWithChildren<AvatarProps>) {
   const imgSizeClass = {
      sm: 'w-9.5 h-9.5',
      md: 'w-10 h-10',
      lg: 'w-11 h-11',
   };

   return (
      <div className={`flex items-center space-x-5 ${className}`}>
         <div className={`w-10 h-10 ${imgSize && imgSizeClass[imgSize]}`}>
            <img className='object-cover w-full' src={img} alt="avatar" />
         </div>
         <div className="truncate space-y-2">
            <h4 className={`text-sm ${titleClass}`}>{title}</h4>
            {desc && <p className={`text-[11px] ${descClass}`}>{desc}</p>}
         </div>
      </div>
   );
});
export default AvatarBox;
