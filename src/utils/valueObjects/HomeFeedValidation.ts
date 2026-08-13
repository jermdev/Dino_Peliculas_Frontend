import type { HomeFeed } from '../../types/HomeFeed';
import type { HomeFeedSection } from '../../types/HomeFeedSection';
import type { PreviewMovie } from '../../types/PreviewMovie';
import type { Category } from '../../types/Movie';

const isValidCategory = (item: any): item is Category => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "number" &&
    typeof item.name === "string"
  );
};

// PreviewMovie = Movie sin description, urlMedia, subtitle
const isValidPreviewMovie = (item: any): item is PreviewMovie => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.urlHorizontalPoster === "string" &&
    typeof item.urlVerticalPoster === "string" &&
    Array.isArray(item.categories) &&
    item.categories.every(isValidCategory)
  );
};

const isValidHomeFeedSection = (item: any): item is HomeFeedSection => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.title === "string" &&
    Array.isArray(item.items) &&
    item.items.every(isValidPreviewMovie)
  );
};

const isValidHomeFeed = (item: any): item is HomeFeed => {
  return (
    typeof item === "object" &&
    item !== null &&
    Array.isArray(item.sections) &&
    item.sections.every(isValidHomeFeedSection)
  );
};

export const HomeFeedValidation = (response: any): HomeFeed => {
  if (!isValidHomeFeed(response)) {
    throw new Error(
      `Respuesta inválida de getHome: ${JSON.stringify(response)}`
    );
  }
  return response;
};