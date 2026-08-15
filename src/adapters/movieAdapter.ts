// adapters/movieAdapter.ts
import type { MovieResponse } from '../api/MovieResponse'
import type { Movie, Category } from '../types/Movie'

const categoriesAdapter = (categoriesResponse: string[]): Category[] => {
   return categoriesResponse.map((cat, index) => ({
        id: index + 1, // El id no indetifica a la categoria en base de datos, es temporal para cumplir con el tipado
        name: cat
    }));


}

export const adaptMovie = (raw: MovieResponse): Movie => {
    return {
        id: raw._id,
        title: raw._title,
        description: raw._description,
        subtitle: raw._subtitles,
        categories: categoriesAdapter( raw._categories),
        urlHorizontalPoster: raw._urlHorizontalPoster,
        urlVerticalPoster: raw._urlVerticalPoster,
        urlMedia: raw._urlMedia,
    };
}