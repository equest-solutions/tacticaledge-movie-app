import HeadingMedium from '../../components/typography/HeadingMedium';
import { Movie } from '../../typescript/interfaces/global';
import MovieForm from './MovieForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_MOVIE_URL } from '../../helper/config';
import { IRootState } from '../../store';
import ThemeLoadingSpinner from '../../components/ui/loading-indicator/ThemeLoadingSpinner';
import TextPrimary from '../../components/typography/TextPrimary';
import { movieActions } from '../../store/movieSlice';

function AddMovie() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userId = useSelector((state: IRootState) => state.auth.userId);
   const token = useSelector((state: IRootState) => state.auth.token);

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function addMovieRequest(payload: Movie) {
      setError(null);
      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', payload.img);
      formData.append('title', payload.title);
      formData.append('publishingYear', payload.year);
      formData.append('user_uuid', userId!);
      try {
         const response = await fetch(CREATE_MOVIE_URL, {
            method: 'POST',
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
            dispatch(movieActions.setModified(true));
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
            <HeadingMedium className='mb-11 md:mb-12'>Create a new movie</HeadingMedium>
            {isLoading ? <ThemeLoadingSpinner /> : <MovieForm onSubmit={addMovieRequest} />}
            {error && <div><TextPrimary className='text-danger mx-auto mt-5 text-center'>{error}</TextPrimary></div>}
         </div>
      </div>
   );
}
export default AddMovie;
