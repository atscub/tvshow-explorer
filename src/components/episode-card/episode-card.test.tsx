import { render, screen } from "@testing-library/react";
import { composeStories, composeStory } from "@storybook/react";
import * as stories from "./episode-card.stories";
import { EPISODE_NOT_FOUND } from "./index";
import "@testing-library/jest-dom";

const { Focused, Blurred, NotFound } = composeStories(stories);

describe("EpisodeCard", () => {
  it("renders episode number poster, title and plot", () => {
    const { container } = render(<Focused />);
    const episodeData = (Focused.args.episode as Episode)!;

    expect(screen.getByRole("article")).toHaveClass("focused");

    const poster = container.querySelector("img");
    expect(poster).toHaveAttribute("src");
    expect(poster).toHaveAttribute("alt", episodeData.title);

    expect(screen.getByText(episodeData.title)).toBeVisible();
    expect(screen.getByText(episodeData.plot)).toBeVisible();
    expect(screen.getByText(episodeData.episodeNumber)).toBeVisible();
  });

  it("has un focused state", () => {
    render(<Blurred />);
    expect(screen.getByRole("article")).not.toHaveClass("focused");
  });

  it("renders not found poster when episode is not found", () => {
    const { container } = render(<NotFound />);
    const episodeData = (NotFound.args.episode as Episode)!;

    const poster = container.querySelector("img");
    expect(poster).toHaveAttribute("alt", EPISODE_NOT_FOUND.title);

    expect(screen.getByText(EPISODE_NOT_FOUND.title)).toBeVisible();
    expect(screen.getByText(EPISODE_NOT_FOUND.plot)).toBeVisible();
    expect(screen.getByText("?")).toBeVisible();
  });
});
