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

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname == "/" && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
      <Footer />
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
