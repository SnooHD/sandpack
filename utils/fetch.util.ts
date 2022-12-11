interface FetcherConfigProps extends RequestInit {
  query?: Record<string, string>;
}

export async function fetcher<T>(
  url: string,
  { query, ...init }: FetcherConfigProps = {}
): Promise<T> {
  // Create a 10s timeout for API calls
  const controller = new AbortController();
  const abortTimer = setTimeout(() => controller.abort(), 10000);

  // Merge query params to url
  const fetchUrl = query
    ? `${url}?${new URLSearchParams(query).toString()}`
    : url;

  try {
    const response = await fetch(fetchUrl, init);
    clearTimeout(abortTimer);

    if (!response.ok) {
      const error = await response.text();
      throw error;
    }

    return response.json();
  } catch (error: unknown) {
    throw new Error(error as string);
  }
}
