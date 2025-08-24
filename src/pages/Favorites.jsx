import { useContext, useEffect } from "react";
import "../css/Favorites.css";
import { FavContext } from "../App";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useContext(FavContext);
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavs) {
      setFavorites(storedFavs);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return favorites.length > 0 ? (
    <div className="movies-grid">
      {favorites?.map((i) => (
        <MovieCard movie={i} key={i.id} />
      ))}
    </div>
  ) : (
    <div className="favorites-empty">
      <h2>Your watchlist is empty.</h2>
      <p>Start adding movies to your watchlist and they will appear here.</p>
    </div>
  );
}

export default Favorites;
