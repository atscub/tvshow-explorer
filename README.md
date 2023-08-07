An interface for visualizing a season of a TV show with all its episodes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Implementation notes

I identified two main problems with the API:

1. It only includes plot and poster information for the episodes when requesting a single episode, which requires sending individual requests for every episode to show in the carousel.

   **Solution**: Fetch the episodes with limited concurrency (5 by default). I chose [p-limit](https://github.com/sindresorhus/p-limit) library by its broad popularity. Other options included a simple implementation with iterators, but I decided to go with a well-tested library. We have tree shaking in Next.js, so the bundle size should not be significantly affected by this choice.

1. The API is missing some episodes, for example, episodes 4 and 6 in the Figma design.

   **Solution**: There are two options here, either show the episodes that are available or show a placeholder for the missing episodes. I chose the latter, but in a real environment should be discussed with the team for the best approach.
