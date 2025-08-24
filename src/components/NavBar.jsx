import { Link } from "react-router-dom";
import '../css/NavBar.css'

function NavBar() {

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="nav-app-link">WatchLister</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/watchlist" className="nav-link">Watch List</Link>
            </div>
        </nav> 
    )
}

export default NavBar;