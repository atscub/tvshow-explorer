"use client";
import React from "react";

type EpisodeCardProps = {
  focused?: boolean;
  episode: {
    id: number;
    episodeNumber: number;
    name: string;
    plot: string;
    poster: string;
    rating: number;
    air_date: string;
  };
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  focused = false,
}) => {
  return (
    <article className="episode-card w-[201px]">
      <header className="mb-5">
        <div className="episode-number w-[30px] h-[30px] bg-white absolute flex justify-center items-center z-10">
          <span className="font-bold text-base text-black mt-1">
            {episode.episodeNumber}
          </span>
        </div>
        <div className="bg-black">
          <img
            className={[
              "w-full aspect-video-thumb object-cover",
              focused ? "opacity-100" : "opacity-40",
            ].join(" ")}
            src={episode.poster}
            alt={episode.name}
          />
        </div>
      </header>
      <section className="card-body text-white">
        <h1 className="text-title-15 align-middle mb-[10px]">{episode.name}</h1>
        <p className="text-body-13 overflow-ellipsis line-clamp-3 opacity-80">
          {episode.plot}
        </p>
      </section>
    </article>
  );
};
