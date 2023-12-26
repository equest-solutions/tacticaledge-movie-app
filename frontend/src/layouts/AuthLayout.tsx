import { PropsWithChildren } from "react";

interface Image {
   image: string;
}

function AuthLayout(props: PropsWithChildren<Image>) {
   return (
      <div className="grid grid-cols-2 min-h-screen">
         <div className="flex max-h-screen">
            <img className="w-full object-cover" src={props.image} alt="background image" />
         </div>
         <div className="min-h-full flex flex-col items-center justify-center">
            {props.children}
         </div>
      </div>
   );
}
export default AuthLayout;
