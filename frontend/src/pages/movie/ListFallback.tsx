import Button from '../../components/button/Button';
import HeadingMedium from '../../components/typography/HeadingMedium';

function ListFallback() {
   return (
      <div className="min-h-screen flex items-center justify-center">
         <div className='container px-6'>
            <HeadingMedium className="mb-8 text-center">Your movie list is empty</HeadingMedium>
            <Button isLink linkPath='add' className='mx-auto md:w-fit'>Add a new movie</Button>
         </div>
      </div>
   );
}
export default ListFallback;
