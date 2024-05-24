import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../services/api";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

function MovieDetail({ balance, setBalance, ownedMovies, setOwnedMovies }) {
  const { movieId } = useParams();
  const [movie, setMovies] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      const movieData = await fetchMovieDetail(movieId);
      setMovies(movieData);
    }

    loadMovie();
  }, [movieId]);

  function moviePrice(rating) {
    if (rating <= 3) {
      return 3500;
    } else if (rating <= 6) {
      return 8250;
    } else if (rating <= 8) {
      return 16350;
    } else {
      return 21250;
    }
  }

  function handleBuy() {
    const price = moviePrice(movie.vote_average);
    if (balance >= price && !ownedMovies.includes(movie.id)) {
      setBalance(balance - price);
      setOwnedMovies([...ownedMovies, movie.id]);
    } else {
      alert("Saldo tidak cukup atau film sudah dimiliki");
    }
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia component="img" image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <CardContent>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="body1">Rating: {movie.vote_average}</Typography>
          <Typography variant="body1">Durasi: {movie.runtime} menit</Typography>
          <Typography variant="body1">Harga: Rp. {moviePrice(movie.vote_average)}</Typography>
          <Button onClick={handleBuy} variant="contained" color="primary">
            Beli - Rp. {moviePrice(movie.vote_average)}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}


export default MovieDetail