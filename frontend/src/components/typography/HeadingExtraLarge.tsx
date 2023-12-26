import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function HeadingExtraLarge(props: PropsWithChildren<CustomClassProps>) {
  return (
    <h1 className={`${props.className} text-5xl font-bold font-secondary`}>{props.children}</h1>
  )
}
export default HeadingExtraLarge