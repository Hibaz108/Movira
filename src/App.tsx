// react router
import { Routes, Route } from "react-router-dom";
// components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
//pages
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Discover from "./pages/Discover";
import Genres from "./pages/Genres";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
// hooks
import { useTheme } from "./hooks/useTheme";

function App() {
  useTheme();
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
