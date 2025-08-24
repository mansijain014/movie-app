import { createContext, useState, useEffect } from 'react';
import './App.css'

import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";

export const FavContext = createContext()
function App() {

  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      // If storedFavs exist, parse them, otherwise return an empty array.
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
      console.error("Failed to load", error);
      return [];
    }
  });

  // This effect runs whenever the 'favorites' state changes.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <NavBar/>
      <main className="main-content">  
        <FavContext.Provider value={[favorites, setFavorites]}>   
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Favorites />} />
          </Routes>
        </FavContext.Provider>
      </main>
    </>
  );
}

export default App;
