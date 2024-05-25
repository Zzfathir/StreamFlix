const API_KEY = "9dc919cb16081f3825a2848caa41c1a6";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetching Now Playing Movies
export async function fetchNowPlayingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();
  return data.results;
}

// Fetching Movie Detail
export async function fetchMovieDetail(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

export async function fetchSimiliarMovies(movieId) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=id-ID&page=1`);
  const data = await response.json();
  return data.results;
}
