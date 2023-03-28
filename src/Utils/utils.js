export const validateInt = (integer) => {
  const conversion = Number(integer);
  return Number.isInteger(conversion);
}

// validate if it's float or int
export const validateFloat = (float) => {
  const conversion = Number(float);
  return !Number.isNaN(conversion);
}

export const validateRecipeCreateOrEditForm = (recipeName, information, ingredints, directions) => {
  recipeName = recipeName.trim();
  if (recipeName === "" ||
    information.servings === "" || !validateInt(information.servings) ||
    information.prepTime === "" || !validateInt(information.prepTime) ||
    information.cookingTime === "" || !validateInt(information.cookingTime) ||
    information.calories === "" || !validateInt(information.calories)
  ) {
    return false;
  } else if (ingredints.length === 0 || directions.length === 0) {
    return false;
  } else {
    return true;
  }
}