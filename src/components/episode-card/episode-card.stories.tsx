import { Meta, StoryObj } from "@storybook/react";
import { EpisodeCard } from "./index";

export default {
  title: "Components/Episode Card",
  component: EpisodeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof EpisodeCard>;

type Story = StoryObj<typeof EpisodeCard>;

const mockedEpisodeInfo = {
  id: 1,
  episodeNumber: 1,
  name: "Insecure as fuck",
  plot: "In the wake of her 29th birthday, Issa  eflects on her life and relationship choices.",
  poster:
    "https://hbomax-images.warnermediacdn.com/images/GV7xd1QpvacJfPwEAAAGJ/tile?size=1280x720&format=jpeg&partner=hbocom&v=99498c61e3af003c9450b6e0ce0b9288&host=art-gallery.api.hbo.com&w=201",
  rating: 8.1,
  airDate: "2017-09-25",
};

export const Focused: Story = {
  args: {
    focused: true,
    episode: mockedEpisodeInfo,
  },
};

export const Blurred: Story = {
  args: {
    ...Focused.args,
    focused: false,
  },
};

export const NotFound: Story = {
  args: {
    focused: true,
    episode: {
      error: "Series or episode not found",
    },
  },
};
