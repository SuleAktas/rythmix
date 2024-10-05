import HomePage from "../HomePage/HomePage";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import SearchPage from "../SearchPage/SearchPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
