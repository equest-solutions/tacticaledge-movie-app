import { PropsWithChildren } from "react";
import { ButtonClassProps } from "../../typescript/interfaces/global";
import ButtonBase from "./ButtonBase";

function Button(props: PropsWithChildren<ButtonClassProps>) {
   return (
      <ButtonBase {...props} className={`${props.className} btn-primary`}>{props.children}</ButtonBase>
   );
}
export default Button;
