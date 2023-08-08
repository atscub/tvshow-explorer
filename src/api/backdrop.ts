// Use themoviedb API to get backdrop images. The OMDB API doesn't
// provide backdrop images, only posters. Posters are not suitable
// for backgrounds, because the have portrait aspect ratio.
// Check out the API docs: https://developer.themoviedb.org/reference/find-by-id

interface FindResponseSingleEntry {
  backdrop_path?: string;
  still_path?: string;
}

interface FindResponse {
  [key: string]: FindResponseSingleEntry[];
}

export const getBackdropPath = async (
  imdbResourceId: string
): Promise<string | undefined> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/find/${imdbResourceId}?api_key=${process.env.THEMOVIEDB_API_KEY}&external_source=imdb_id`
  );
  const remoteResource = (await response.json()) as FindResponse;
  const item = Object.values(remoteResource).find(
    (result) => result.length > 0
  )?.[0];

  return item?.backdrop_path || item?.still_path;
};
