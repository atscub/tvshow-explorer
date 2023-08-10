import { Meta, StoryObj } from "@storybook/react";
import Placeholder from "./index";

export default {
  title: "Components/Placeholder",
  component: Placeholder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof Placeholder>;

type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {
  args: {
    className: "w-20 h-20",
  },
};
