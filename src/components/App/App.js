import HomePage from "../HomePage/HomePage";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import Song from "../Song/Song";
import SongPlayer from "../SongPlayer/SongPlayer";
import { useState } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSongPlayerOpen, setIsSongPlayerOpen] = useState(false);

  const openSongPlayer = () => {
    setIsSongPlayerOpen(true);
    navigate("/song");
  };
  return (
    <div className="App">
      {location.pathname === "/" && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/song" element={<Song />} />
      </Routes>
      {location.pathname !== "/song" && (
        <SongPlayer openSongPlayer={openSongPlayer} />
      )}
      {location.pathname !== "/song" && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
