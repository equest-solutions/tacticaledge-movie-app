import Button from '../../components/button/Button';
import HeadingMedium from '../../components/typography/HeadingMedium';

function ListFallback() {
   return (
      <div className="min-h-screen flex items-center justify-center">
         <div>
            <HeadingMedium className="mb-8">Your movie list is empty</HeadingMedium>
            <Button size='md' isLink linkPath='add' className='mx-auto'>Add a new movie</Button>
         </div>
      </div>
   );
}
export default ListFallback;
