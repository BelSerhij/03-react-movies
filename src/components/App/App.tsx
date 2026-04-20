import { useState } from 'react'
import SearchBar from '../../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import { fetchMovies } from '../../Services/MovieService'
import { Toaster } from 'react-hot-toast'
import type { Movie } from '../../Types/Movie'
import './App.module.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearchSubmit = async (query: string) => {
    try {
      setIsError(false);
      setHasSearched(true);
      setMovies([]);
      setIsLoading(true);
      const data = await fetchMovies(query);
      setMovies(data); 
    } catch (error) {
      setIsError(true);
      console.error("Помилка пошуку:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
      
      <main>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}

        {hasSearched && movies.length === 0 && !isLoading && (
          <p>No movies found for your request</p>
        )}
      </main>

      <Toaster />
    </>
  )
}
