/**
 * Get query parameter from url
 */
export const getParam = (param: string): string | null => {
  const params = new URLSearchParams(location.search);
  return params.get(param);
};
