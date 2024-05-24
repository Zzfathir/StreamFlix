import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../services/api";
import { Link } from "react-router-dom";

function MovieList({ balance }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  // memasukan data movies kedalam state berdasarkan page
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      const newMovies = await fetchNowPlayingMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setHasMore(newMovies.length > 0);
      setLoading(false);
    }

    loadMovies();
  }, [page]);

  // ketika page sudah discroll sampai bawah
  // merubah/menambah nilai page agar bisa men load lebih banyak movie
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 500
        && !loading
        && hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

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

  return (
    <Container style={{ margin: "20px" }}>
        <Container style={{ margin: "20px" }}>
          <Typography fontWeight="bold" variant="h4" gutterBottom>
            ON GOING
          </Typography>

          <Typography margin="10px" fontWeight="bold" variant="h7" gutterBottom>
            Saldo: Rp. {balance}
          </Typography>
          <Button size="medium" color="secondary" variant="contained" component={Link} to={`/mymovie`}>
            My Movies
          </Button>
        </Container>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <Card>
                <CardMedia component="img" image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <CardContent>
                  <Typography fontWeight="bold" variant="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2">Price: Rp. {moviePrice(movie.vote_average)}</Typography>
                  <Button size="medium" color="secondary" variant="contained" component={Link} to={`/${movie.id}-${movie.title.replace(/\s+/g, "-")}`}>
                    See Detail
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {loading && <h4>Loading...</h4>}
      {!hasMore && <p>No more movies to show</p>}
    </Container>
  );
}

export default MovieList;
