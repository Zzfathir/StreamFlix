import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieList from "./components/MovieList";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MovieList />} />
      </Routes>
    </Router>
  );
}

export default App;
