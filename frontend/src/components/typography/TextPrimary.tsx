import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function TextPrimary(props: PropsWithChildren<CustomClassProps>) {
  return (
    <p className={`${props.className ? props.className : ''} text-base font-primary`}>{props.children}</p>
  )
}
export default TextPrimary