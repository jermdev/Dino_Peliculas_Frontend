import type { Movie } from './Movie'

export type AutocompleateSearch = Omit<Movie, 'description' | 'urlMedia' | 'subtitle' |'urlVerticalPoster' |'urlHorizontalPoster'>