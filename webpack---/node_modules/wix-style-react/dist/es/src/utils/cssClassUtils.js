/** Capitalize first character */
export function capitalize(str) {
  if (!str) {
    return undefined;
  }

  return str[0].toUpperCase() + str.substring(1);
}