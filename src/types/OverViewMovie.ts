import type { Movie } from './Movie'

export type OverViewMovie = Omit<Movie, 'urlMedia' | 'subtitle' | ''>