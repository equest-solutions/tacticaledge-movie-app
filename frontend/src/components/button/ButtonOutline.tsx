import { PropsWithChildren } from "react";
import { ButtonClassProps } from "../../typescript/interfaces/global";
import ButtonBase from "./ButtonBase";

function ButtonOutline(props: PropsWithChildren<ButtonClassProps>) {
   return (
      <ButtonBase {...props} className={`${props.className ? props.className : ''} btn-outline`}>{props.children}</ButtonBase>
   );
}
export default ButtonOutline;
