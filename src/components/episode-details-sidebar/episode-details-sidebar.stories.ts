import { Meta, StoryObj } from "@storybook/react";
import { EpisodeDetailsSidebar } from "./index";

export default {
  title: "Components/Episode Details Sidebar",
  component: EpisodeDetailsSidebar,
  parameters: {
    layout: "right",
  },
  tags: ["autodocs"],
} as Meta<typeof EpisodeDetailsSidebar>;

type Story = StoryObj<typeof EpisodeDetailsSidebar>;

const mockedEpisodeInfo = {
  id: 1,
  episodeNumber: 1,
  title: "Insecure as fuck",
  plot: "In the wake of her 29th birthday, Issa  eflects on her life and relationship choices.",
  poster:
    "https://hbomax-images.warnermediacdn.com/images/GV7xd1QpvacJfPwEAAAGJ/tile?size=1280x720&format=jpeg&partner=hbocom&v=99498c61e3af003c9450b6e0ce0b9288&host=art-gallery.api.hbo.com&w=201",
  rating: 8.1,
  airDate: "2017-09-25",
};

export const Default: Story = {
  args: {
    episode: mockedEpisodeInfo,
  },
};
