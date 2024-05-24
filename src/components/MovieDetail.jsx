import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../services/api';
import { Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';


function MovieDetail() {
    const {movieId} = useParams()
    const [movie, setMovies] = useState(null)

    useEffect(() => {
        async function loadMovie() {
            const movieData = await fetchMovieDetail(movieId)
            setMovies(movieData)
        }

        loadMovie()
    }, [movieId])
}