import { useState, useEffect, useRef, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { ShowService } from '../services/ShowService'
import type { AutocompleateSearch } from '../types/AutocompleateSearch'
import '../styles/BarrSearchStyle.css'

const showService = new ShowService();
const DEBOUNCE_MS = 300;
export const BarrSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<AutocompleateSearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const requestIdRef = useRef(0);
  const navigate = useNavigate();

    useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const currentRequestId = ++requestIdRef.current;
      setIsLoading(true);
      setError(null);

      try {
        // Cambia "searchShows" por el método real de tu ShowService
        const data = await showService.autocompleateMovieName(trimmed);

        // Evita que una respuesta vieja pise una más reciente
        if (currentRequestId !== requestIdRef.current) return;

        setResults(data);
        setIsOpen(true);
        setActiveIndex(-1);
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) return;
        setError('No se pudo cargar los resultados');
        setResults([]);
      } finally {
        if (currentRequestId === requestIdRef.current) setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((show: AutocompleateSearch) => {
    setQuery(show.title);
    setIsOpen(false);
    setActiveIndex(-1);
    navigate(`/movie/${show.id}`);
    
    // Aquí podrías navegar a la página de la película, ej:
    // navigate(`/shows/${show.id}`);
  }, [navigate]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
    };
    
   return (
    <div ref={containerRef} className="search-bar">
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="movie-search-listbox"
        aria-autocomplete="list"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        placeholder="Buscar películas..."
        className="search-bar__input"
      />

      {isLoading && (
        <div className="search-bar__spinner" />
      )}

      {isOpen && (
       <ul id="movie-search-listbox" role="listbox" className="search-bar__listbox">
          {error && <li className="search-bar__message search-bar__message--error">{error}</li>}

          {!error && results.length === 0 && !isLoading && (
             <li className="search-bar__message">Sin resultados para "{query}"</li>
          )}

          {!error &&
  results.map((show, index) => (
    <li
      key={show.id}
      role="option"
      aria-selected={index === activeIndex}
      onClick={() => handleSelect(show)}
      onMouseEnter={() => setActiveIndex(index)}
      className={`search-bar__option ${index === activeIndex ? 'search-bar__option--active' : ''}`}
    >
      
        <span className="search-bar__option-title">{show.title}</span>

        {show.categories.length > 0 && (
          <div className="search-bar__categories">
            {show.categories.map((category) => (
              <span key={category.id} className="search-bar__category">
                {category.name}
              </span>
            ))}
          </div>
        )}
    </li>
  ))}
        </ul>
      )}
    </div>
  );
}