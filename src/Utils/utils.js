export const trimString = (input) => {
  return input.trim();
}

export const validateInt = (integer) => {
  const conversion = Number(integer);
  return Number.isInteger(conversion);
}

// validate if it's float or int
export const validateFloat = (float) => {
  const conversion = Number(float);
  return !Number.isNaN(conversion);
}