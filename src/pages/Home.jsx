import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setMovies(getPopularMovies())
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies. Try again..");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies. Try Again...");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={handleChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="loading">No results found.</div>
      ) : (
        <div className="movies-grid">
          {movies?.map((i) => (
            <MovieCard movie={i} key={i.id} />
          ))}
        </div>
      )}
    </div>
  );
}
