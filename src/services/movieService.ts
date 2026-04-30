import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

interface TmdbResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<TmdbResponse>("search/movie", {
    params: {
        query: query,
        include_adult: false,
        language: "uk-UA",
        },
    headers: {
        Authorization: `Bearer ${myKey}`,
        Accept: 'application/json',
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Помилка при завантаженні фільмів:", error);
    return [];
  }
};
