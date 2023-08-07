declare type Failed = {
  error: any;
};

declare type Failable<T> = T | Failed;

declare interface Episode {
  id: number | string;
  episodeNumber: number;
  name: string;
  plot: string;
  poster: string;
  rating: number;
  airDate: string;
}

declare interface Season {
  id: number | string;
  seasonNumber: number;
  name: string;
  episodes?: Failable<Episode>[];
}

declare interface Show {
  id: number | string;
  name: string;
  plot: string;
  poster: string;
  rating: number;
  seasons?: Failable<Season>[];
}
