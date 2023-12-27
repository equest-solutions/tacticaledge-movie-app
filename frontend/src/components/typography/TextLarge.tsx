import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function TextLarge(props: PropsWithChildren<CustomClassProps>) {
  return (
    <p className={`${props.className ? props.className : ''} text-base md:text-xl font-medium font-primary`}>{props.children}</p>
  )
}
export default TextLarge