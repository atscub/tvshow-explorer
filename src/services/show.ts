import { getBackdropPath } from "./backdrop";

interface ShowParams {
  showTitle: string;
}

export const getShow = async (
  showId: string,
  byTitle: boolean = false
): Promise<Show> => {
  const [response, backdrop] = await Promise.all([
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&${
        byTitle ? "t" : "i"
      }=${showId}`
    ),
    getBackdropPath(showId),
  ]);
  const show = await response.json();
  if (show.Response === "False") {
    throw new Error(show.Error);
  }

  return {
    id: show.imdbID,
    title: show.Title,
    plot: show.Plot,
    poster: backdrop
      ? `https://image.tmdb.org/t/p/w1280${backdrop}`
      : show.Poster,
    rating: show.imdbRating,
  };
};
