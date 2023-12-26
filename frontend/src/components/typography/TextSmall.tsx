import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function TextSmall(props: PropsWithChildren<CustomClassProps>) {
  return (
    <p className={`${props.className} text-sm font-primary`}>{props.children}</p>
  )
}
export default TextSmall