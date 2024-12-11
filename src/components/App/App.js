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
} from "react-router-dom";
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import Song from "../Song/Song";
import SongPlayer from "../SongPlayer/SongPlayer";
import LibraryPage from "../LibraryPage/LibraryPage";
import { AppProvider } from "../../providers/AppProvider";

function App() {
  const location = useLocation();

  return (
    <div
      className={`app-container ${location.pathname === "/song" ? "full" : ""}`}
    >
      <AppProvider>
        <div className="App">
          {location.pathname === "/" && <Header />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />}>
              <Route path="song/:songId" element={<PlaylistPage />} />
            </Route>

            <Route path="/song" element={<Song />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
          {location.pathname !== "/song" && <SongPlayer />}
          {location.pathname !== "/song" && <Footer />}
        </div>
      </AppProvider>
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
