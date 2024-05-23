const API_KEY = "9dc919cb16081f3825a2848caa41c1a6";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchNowPlayingMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=id-ID&page=${page}`);
  const data = await res.json();
  return data.results;
}
