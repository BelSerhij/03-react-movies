import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!movie) return null;

  return createPortal(
    <div 
      className={css.backdrop} 
      onClick={onClose} 
    >
      <div 
        className={css.modal} 
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          className={css.closeButton} 
          onClick={onClose} 
        >
          &times;
        </button>

        <img
            className={css.image}
            src={movie.backdrop_path 
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
                : 'https://placeholder.com'}
            alt={movie.title}
        />

        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}>{movie.overview}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
