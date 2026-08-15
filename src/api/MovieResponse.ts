// types/MovieResponse.ts
// Forma cruda que devuelve el backend
export interface MovieResponse {
    _id: string;
    _title: string;
    _description: string;
    _subtitles: string;
    _categories: string[];
    _urlHorizontalPoster: string;
    _urlVerticalPoster: string;
    _urlMedia: string;
    _originalNumIdFromOriginalSource?: number;
    _originalAlphIdFromOriginalSource?: string;
}