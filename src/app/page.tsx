import { EpisodeCard } from "@/components/episode-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EpisodeCard
        episode={{
          id: 1,
          episodeNumber: 1,
          name: "Insecure as fuck",
          plot: "In the wake of her 29th birthday, Issa  eflects on her life and relationship choices.",
          poster:
            "https://hbomax-images.warnermediacdn.com/images/GV7xd1QpvacJfPwEAAAGJ/tile?size=1280x720&format=jpeg&partner=hbocom&v=99498c61e3af003c9450b6e0ce0b9288&host=art-gallery.api.hbo.com&w=201",
          rating: 8.1,
          air_date: "2017-09-25",
        }}
      />
    </main>
  );
}
