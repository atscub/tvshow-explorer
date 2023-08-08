import Image from "next/image";
import { Default } from "@/components/episode-carousel/episode-carousel.stories";
import { EpisodeDetailsSidebar } from "@/components/episode-details-sidebar";
import { getSeason } from "@/api/season";
import { EpisodeCarousel } from "@/components/episode-carousel";
import { getShow } from "@/api/show";

export default async function Home({
  params: { showId, seasonNumber },
  searchParams,
}: {
  params: { showId: string; seasonNumber: number };
  searchParams: Record<string, string>;
}) {
  const episode = searchParams["episode"];
  const [show, season] = await Promise.all([
    getShow(showId),
    getSeason(showId, Number(seasonNumber)),
  ]);

  return (
    <main className="flex h-screen w-screen sm:flex-row flex-col items-stretch">
      <section className="main-container relative min-w-0 min-h-screen">
        <Image
          className="opacity-60 -z-10 absolute"
          src={show.poster ?? ""}
          alt={show.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="h-full flex flex-col justify-end gap-11 sm:gap-[88px]">
          <div className="season-info-container max-w-full px-8 md:px-24 text-white">
            <h2 className="text-2xl -mb-2">Season {season.seasonNumber}</h2>
            <h1 className="text-7xl font-bold pt-4 -mb-1">{show.title}</h1>
            <p className="text-2xl max-w-[490px]">{show.plot}</p>
          </div>
          <EpisodeCarousel
            className="max-w-full px-4 md:pl-[76px]"
            episodes={season.episodes ?? []}
            selectedEpisode={episode ? Number(episode) : undefined}
          />
        </div>
      </section>
      {episode && (
        <EpisodeDetailsSidebar
          episode={(season as Season).episodes![Number(episode) - 1]}
        />
      )}
    </main>
  );
}
