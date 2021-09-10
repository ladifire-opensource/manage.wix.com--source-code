export const splitUrl = (url: string): string[] => {
  const regexText =
    '^(?<proto>https?://)(?<domain>.*?)(?<path>/[^?&#]*)?(?<query>[?&][^#]*)?(?<hashparams>#.*)?$';
  let regex: RegExp;
  try {
    regex = new RegExp(regexText, 'g');
  } catch (e) {
    return [];
  }

  const matched = regex.exec(url);
  if (matched === null) {
    return [];
  }
  const path = matched.groups?.path || '';
  const pathChunks = path
    .split('/')
    .splice(1)
    .map((pathPart) => `/${pathPart}`);

  const query = matched.groups?.query || '';
  const queryChunks = query
    .split(/[?&]/g)
    .splice(1)
    .map((queryPart) => `?${queryPart}`);

  const hashparams = matched.groups?.hashparams
    ? [matched.groups?.hashparams]
    : [];

  const matches = [matched.groups?.proto, matched.groups?.domain].concat(
    pathChunks,
    queryChunks,
    hashparams,
  );
  const nonEmptyMatches: string[] = matches.filter<string>(
    (maybeUndefined): maybeUndefined is string => maybeUndefined !== undefined,
  );
  return nonEmptyMatches;
};
