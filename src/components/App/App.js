import HomePage from "../HomePage/HomePage.jsx";
import Footer from "../Layout/Footer/Footer.jsx";
import SearchPage from "../SearchPage/SearchPage.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaylistPage from "../PlaylistPage/PlaylistPage.jsx";
import SongPlayer from "../SongPlayer/SongPlayer.jsx";
import LibraryPage from "../LibraryPage/LibraryPage.jsx";
import { AppProvider } from "../../providers/AppProvider.jsx";

function App() {
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
