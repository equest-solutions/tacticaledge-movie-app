
import Pagination from '../../components/Pagination';
import Button from '../../components/button/Button';
import ListFallback from './ListFallback';
import MovieCard from '../../components/ui/MovieCard';
import MoviesHeader from './MoviesHeader';

function MovieList() {
   return (
      <>
         <div className="container px-6">
            <div className="pt-11 md:pt-12 pb-13">
               <MoviesHeader />
               <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:mt-12 mt-11'>
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
               <div className='md:mt-12 mt-11'>
                  <Pagination />
               </div>
            </div>
         </div>
         {/* <ListFallback /> */}
      </>
   );
}
export default MovieList;
