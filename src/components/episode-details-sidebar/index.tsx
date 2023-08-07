"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import notFoundPoster from "@/assets/image-not-found.png";
import goldStart from "@/assets/gold-star.svg";

interface EpisodeDetailsSidebarProps
  extends React.ComponentPropsWithoutRef<"article"> {
  episode: Failable<Episode>;
}

export const EpisodeDetailsSidebar: React.FC<EpisodeDetailsSidebarProps> = ({
  episode: episodeProp,
  className,
  ...rest
}) => {
  const episode: Episode = {
    id: "0",
    name: "Episode not found",
    plot: "Episode not found",
    poster: notFoundPoster.src,
    episodeNumber: NaN,
    rating: NaN,
    airDate: "unknown",

    ...episodeProp,
  };
  return (
    <article
      className={`episode-details-sidebar min-w-[400px] max-w-[513px] h-screen flex flex-col bg-white ${
        className ? className : ""
      }`}
      {...rest}
    >
      <header className="poster-holder w-full aspect-square relative ">
        <Image
          src={episode.poster}
          alt={episode.name}
          layout="fill"
          objectFit="cover"
        />
      </header>

      <section className="flex flex-row justify-between items-center pt-12 px-9 pb-10">
        <p className="text-lg/4 pt-[6px]">
          Episode {episode.episodeNumber} - {episode.airDate}
        </p>
        <p className="flex flex-row items-center gap-4">
          <Image src={goldStart} alt="rating" />
          <span className="text-lg/4 pt-[6px]">
            <b>{episode.rating}</b>/10
          </span>
        </p>
      </section>

      <hr className="h-[1px] text-gray-400" />

      <section className="flex flex-col gap-2 pt-12 px-9 pb-10">
        <h1 className="text-[27px] font-bold leading-8">{episode.name}</h1>
        <p className="text-lg leading-5">{episode.plot}</p>
      </section>
    </article>
  );
};
