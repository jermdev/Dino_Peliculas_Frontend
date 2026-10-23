import React, { useEffect, useState, useCallback } from 'react';
import '../styles/ThemeSwitch.css';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'dino_theme';

export const ThemeSwitch: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Verificar si hay preferencia guardada en localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // 2. Si no hay valor previo, respetar preferencia del sistema si es claro, o por defecto oscuro (cine)
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  // Efecto para sincronizar el atributo data-theme en el documento HTML
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignorar errores de acceso a almacenamiento si está restringido
    }
  }, [theme]);

  // Escuchar cambios de preferencia del sistema si no hay elección forzada previa
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasSavedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (!hasSavedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="theme-switch-container">
      <button
        type="button"
        className="theme-switch-button"
        data-state={theme}
        role="switch"
        aria-checked={isDark}
        aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
        title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
      >
        {/* Icono de Sol */}
        <span className="theme-switch-icon theme-switch-icon--sun" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </span>

        {/* Knob deslizante */}
        <span className="theme-switch-thumb" aria-hidden="true">
          <span className="theme-switch-thumb-dot" />
        </span>

        {/* Icono de Luna */}
        <span className="theme-switch-icon theme-switch-icon--moon" aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </span>
      </button>
    </div>
  );
};
export default ThemeSwitch;
