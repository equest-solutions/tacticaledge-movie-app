import { PropsWithChildren } from "react"
import { CustomClassProps } from "../../typescript/interfaces/global"

function HeadingLarge(props: PropsWithChildren<CustomClassProps>) {
  return (
    <h1 className={`${props.className} md:text-4xl text-3xl font-semibold font-secondary`}>{props.children}</h1>
  )
}
export default HeadingLarge