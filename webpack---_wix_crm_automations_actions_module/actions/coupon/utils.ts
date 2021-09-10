export const tryParseToJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

export const getCurrentTime = (): Number => {
  return Date.now();
};
