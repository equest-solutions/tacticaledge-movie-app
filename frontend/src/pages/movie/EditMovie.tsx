import HeadingMedium from '../../components/typography/HeadingMedium';
import MovieForm from './MovieForm';

function EditMovie() {
   return (
      <div className="container px-6">
         <div className="pt-12 pb-12">
            <HeadingMedium className='mb-11 md:mb-12'>Edit</HeadingMedium>
            <MovieForm />
         </div>
      </div>
   );
}
export default EditMovie;
