"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { EpisodeCard } from "../episode-card";
import arrow from "./arrow.svg";
import { isFailed } from "@/typeguards";
import { getStylePixelValue } from "@/utils";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";

interface EpisodeCarouselProps extends React.ComponentPropsWithoutRef<"div"> {
  episodes: Failable<Episode>[];
}

export const EpisodeCarousel: React.FC<EpisodeCarouselProps> = ({
  episodes,
  className,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const episode = searchParams.get("episode");
  const router = useRouter();

  const carouselRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(carouselRef, () => {
    setSelectedIndex(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("episode");
    router.push(url.toString());
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    episode ? Number(episode) - 1 : null
  );

  const [pages, setPages] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= pages - 1;

  const previousPage = () => setCurrentPage(currentPage - 1);
  const nextPage = () => setCurrentPage(currentPage + 1);

  const { width } = useWindowSize();
  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const innerContainer = container.querySelector(
        ".episode-carousel-cards"
      )!;

      const containerWidth = getStylePixelValue(container, "width");
      const innerWidth =
        innerContainer.scrollWidth +
        getStylePixelValue(container, "padding-left") +
        getStylePixelValue(container, "padding-right");

      setPageWidth(containerWidth);
      setTotalWidth(innerWidth);
      setPages(innerWidth / containerWidth);
    }
  }, [width]);

  const episodeClicked = (index: number) => {
    setSelectedIndex(index);

    const episode = episodes[index];
    if (!isFailed(episode)) {
      const url = new URL(window.location.href);
      url.searchParams.set("episode", String(index + 1));
      router.push(url.toString());
    }
  };

  return (
    <div
      ref={carouselRef}
      className={`episode-carousel p-8 overflow-hidden ${
        className ? className : ""
      }`}
      {...rest}
    >
      <div
        className="episode-carousel-cards flex flex-row gap-8 [&>*]:shrink-0 w-auto relative transition-transform"
        style={{
          transform: `translateX(-${Math.min(
            currentPage * pageWidth,
            totalWidth - pageWidth
          )}px)`,
        }}
      >
        {episodes.map((episode, index) => (
          <EpisodeCard
            key={!isFailed(episode) ? episode.id : `${episode.error}.${index}`}
            className="hover:cursor-pointer hover:scale-110 transition-all transform-gpu first:origin-left last:origin-right"
            episode={episode}
            focused={selectedIndex == index}
            onClick={() => episodeClicked(index)}
          />
        ))}
      </div>
      <div className="arrows mt-6 flex flex-row justify-end items-center gap-[15px]">
        <button
          disabled={isFirstPage}
          className="disabled:opacity-20"
          onClick={previousPage}
        >
          <Image className="rotate-180" src={arrow} alt="arrow" />
        </button>
        <button
          disabled={isLastPage}
          className="disabled:opacity-20"
          onClick={nextPage}
        >
          <Image src={arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};
