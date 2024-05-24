import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../services/api";
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      const newMovies = await fetchNowPlayingMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }

    loadMovies();
  }, [page]);

  function loadMoreMovies() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        On going Film
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia component="img" image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">Price:</Typography>
                <Button component={Link} >Detail</Button>
              </CardContent>    
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MovieList;
