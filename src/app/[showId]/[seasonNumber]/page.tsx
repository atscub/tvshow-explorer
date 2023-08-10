import { EpisodeDetailsSidebar } from "@/components/episode-details-sidebar";
import { getSeason } from "@/services/season";
import { EpisodeCarousel } from "@/components/episode-carousel";
import { getShow } from "@/services/show";
import { Suspense } from "react";

export default async function SeasonPage({
  params: { showId, seasonNumber },
  searchParams,
}: {
  params: { showId: string; seasonNumber: number };
  searchParams: Record<string, string>;
}) {
  const episode = searchParams["episode"];
  const show = await getShow(showId);
  const seasonPromise = getSeason(showId, Number(seasonNumber));

  return (
    <main className="flex h-screen w-screen sm:flex-row flex-col items-stretch">
      <section className="main-container relative min-w-0 min-h-screen w-full">
        <img
          className="opacity-60 -z-10 absolute w-full h-full object-cover"
          src={show.poster ?? ""}
          alt={show.title}
          loading="lazy"
        />
        <div className="h-full flex flex-col justify-end gap-4 sm:gap-[52px]">
          <div className="season-info-container max-w-full px-8 md:px-24 text-white">
            <h2 className="text-2xl -mb-2">Season {seasonNumber}</h2>
            <h1 className="text-7xl font-bold pt-4 -mb-1 break-words hyphens-auto">
              {show.title}
            </h1>
            <p className="text-2xl max-w-[490px]">{show.plot}</p>
          </div>
          <Suspense
            fallback={
              <EpisodeCarousel episodes={Array(12).fill("placeholder")} />
            }
          >
            <CarouselSection
              seasonPromise={seasonPromise}
              selectedEpisode={episode ? Number(episode) : undefined}
            />
          </Suspense>
        </div>
      </section>
      {episode && (
        <EpisodeDetailsSidebar
          episode={
            ((await seasonPromise) as Season).episodes![Number(episode) - 1]
          }
        />
      )}
    </main>
  );
}

async function CarouselSection({
  seasonPromise,
  selectedEpisode,
}: {
  seasonPromise: Promise<Season>;
  selectedEpisode?: number;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 60000));
  const season = await seasonPromise;
  return (
    <EpisodeCarousel
      className="max-w-full px-4 pt-[68px] md:pl-[76px]"
      episodes={season.episodes ?? []}
      selectedEpisode={selectedEpisode}
    />
  );
}
