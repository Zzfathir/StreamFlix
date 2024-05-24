import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../services/api";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovies] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      const movieData = await fetchMovieDetail(movieId);
      setMovies(movieData);
    }

    loadMovie();
  }, [movieId]);

  return (
    <Container>
      <Card>
        <CardMedia component="img" image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <CardContent>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="body1">Rating: {movie.vote_average}</Typography>
          <Typography variant="body1">Durasi: {movie.runtime} menit</Typography>
          <Typography variant="body1">Harga: Rp. {getMoviePrice(movie.vote_average)}</Typography>
          </CardContent>
      </Card>
    </Container>
  );
}
