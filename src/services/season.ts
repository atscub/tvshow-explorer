export const getSeason = async (
  showId: string,
  seasonNumber: number
): Promise<Season> => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${showId}&Season=${seasonNumber}`
  );
  const remoteSeason = await response.json();
  if (remoteSeason.Response === "False") {
    throw new Error(remoteSeason.Error);
  }

  if (
    !remoteSeason.Episodes ||
    !(remoteSeason.Episodes instanceof Array) ||
    remoteSeason.Episodes.length === 0
  ) {
    throw new Error("No episodes found");
  }

  // const episodeIdMap = Object.fromEntries(
  //   remoteSeason.Episodes.map((episode: any) => [
  //     Number(episode.Episode),
  //     episode.imdbID,
  //   ])
  // );

  // const lastEpisodeNumber = Number(
  //   remoteSeason.Episodes[remoteSeason.Episodes.length - 1].Episode
  // );

  // // const episodes = [];
  // // for (let episodeNumber = 1; episodeNumber <= lastEpisodeNumber; episodeNumber++) {
  // //   const episodeId = episodeIdMap[episodeNumber];

  return {
    id: remoteSeason.Season,
    seasonNumber: remoteSeason.Season,
    episodes: remoteSeason.Episodes.map(
      (episode: any): Episode => ({
        id: episode.imdbID,
        episodeNumber: Number(episode.Episode),
        title: episode.Title,
        airDate: episode.Released,
        rating: Number(episode.imdbRating),
      })
    ),
  };
};
