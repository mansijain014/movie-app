import { useContext } from 'react'
import '../css/MovieCard.css'
import { FavContext } from '../App'
function MovieCard({movie}){
    const [favorites, setFavorites] = useContext(FavContext)

    const isFavorite = favorites?.find(fav => fav.id === movie.id);

    function handleClick(){
        if (!setFavorites) return; // Guard against undefined setFavorites

        if (isFavorite) {
            // Remove from favorites
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== movie.id));
        } else {
            // Add to favorites
            setFavorites(prevFavorites => [...(prevFavorites || []), movie]);
        }
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleClick}>❤</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>    
            </div>  
        </div>
    )
}

export default MovieCard