import { PropsWithChildren } from "react";
import { ButtonClassProps } from "../../typescript/interfaces/global";
import ButtonBase from "./ButtonBase";

function ButtonDark(props: PropsWithChildren<ButtonClassProps>) {
   return (
      <ButtonBase {...props} className={`${props.className} btn-primary bg-dark-100`}>{props.children}</ButtonBase>
   );
}
export default ButtonDark;
