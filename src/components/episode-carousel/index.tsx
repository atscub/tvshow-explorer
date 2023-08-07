"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { EpisodeCard } from "../episode-card";
import arrow from "./arrow.svg";
import { isFailed } from "@/typeguards";

interface EpisodeCarouselProps extends React.ComponentPropsWithoutRef<"div"> {
  episodes: Failable<Episode>[];
}

export const EpisodeCarousel: React.FC<EpisodeCarouselProps> = ({
  episodes,
  className,
  ...rest
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const [pages, setPages] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= pages - 1;

  const goToPage = (page: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const innerContainer = container.querySelector(
        ".episode-carousel-cards"
      )!;

      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const innerContainer = container.querySelector(
        ".episode-carousel-cards"
      )!;

      const containerWidth = container.getBoundingClientRect().width;
      const innerWidth = innerContainer.scrollWidth;

      setPageWidth(containerWidth);
      setTotalWidth(innerWidth);
      setPages(innerWidth / containerWidth);
    }
  }, []);

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
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <div className="arrows mt-6 flex flex-row justify-end items-center gap-[15px]">
        <button
          disabled={isFirstPage}
          className="disabled:opacity-20"
          onClick={() => goToPage(currentPage - 1)}
        >
          <Image className="rotate-180" src={arrow} alt="arrow" />
        </button>
        <button
          disabled={isLastPage}
          className="disabled:opacity-20"
          onClick={() => goToPage(currentPage + 1)}
        >
          <Image src={arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};
