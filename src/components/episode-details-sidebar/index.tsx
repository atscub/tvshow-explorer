"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import goldStart from "@/assets/gold-star.svg";
import { isFailed } from "@/typeguards";
import { EPISODE_NOT_FOUND } from "../episode-card";
import { getFullEpisode } from "@/clientServices/full-episode";
import Placeholder from "../placeholder";

interface EpisodeDetailsSidebarProps
  extends React.ComponentPropsWithoutRef<"article"> {
  episode: Failable<Episode>;
}

export const EpisodeDetailsSidebar: React.FC<EpisodeDetailsSidebarProps> = ({
  episode: episodeProp,
  className,
  ...rest
}) => {
  const [episode, setEpisode] = useState(() =>
    !isFailed(episodeProp) ? episodeProp : EPISODE_NOT_FOUND
  );

  useEffect(() => {
    const episode = !isFailed(episodeProp) ? episodeProp : EPISODE_NOT_FOUND;
    setEpisode(episode);
    if (!isFailed(episode) && !episode.poster && !episode.plot) {
      getFullEpisode(episode.id)
        .then((data) => {
          setEpisode({ ...episode, ...data });
        })
        .catch(() => {
          setEpisode({ ...EPISODE_NOT_FOUND, ...episode });
        });
    }
  }, [episodeProp]);

  return (
    <article
      className={`episode-details-sidebar w-full sm:min-w-[300px] xl:max-w-[513px] h-screen flex flex-col bg-white ${
        className ? className : ""
      }`}
      {...rest}
    >
      <header className="bg-black poster-holder w-full aspect-square relative ">
        {episode.poster ? (
          <img
            src={episode.poster}
            alt={episode.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Placeholder />
        )}
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
        <h1 className="text-[27px] font-bold leading-8">{episode.title}</h1>
        <p className="text-lg leading-5">{episode.plot}</p>
      </section>
    </article>
  );
};
