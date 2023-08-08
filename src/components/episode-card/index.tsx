"use client";
import Image from "next/image";
import React, { ComponentPropsWithoutRef } from "react";

import notFoundPoster from "@/assets/image-not-found.png";

interface EpisodeCardProps extends ComponentPropsWithoutRef<"article"> {
  focused?: boolean;
  episode: Failable<Episode>;
}

export const EPISODE_NOT_FOUND: Episode = {
  id: "0",
  title: "Episode not found",
  plot: "We could not find any information for this episode.",
  poster: notFoundPoster.src,
  episodeNumber: NaN,
  rating: NaN,
  airDate: "unknown",
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode: episodeProp,
  focused = false,
  className,
  ...rest
}) => {
  const episode: Episode = {
    ...EPISODE_NOT_FOUND,
    ...episodeProp,
  };

  return (
    <article
      className={`episode-card w-[201px] ${className} ${
        focused ? "focused" : ""
      }`}
      {...rest}
    >
      <header className="mb-5">
        <div className="episode-number w-[30px] h-[30px] bg-white absolute flex justify-center items-center z-10">
          <span className="font-bold text-base text-black mt-1">
            {!isNaN(episode.episodeNumber) ? episode.episodeNumber : "?"}
          </span>
        </div>
        <div className="bg-black">
          <Image
            width={201}
            height={201 / 1.5}
            className={[
              "w-full aspect-video-thumb object-cover",
              focused ? "opacity-100" : "opacity-40",
            ].join(" ")}
            src={episode.poster ? episode.poster : notFoundPoster.src}
            alt={episode.title}
          />
        </div>
      </header>
      <section className="card-body text-white">
        <h1 className="text-title-15 align-middle mb-[10px]">
          {episode.title}
        </h1>
        <p className="text-body-13 overflow-ellipsis line-clamp-3 opacity-80">
          {episode.plot}
        </p>
      </section>
    </article>
  );
};
