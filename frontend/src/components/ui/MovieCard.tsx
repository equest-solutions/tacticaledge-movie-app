import TextLarge from "../typography/TextLarge"
import TextSmall from "../typography/TextSmall"

function MovieCard() {
  return (
    <div className="rounded-xl bg-dark-100 p-3 pb-5 transition-all duration-200 card">
      <div className="overflow-hidden rounded-xl card-image mb-5">
         <img className="w-full max-w-full" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg" alt="movie" />
      </div>
      <div className="px-3">
      <TextLarge className="mb-3">Movie 1</TextLarge>
      <TextSmall>2021</TextSmall>
      </div>
    </div>
  )
}
export default MovieCard