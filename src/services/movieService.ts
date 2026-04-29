import axios from "axios";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchMovies = async (query: string) => {
  try {
    const response = await axios.get("search/movie", {
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
