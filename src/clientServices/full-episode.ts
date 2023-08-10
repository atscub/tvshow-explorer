export const getFullEpisode = async (episodeId: string) => {
  const res = await fetch(`/api/full-episode/${episodeId}`);

  if (res.ok) {
    const data = await res.json();
    return data as Episode;
  } else {
    throw new Error("Failed to fetch episode");
  }
};
