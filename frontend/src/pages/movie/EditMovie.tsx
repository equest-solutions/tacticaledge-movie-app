import { useParams } from 'react-router-dom';
import HeadingMedium from '../../components/typography/HeadingMedium';
import MovieForm from './MovieForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_MOVIE_URL, GET_MOVIE_DETAILS_URL } from '../../helper/config';
import { IRootState } from '../../store';
import ThemeLoadingSpinner from '../../components/ui/loading-indicator/ThemeLoadingSpinner';
import TextPrimary from '../../components/typography/TextPrimary';
import { Movie } from '../../typescript/interfaces/global';
import { movieActions } from '../../store/movieSlice';

function EditMovie() {
   const params = useParams();
   const movieId = params.movieId;

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userId = useSelector((state: IRootState) => state.auth.userId);
   const token = useSelector((state: IRootState) => state.auth.token);
   const [movie, setMovie] = useState<any>(null);

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   async function getMovieDetails() {
      setError(null);
      setIsLoading(true);

      const url = GET_MOVIE_DETAILS_URL + movieId;

      try {
         const response = await fetch(url, {
            method: 'GET',
            headers: {
               token: token!,
            },
         });

         const data = await response.json();
         if (!data.status) {
            throw new Error(data.message);
         }
         if (!response.ok) {
            throw new Error('Something went wrong!');
         }

         if (data) {
            setMovie({
               title: data.data.title,
               publish_year: data.data.publish_year,
               image: data.data.image,
            });
         }
      } catch (error: any) {
         setError(error.message);
      }
      setIsLoading(false);
   }

   useEffect(() => {
      getMovieDetails();
   }, []);

   async function editMovieHandler(payload: Movie) {
      setError(null);
      setIsLoading(true);

      const formData = new FormData();
      if (payload.img) formData.append('image', payload.img);
      formData.append('title', payload.title);
      formData.append('publishingYear', payload.year);
      formData.append('user_uuid', userId!);

      const url = EDIT_MOVIE_URL + movieId;

      try {
         const response = await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
               token: token!,
            },
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
      <>
         <div className="container px-6">
            <div className="pt-12 pb-12">
               <HeadingMedium className="mb-11 md:mb-12">Edit</HeadingMedium>
               {isLoading && <ThemeLoadingSpinner />}
               {movie && !isLoading && <MovieForm defaultState={movie} onSubmit={editMovieHandler} />}
               {error && (
                  <div>
                     <TextPrimary className="text-danger mx-auto mt-5 text-center">{error}</TextPrimary>
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
export default EditMovie;
