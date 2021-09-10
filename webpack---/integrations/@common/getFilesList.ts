export const getFilesList = ({
  debug,
  staticsUrl,
  bundleName,
}: {
  staticsUrl: string;
  debug: boolean;
  bundleName: string;
}) => {
  const postfix = debug ? '' : '.min';

  return [`${staticsUrl}${bundleName}.bundle${postfix}.js`, `${staticsUrl}${bundleName}${postfix}.css`];
};
