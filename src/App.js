import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [latestQueries, setLatestQueries] = useState([]);

  const fetchMovies = async (searchQuery) => {
    try {
      const { data } = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=9a5f272`); // implement read from .env
      if (data && data.Search) {
        setMovies(data.Search);
        if (searchQuery) {
          updateLatestQueries(searchQuery);
        }
      } else {
        setMovies([]);
      }
      setError(null);
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      setMovies([]);
    }
  };

  useEffect(() => {
    const storedQueries = localStorage.getItem('latestQueries');
    if (storedQueries) {
      setLatestQueries(JSON.parse(storedQueries));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchMovies(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateLatestQueries = (query) => {
    const updatedQueries = [query, ...latestQueries.filter(item => item !== query)].slice(0, 5);
    setLatestQueries(updatedQueries);
    localStorage.setItem('latestQueries', JSON.stringify(updatedQueries));
  };

  return (
    <div className="App">
      <header className='header'>
        <h1 className='heading-1'>Movies World</h1>
      </header>
      <div className="search-container">
        <input
          className='search-input'
          type="text"
          placeholder="Search tour best movies here..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {error && <p>{error}</p>}
      <div className="latest-queries">
        <h2>Latest Searches:</h2>
        <ul>
          {latestQueries.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
      </div>
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
