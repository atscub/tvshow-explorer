interface EpisodeParams {
  showTitle: string;
  seasonNumber: number;
  episodeNumber: number;
}

export const getEpisode = async ({
  showTitle,
  seasonNumber,
  episodeNumber,
}: EpisodeParams): Promise<Episode> => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&t=${showTitle}&Season=${seasonNumber}&Episode=${episodeNumber}&plot=short`
  );
  const episode = await response.json();
  if (episode.Response === "False") {
    throw new Error(episode.Error);
  }

  return {
    id: episode.imdbID,
    episodeNumber: episode.Episode,
    name: episode.Title,
    plot: episode.Plot,
    poster: episode.Poster,
    rating: episode.imdbRating,
    airDate: episode.Released,
  };
};
