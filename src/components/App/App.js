import HomePage from "../HomePage/HomePage";
import Footer from "../Layout/Footer/Footer";
import SearchPage from "../SearchPage/SearchPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaylistPage from "../PlaylistPage/PlaylistPage";
import SongPlayer from "../SongPlayer/SongPlayer";
import LibraryPage from "../LibraryPage/LibraryPage";
import { AppProvider } from "../../providers/AppProvider";

function App() {
  // TODO: song.js acildiginda footerin kapatilmasi gerekiyor.
  return (
    <div className={`app-container`}>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />}>
              <Route path="song/:songId" element={<PlaylistPage />} />
            </Route>
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
          <SongPlayer />
          <Footer />
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
