import { Meta, StoryObj } from "@storybook/react";
import { EpisodeCardSkeleton } from "./index";

export default {
  title: "Components/Episode Card Skeleton",
  component: EpisodeCardSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof EpisodeCardSkeleton>;

type Story = StoryObj<typeof EpisodeCardSkeleton>;

export const Skeleton: Story = {};
