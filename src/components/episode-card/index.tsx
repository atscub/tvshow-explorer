"use client";
import Image from "next/image";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react";

import notFoundPoster from "@/assets/image-not-found.png";
import Placeholder from "../placeholder";
import { isFailed } from "@/typeguards";
import { getFullEpisode } from "@/clientServices/full-episode";

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

const paragraphPlaceholder = (
  <div>
    <div className="w-10/12 h-3 mb-1 bg-black">
      <Placeholder />
    </div>
    <div className="w-full h-3 mb-1 bg-black">
      <Placeholder />
    </div>
    <div className="w-6/12 h-3 mb-1 bg-black">
      <Placeholder />
    </div>
  </div>
);

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode: episodeProp,
  focused = false,
  className,
  ...rest
}) => {
  const [episode, setEpisode] = useState(() =>
    !isFailed(episodeProp) ? episodeProp : EPISODE_NOT_FOUND
  );

  useEffect(() => {
    if (!isFailed(episode) && !episode.poster && !episode.plot) {
      getFullEpisode(episode.id)
        .then((data) => {
          setEpisode({ ...episode, ...data });
        })
        .catch(() => {
          setEpisode({ ...EPISODE_NOT_FOUND, ...episode });
        });
    }
  }, [episode]);

  return (
    <article
      className={`episode-card w-[201px] select-none ${className} ${
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
          {episode.poster ? (
            <img
              className={[
                "w-full aspect-video-thumb object-cover",
                focused ? "opacity-100" : "opacity-40",
              ].join(" ")}
              src={episode.poster}
              alt={episode.title}
              loading="lazy"
            />
          ) : (
            <div
              className={[
                "w-full aspect-video-thumb object-cover",
                focused ? "opacity-100" : "opacity-40",
              ].join(" ")}
            >
              <Placeholder />
            </div>
          )}
        </div>
      </header>
      <section className="card-body text-white">
        <h1 className="text-title-15 align-middle mb-[10px]">
          {episode.title}
        </h1>
        {episode.plot !== undefined ? (
          <p className="text-body-13 overflow-ellipsis line-clamp-3 opacity-80">
            {episode.plot}
          </p>
        ) : (
          paragraphPlaceholder
        )}
      </section>
    </article>
  );
};

export const EpisodeCardSkeleton: React.FC = () => {
  return (
    <article className="episode-card w-[201px] select-none">
      <header className="mb-5">
        {/* <div className="episode-number w-[30px] h-[30px] bg-white absolute flex justify-center items-center z-10">
          <span className="font-bold text-base text-black mt-1">?</span>
        </div> */}
        <div className="bg-black w-full aspect-video-thumb object-cover">
          <Placeholder />
        </div>
      </header>
      <section className="card-body text-white">
        <h1 className="w-1/2 h-4 mb-4">
          <Placeholder />
        </h1>
        {paragraphPlaceholder}
      </section>
    </article>
  );
};
