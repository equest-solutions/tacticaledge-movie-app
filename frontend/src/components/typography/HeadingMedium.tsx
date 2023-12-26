import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function HeadingMedium(props: PropsWithChildren<CustomClassProps>) {
  return (
    <h1 className={`${props.className} text-3xl font-semibold`}>{props.children}</h1>
  )
}
export default HeadingMedium