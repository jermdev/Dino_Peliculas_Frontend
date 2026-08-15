import type { MovieResponse } from '../../api/MovieResponse'

const isValidMovie = (item: any): item is MovieResponse => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item._id === "string" &&
    typeof item._title === "string" &&
    typeof item._description === "string" &&
    typeof item._urlHorizontalPoster === "string" &&
    typeof item._urlVerticalPoster === "string" &&
    typeof item._urlMedia === "string" &&
    typeof item._subtitles === "string" &&
    Array.isArray(item._categories) &&
    item._categories.every((cat: any) => typeof cat === "string")
  );
};

export const getMovieByIdValidation = (response: any): MovieResponse => {
    if (!isValidMovie(response)) {
        throw new Error(
            `Respuesta inválida de getMovieById: ${JSON.stringify(response)}`
        );
    }
    return response;
}