import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../services/api";
import { Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

function MovieDetail({ balance, setBalance, ownedMovies, setOwnedMovies, ownedMoviesId, setOwnedMoviesId }) {
  const { movieId } = useParams();
  const [movie, setMovies] = useState(null);

  // memasukan data detail movie kedalam state berdasarkan id
  useEffect(() => {
    async function loadMovie() {
      const movieData = await fetchMovieDetail(movieId);
      setMovies(movieData);
    }

    loadMovie();
  }, [movieId]);

  // mengatur harga dari movie berdasarkan rating movienya
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

  // fungsi untuk membeli film
  // ketika saldo cukup & film belum dimiliki maka bisa beli/kurangi saldo sesuai harga filmnya
  // memasukan data & id film yang sudah dimiliki
  function handleBuy() {
    const price = moviePrice(movie.vote_average);
    if (balance >= price && !ownedMoviesId.includes(movie.id)) {
      setBalance(balance - price);
      setOwnedMoviesId([...ownedMoviesId, movie.id]);
      setOwnedMovies([...ownedMovies, movie]);
    } else {
      alert("Saldo tidak cukup");
    }
  }
  // loading state
  if (!movie) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia component="img"  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body1">Rating: {movie.vote_average}</Typography>
          <Typography variant="body1">Durasi: {movie.runtime} menit</Typography>
          <Typography variant="body1">Harga: Rp. {moviePrice(movie.vote_average)}</Typography>
          {!ownedMoviesId.includes(movie.id) ? (
            <Button onClick={handleBuy} variant="contained" color="primary">
              Buy - Rp. {moviePrice(movie.vote_average)}
            </Button>
          ) : (
            <Typography variant="h6">Successfully owned✅</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default MovieDetail;
