An interface for visualizing a season of a TV show with all its episodes.

## Getting Started

1. Create a `.env` file with the following content:

   ```bash
   OMDB_API_KEY=<API_KEY>
   THEMOVIEDB_API_KEY=<API_KEY>
   THEMOVIEDB_API_READ_ACCESS_TOKEN=<API_TOKEN>
   ```

   I will send the actual keys by email ;)

1. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Pages

The application has two pages:

- `/`: The main page with a very simple form to search for a TV show.
- `/[id]/[episode]`: The page with the carousel of episodes for a given TV show and season.

## Storybook

We are using storybook for component development. To run it, use the following command:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

Storybook should open in your browser.

## Tests

We are using jest and react-testing-library for testing. To run the tests, use the following command:

```bash
npm run test
# or
yarn test
# or
pnpm test
```

or to run the tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
# or
pnpm test:watch
```

## Styling

We use **tailwindcss** for styling.

## NEXT 13

We are using next 13 with the app router and server components (where it makes sense).

We are calling the API in the server component to avoid exposing the API key in the client, and for a more efficient rendering of the page. However if there would be a need for calling the apis in the client, we could create proxy server api routes to protect the API keys.

Even with a public API, we should protect our keys to prevent abuse.

## Implementation notes

I identified two main problems with the API:

1. It only includes plot and poster information for the episodes when requesting a single episode, which requires sending individual requests for every episode to show in the carousel.

   **Solution**: Fetch the episodes with limited concurrency (5 by default). I chose [p-limit](https://github.com/sindresorhus/p-limit) library by its broad popularity. Other options included a simple implementation with iterators, but I decided to go with a well-tested library. We have tree shaking in Next.js, so the bundle size should not be significantly affected by this choice.

1. The API is missing some episodes, for example, episodes 4 and 6 in the Figma design.

   **Solution**: There are two options here, either show the episodes that are available or show a placeholder for the missing episodes. I chose the latter, but in a real environment should be discussed with the team for the best approach.

1. The API does not include images in landscape mode (backdrop) for the episodes.

   **Solution**: We are using themoviedb for backdrops. The posters provided by OMDB in portrait mode is used as a fallback.

## Next steps

1. Add more tests, especially for the components.
1. Add more documentation.
1. Add a CI/CD pipeline.
1. Add pre-commit hooks for eslint and prettier.
1. (optional) Deploy to Vercel.
