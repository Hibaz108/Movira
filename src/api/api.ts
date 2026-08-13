export const fetchApi = async <T>(
  url: string,
  errorMessage: string,
): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.status_message || errorMessage);
  }

  return data;
};
