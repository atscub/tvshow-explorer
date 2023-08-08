import { Meta, StoryObj } from "@storybook/react";
import { EpisodeCarousel } from "./index";
import { NotFound } from "../episode-card/episode-card.stories";

export default {
  title: "Components/Episode Carousel",
  component: EpisodeCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof EpisodeCarousel>;

type Story = StoryObj<typeof EpisodeCarousel>;

const mockedEpisodes = [
  {
    id: "tt5038246",
    episodeNumber: 1,
    title: "Insecure as Fuck",
    plot: "In the wake of her 29th birthday, Issa reflects on her life and relationship choices.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNTMxMTUwNTgxOV5BMl5BanBnXkFtZTgwMTk5MDYyMDI@._V1_SX900.jpg",
    rating: 7.3,
    airDate: "09 Oct 2016",
  },
  {
    id: "tt5149554",
    episodeNumber: 2,
    title: "Messy as Fuck",
    plot: "Issa struggles with her feelings about Lawrence, work, and her life.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzE1MzQ5Njc5NV5BMl5BanBnXkFtZTgwODUwMTYyMDI@._V1_SX300.jpg",
    rating: NaN,
    airDate: "16 Oct 2016",
  },
  {
    id: "tt5730706",
    episodeNumber: 3,
    title: "Racist as Fuck",
    plot: "Issa and Lawrence try to move past their issues at home; Issa deals with doubts from her colleagues; Lawrence gets a reality check from a headhunter; Molly introduces Jared to her friends.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMmQ3YzM2MTItOTNlNS00YjExLWEwMTEtMDdhZTI3OTJjM2RjL2ltYWdlXkEyXkFqcGdeQXVyNzIyMjk4NjA@._V1_SX300.jpg",
    rating: NaN,
    airDate: "23 Oct 2016",
  },
  { ...NotFound.args?.episode!, episodeNumber: 4 },
  {
    id: "tt5751538",
    episodeNumber: 5,
    title: "Shady as Fuck",
    plot: 'Issa searches for a way to get her open mic video taken down; Issa reconnects with Daniel; Lawrence faces questions about his future with Issa; Molly invites her "perfect guy" to a coworkers engagement party.',
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzg4Y2QyZTAtYWJmZC00MDFkLWI3ZmEtNjg4N2I4MDJjYzViL2ltYWdlXkEyXkFqcGdeQXVyNzIyMjk4NjA@._V1_SX300.jpg",
    rating: NaN,
    airDate: "06 Nov 2016",
  },
  { ...NotFound.args?.episode!, episodeNumber: 6 },
  {
    id: "tt5760682",
    episodeNumber: 7,
    title: "Real as Fuck",
    plot: "[HBO] HD. 'Real as F**k.' (Season One) Issa deals with drama at a work fundraiser; later, she clashes with Molly over life choices.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZGE0OGQ3OGYtN2ViMC00NjU1LTg1MWYtODk5ODlhM2E5ODMyL2ltYWdlXkEyXkFqcGdeQXVyNzIyMjk4NjA@._V1_SX300.jpg",
    rating: NaN,
    airDate: "20 Nov 2016",
  },
];

export const Default: Story = {
  args: {
    episodes: mockedEpisodes,
  },
};

export const Constrained: Story = {
  args: {
    episodes: mockedEpisodes,
    className: "m-8 w-[400px]",
  },
};
