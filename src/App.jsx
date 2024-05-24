import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieList from "./components/MovieList";
import { CssBaseline } from "@mui/material";
import MovieDetail from "./components/MovieDetail";
import OwnedMovie from "./components/OwnedMovie";

function App() {

  const [balance, setBalance] = useState(100000);
  const [ownedMovies, setOwnedMovies] = useState([]);
  const [ownedMoviesId, setOwnedMoviesId] = useState([]);

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MovieList balance={balance} ownedMovies={ownedMovies} />} />
        <Route path="/:movieId" element={<MovieDetail balance={balance} setBalance={setBalance} ownedMovies={ownedMovies} setOwnedMovies={setOwnedMovies} ownedMoviesId={ownedMoviesId} setOwnedMoviesId={setOwnedMoviesId} />} />
        <Route path="/mymovie" element={<OwnedMovie balance={balance} ownedMovies={ownedMovies} />} />
      </Routes>
    </Router>
  );
}

export default App;
