import pLimit from "p-limit";
import { getEpisode } from "./episode";

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

  const lastEpisodeNumber = Number(
    remoteSeason.Episodes[remoteSeason.Episodes.length - 1].Episode
  );

  const limit = pLimit(5);
  const episodePromises = Array.from(Array(lastEpisodeNumber).keys()).map(
    (episodeNumber) =>
      limit(() => getEpisode(showId, seasonNumber, episodeNumber + 1))
  );

  const episodes = (await Promise.allSettled(episodePromises)).map((res, ind) =>
    res.status === "fulfilled"
      ? res.value
      : { episodeNumber: ind + 1, error: res.reason }
  );

  return {
    id: remoteSeason.Season,
    seasonNumber: remoteSeason.Season,
    episodes: episodes,
  };
};
