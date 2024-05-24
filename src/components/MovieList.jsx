import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../services/api";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      const newMovies = await fetchNowPlayingMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }

    loadMovies()
  }, [page]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        On going Film
      </Typography>
      <Grid container spacing={4}></Grid>
    </Container>
  );
}
