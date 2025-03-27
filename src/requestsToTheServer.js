import axios from "axios";

const api_key = "33763e91ccb2984b75df6b51ba2f704c";
const url = "https://api.themoviedb.org/3";
const tocen = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzc2M2U5MWNjYjI5ODRiNzVkZjZiNTFiYTJmNzA0YyIsIm5iZiI6MTc0Mjk3OTcxNy42NjQsInN1YiI6IjY3ZTNjMjg1MTZhM2M1YzIyNGYwYTI4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CR_12a3tzzSMNZ5N-z2CAlBAw4j7Bq0w__gAaM3Z908",
  },
};

// ======================запити за популярними фільмами цього дня
export async function requests () {
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;

const trendingToday = await axios.get(url, tocen)
return trendingToday.data.results;
}

// ==============================================запит по id
export async function requestsByID (id = '', endpoint = "") {

  const movie = await axios.get(`${url}/movie/${id}${endpoint}?api_key=${api_key}`,
    tocen);
  return movie.data;
}

// ====================================================filter
export async function filterByName (query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}`;
  
  const trendingToday = await axios.get(url, tocen);

  return trendingToday.data.results;
  }
