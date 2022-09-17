const buildQueryString = (obj: Object) =>
  Object.entries(obj)
    .filter(pair => pair[1] != undefined)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

export {
  buildQueryString,
};