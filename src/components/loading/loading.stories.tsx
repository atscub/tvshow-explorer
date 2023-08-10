import { Meta, StoryObj } from "@storybook/react";
import Loading from "./index";

export default {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof Loading>;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    word: "Loading",
  },
};
