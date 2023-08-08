interface ShowParams {
  showTitle: string;
}

export const getShow = async (showTitle: string): Promise<Show> => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${showTitle}`
  );
  const show = await response.json();
  if (show.Response === "False") {
    throw new Error(show.Error);
  }

  return {
    id: show.imdbID,
    title: show.Title,
    plot: show.Plot,
    poster: show.Poster,
    rating: show.imdbRating,
  };
};