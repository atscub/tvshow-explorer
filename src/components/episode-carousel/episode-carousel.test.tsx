import { render, screen } from "@testing-library/react";
import { composeStories, composeStory } from "@storybook/react";
import "@testing-library/jest-dom";

import * as stories from "./episode-carousel.stories";
const { Default, Constrained } = composeStories(stories);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("usehooks-ts", () => ({
  useMediaQuery: jest.fn(),
  useOnClickOutside: jest.fn(),
  useWindowSize: jest.fn(() => ({ width: 1660 })),
}));

describe("EpisodeCarousel", () => {
  it("renders episode carousel", () => {
    const { container } = render(<Default />);

    const carousel = container.querySelector(".episode-carousel");
    expect(carousel).not.toBeNull();

    const cards = carousel!.querySelectorAll("article");
    expect(cards).toHaveLength(Default.args.episodes!.length);

    expect(carousel!.querySelectorAll("article.focused")).toHaveLength(0);
    expect(carousel!.querySelectorAll("button")).toHaveLength(2);
  });
});
