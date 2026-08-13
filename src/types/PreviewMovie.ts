import type { Movie } from './Movie'

export type PreviewMovie = Omit<Movie, 'description' | 'urlMedia' | 'subtitle'>