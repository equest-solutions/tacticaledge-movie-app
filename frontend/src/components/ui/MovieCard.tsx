import { PropsWithChildren } from "react"
import TextLarge from "../typography/TextLarge"
import TextSmall from "../typography/TextSmall"
import { Movie } from "../../typescript/interfaces/global"

function MovieCard({img, title, year}: PropsWithChildren<Movie>) {
  return (
    <div className="rounded-xl bg-dark-100 p-3 pb-5 transition-all duration-200 card">
      <div className="overflow-hidden rounded-xl card-image mb-5">
         <img className="w-full max-w-full" src={img} alt={title} />
      </div>
      <div className="px-3">
      <TextLarge className="mb-3">{title}</TextLarge>
      <TextSmall>{year}</TextSmall>
      </div>
    </div>
  )
}
export default MovieCard