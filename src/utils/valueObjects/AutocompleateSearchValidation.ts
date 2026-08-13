import type { AutocompleateSearch } from '../../types/AutocompleateSearch'

const isValidItem = (item: any): item is AutocompleateSearch => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    Array.isArray(item.categories) &&
    item.categories.every((cat: any) => typeof cat === "string")
  );
};

export const AutocompleateSearchValidation = (
  response: any
): AutocompleateSearch[] => {
  if (!Array.isArray(response)) {
    throw new Error("La respuesta no es un array");
  }

  const invalidIndex = response.findIndex((item) => !isValidItem(item));
  if (invalidIndex !== -1) {
    throw new Error(
      `Item inválido en el índice ${invalidIndex}: ${JSON.stringify(response[invalidIndex])}`
    );
  }

  return response as AutocompleateSearch[];
};