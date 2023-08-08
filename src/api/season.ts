import pLimit from "p-limit";
import { getEpisode } from "./episode";

interface SeasonParams {
  showTitle: string;
  seasonNumber: number;
}

export const getSeason = async ({
  showTitle,
  seasonNumber,
}: SeasonParams): Promise<Season> => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${showTitle}&Season=${seasonNumber}`
  );
  const remoteSeason = await response.json();
  if (remoteSeason.Response === "False") {
    throw new Error(remoteSeason.Error);
  }

  if (!remoteSeason.Episodes || !(remoteSeason.Episodes instanceof Array)) {
    throw new Error("No episodes found");
  }

  const limit = pLimit(5);
  const episodePromises = (remoteSeason.Episodes as Array<any>).map(
    ({ Episode }: { Episode: string }) =>
      limit(() =>
        getEpisode({ showTitle, seasonNumber, episodeNumber: Number(Episode) })
      )
  );

  const episodes = (await Promise.allSettled(episodePromises)).map((res) =>
    res.status === "fulfilled" ? res.value : { error: res.reason }
  );

  return {
    id: remoteSeason.Season,
    seasonNumber: remoteSeason.Season,
    name: remoteSeason.Title,
    episodes: episodes,
  };
};
