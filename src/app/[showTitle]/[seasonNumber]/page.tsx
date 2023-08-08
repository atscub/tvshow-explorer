import Image from "next/image";
import { Default } from "@/components/episode-carousel/episode-carousel.stories";
import { EpisodeDetailsSidebar } from "@/components/episode-details-sidebar";
import { getSeason } from "@/api/season";
import { EpisodeCarousel } from "@/components/episode-carousel";
import { getShow } from "@/api/show";

export default async function Home({
  params: { showTitle, seasonNumber },
}: {
  params: { showTitle: string; seasonNumber: number };
}) {
  const show = await getShow(showTitle);
  const season = await getSeason(showTitle, Number(seasonNumber));

  return (
    <main className="flex h-screen w-screen flex-row items-stretch">
      <section className="main-container relative min-w-0">
        <Image
          className="opacity-60 -z-10 absolute"
          src={show.poster}
          alt={show.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="h-full flex flex-col justify-end gap-[88px]">
          <div className="season-info-container ml-24 text-white">
            <h2 className="text-2xl -mb-2">Season {season.seasonNumber}</h2>
            <h1 className="text-7xl font-bold pt-4 -mb-1">{show.title}</h1>
            <p className="text-2xl w-[490px]">{show.plot}</p>
          </div>
          <EpisodeCarousel
            className="max-w-full pl-[76px]"
            episodes={season.episodes ?? []}
          />
        </div>
      </section>
      <EpisodeDetailsSidebar episode={(season as Season).episodes![0]} />
    </main>
  );
}
