import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../services/api";
import { Link } from "react-router-dom";


function OwnedMovie({ownedMovies, balance}) {

    console.log(ownedMovies)

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
      <Typography fontWeight="bold" variant="h4" gutterBottom>
        Your Movies
      </Typography>
      <Typography fontWeight="bold" variant="h7" gutterBottom>
        Saldo: Rp. {balance}
      </Typography>
      <Grid container spacing={4}>
        {ownedMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={8}>
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
    </Container>
    )

}

export default OwnedMovie