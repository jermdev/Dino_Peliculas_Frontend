import type { Movie, Category } from '../../types/Movie'


const isValidCategory = (item: any): item is Category => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "number" &&
    typeof item.name === "string"
  );
};

const isValidMovie = (item: any): item is Movie => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.description === "string" &&
    typeof item.urlHorizontalPoster === "string" &&
    typeof item.urlVerticalPoster === "string" &&
    typeof item.urlMedia === "string" &&
    typeof item.subtitle === "string" &&
    Array.isArray(item.categories) &&
    item.categories.every(isValidCategory)
  );
};

export const getMovieByIdValidation = (response: any): Movie => {
    if(!isValidMovie(response)) {
    throw new Error(
      `Respuesta inválida de getMovieById: ${JSON.stringify(response)}`
    );
  }
  return response;
}