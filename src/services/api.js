const API_KEY = "9dc919cb16081f3825a2848caa41c1a6";
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchNowPlayingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetail (movieId) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  };

