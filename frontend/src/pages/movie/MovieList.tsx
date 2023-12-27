import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import ListFallback from './ListFallback';
import MovieCard from '../../components/ui/MovieCard';
import MoviesHeader from './MoviesHeader';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { AWS_URL, GET_MOVIE_LIST_URL, RES_PER_PAGE } from '../../helper/config';
import ThemeLoadingSpinner from '../../components/ui/loading-indicator/ThemeLoadingSpinner';
import TextPrimary from '../../components/typography/TextPrimary';
import { movieActions } from '../../store/movieSlice';

type PageChangePayload = 'prev' | 'next' | number;

function MovieList() {
   const dispatch = useDispatch();
   const token = useSelector((state: IRootState) => state.auth.token);
   const userId = useSelector((state: IRootState) => state.auth.userId);
   const modified = useSelector((state: IRootState) => state.movie.isModified);
   const [activePage, setActivePage] = useState(1);
   const movieList = useSelector((state: IRootState) => (state.movie?.moviesList ? state.movie?.moviesList[activePage] : null));

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [totalPages, setTotalPages] = useState(1);

   async function getMoviesList() {
      setError(null);
      setIsLoading(true);

      try {
         const start = (activePage - 1) * RES_PER_PAGE + 1;
         const end = activePage * RES_PER_PAGE;
         const url = GET_MOVIE_LIST_URL + `?user_uuid=${userId}&limitStart=${start}&limitEnd=${end}`;

         const response = await fetch(url, {
            method: 'GET',
            headers: {
               token: token!,
            },
         });
         const data = await response.json();
         if (!response.ok) {
            throw new Error('Something went wrong!');
         }
         if (data) {
            dispatch(
               movieActions.setMoviesList({
                  page: activePage,
                  list: data.data.movies,
               })
            );
            const totalPages = Math.ceil(data.data.totalCount / RES_PER_PAGE);
            setTotalPages(totalPages);
         }
      } catch (error: any) {
         setError(error.message);
      }
      setIsLoading(false);
   }

   useEffect(() => {
      if (!movieList || modified) getMoviesList();
      dispatch(movieActions.setActivePage(activePage));
   }, [activePage]);

   function pageChangeHandler(payload: PageChangePayload) {
      if (payload === 'next') {
         setActivePage((prev) => prev + 1);
      } else if (payload === 'prev') {
         setActivePage((prev) => prev - 1);
      } else {
         if (payload === activePage) return;
         setActivePage(payload);
      }
   }

   return (
      <>
         {movieList && movieList.length > 0 ? (
            <div className="container px-6">
               <div className="pt-11 md:pt-12 pb-13">
                  <MoviesHeader />
                  {isLoading ? (
                     <div className="mt-8">
                        <ThemeLoadingSpinner />
                     </div>
                  ) : (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:mt-12 mt-11">
                        {movieList.map((movie: any) => (
                           <MovieCard
                              movieId={movie.uuid}
                              key={movie.uuid}
                              title={movie.title}
                              year={movie.publish_year}
                              img={AWS_URL + movie.image}
                           />
                        ))}
                     </div>
                  )}
                  {error && (
                     <div className="mt-8">
                        <TextPrimary className="text-danger mx-auto mt-5 text-center">{error}</TextPrimary>
                     </div>
                  )}
                  {totalPages > 1 && (
                     <div className="md:mt-12 mt-11">
                        <Pagination totalPages={totalPages} activePage={activePage} onPageChange={pageChangeHandler} />
                     </div>
                  )}
               </div>
            </div>
         ) : isLoading ? (
            <div className="py-12">
               <ThemeLoadingSpinner />
            </div>
         ) : (
            <ListFallback />
         )}
      </>
   );
}
export default MovieList;
