import { PropsWithChildren } from 'react';
import TextLarge from '../typography/TextLarge';
import TextSmall from '../typography/TextSmall';
import { Movie } from '../../typescript/interfaces/global';
import TextPrimary from '../typography/TextPrimary';
import { useNavigate } from 'react-router-dom';

function MovieCard({ img, title, year, movieId }: PropsWithChildren<Movie>) {
   const navigate = useNavigate();

   function redirectHandler() {
      navigate('/movies/edit/' + movieId);
   }

   return (
      <div
         onClick={redirectHandler}
         className="rounded-xl bg-dark-100 p-3 pb-5 transition-all duration-200 card relative overflow-hidden group"
      >
         <div className="absolute p-6 min-h-[120px] flex items-center justify-center transition duration-300 -translate-y-full group-hover:translate-y-0 w-full bg-black-100/80 top-0 left-0">
            <TextLarge className="text-center">Edit</TextLarge>
         </div>
         <div className="overflow-hidden rounded-xl card-image mb-5">
            <img className="w-full max-w-full" src={img} alt={title} />
         </div>
         <div className="px-3">
            <TextLarge className="mb-3">{title}</TextLarge>
            <TextSmall>{year}</TextSmall>
         </div>
      </div>
   );
}
export default MovieCard;
