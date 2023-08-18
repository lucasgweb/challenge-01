export function buildRoutePath(path) {
  // regex to get the query params from the URL
  const getParamsRegex = /:([a-zA-Z]+)/g;
  // regex to get the query params value with another regex and its group name with  '?<$1>'
  const pathWithParams = path.replaceAll(getParamsRegex, "(?<$1>[a-z0-9-_]+)");
  // the '^' indicates that the string to match need to start with the regex
  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
