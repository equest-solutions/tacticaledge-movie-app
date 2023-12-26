
import Pagination from '../../components/Pagination';
import Button from '../../components/button/Button';
import ListFallback from './ListFallback';
import MovieCard from '../../components/ui/MovieCard';
import MoviesHeader from './MoviesHeader';

function MovieList() {
   return (
      <>
         <div className="container px-6">
            <div className="pt-12 pb-13">
               <MoviesHeader />
               <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'>
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
               </div>
               <div className='mt-12'>
                  <Pagination />
               </div>
            </div>
         </div>
         <ListFallback />
      </>
   );
}
export default MovieList;
