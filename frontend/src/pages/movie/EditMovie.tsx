import { useParams } from 'react-router-dom';
import HeadingMedium from '../../components/typography/HeadingMedium';
import MovieForm from './MovieForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EDIT_MOVIE_URL } from '../../helper/config';
import { IRootState } from '../../store';
import ThemeLoadingSpinner from '../../components/ui/loading-indicator/ThemeLoadingSpinner';
import TextPrimary from '../../components/typography/TextPrimary';
import { Movie } from '../../typescript/interfaces/global';

function EditMovie() {
   const params = useParams();
   const movieId = params.movieId;

   const navigate = useNavigate();
   const userId = useSelector((state: IRootState) => state.auth.userId);
   const token = useSelector((state: IRootState) => state.auth.token);
   const curPage = useSelector((state: IRootState) => state.movie.activePage);
   const movieList = useSelector((state: IRootState) => (state.movie?.moviesList ? state.movie?.moviesList[curPage] : null));
   const movie = movieList.find((mov: any) => mov.uuid === movieId);

   console.log(movie);

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function editMovieHandler(payload: Movie) {
      setError(null);
      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', payload.img);
      formData.append('title', payload.title);
      formData.append('publishingYear', payload.year);
      formData.append('user_uuid', userId!);

      const url = EDIT_MOVIE_URL + movieId;

      try {
         const response = await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
               token: token!
            }
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error('Something went wrong!');
         }

         if (data) {
            navigate('/movies');
         }
      } catch (error: any) {
         setError(error.message);
      }
      setIsLoading(false);
   }

   return (
      <div className="container px-6">
         <div className="pt-12 pb-12">
            <HeadingMedium className='mb-11 md:mb-12'>Edit</HeadingMedium>
            {isLoading ? <ThemeLoadingSpinner /> : <MovieForm defaultState={movie} onSubmit={editMovieHandler} />}
            {error && <div><TextPrimary className='text-danger mx-auto mt-5 text-center'>{error}</TextPrimary></div>}
         </div>
      </div>
   );
}
export default EditMovie;
