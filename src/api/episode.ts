import { getBackdropPath } from "./backdrop";

export const getEpisode = async (
  showId: string,
  seasonNumber: number,
  episodeNumber: number,
  episodeIMDBId?: string
): Promise<Episode> => {
  console.log("episodeIMDBId", episodeIMDBId);
  const [response, backdrop] = await Promise.all([
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${showId}&Season=${seasonNumber}&Episode=${episodeNumber}&plot=short`
    ),
    episodeIMDBId ? getBackdropPath(episodeIMDBId) : undefined,
  ]);

  const episode = await response.json();
  if (episode.Response === "False") {
    throw new Error(episode.Error);
  }

  return {
    id: episode.imdbID,
    episodeNumber: episode.Episode,
    title: episode.Title,
    plot: episode.Plot,
    poster: backdrop
      ? `https://image.tmdb.org/t/p/w780${backdrop}`
      : episode.Poster,
    rating: episode.imdbRating,
    airDate: episode.Released,
  };
};
