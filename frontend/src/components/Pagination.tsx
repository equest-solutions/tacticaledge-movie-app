import Button from "./button/Button";
import ButtonDark from "./button/ButtonDark";

function Pagination() {
   return (
      <div className="flex items-center justify-center space-x-5">
         <button className="font-bold">Prev</button>
         <div className="flex space-x-3">
            <Button className="w-7 h-7 p-0">1</Button>
            <ButtonDark className="w-7 h-7 p-0">2</ButtonDark>
            <ButtonDark className="w-7 h-7 p-0">3</ButtonDark>
         </div>
         <button className="font-bold">Next</button>
      </div>
   );
}
export default Pagination;
