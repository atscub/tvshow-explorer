// create a simple page a form receiving show title and season number
// and redirect to the season page

export default async function HomePage() {
  // create a form with a title and season number

  return (
    <main className="flex flex-col mx-auto h-screen w-[400px] items-center justify-center text-white gap-20">
      <div>
        <h1 className="text-4xl font-bold">Search for a TV Show</h1>
        <p>
          Use this ugly home page to search for a TV Show and get all the
          episodes in a season. The intention is to showcase the design for the
          season page.
        </p>
      </div>
      <form
        method="GET"
        action="/search"
        className="main-container relative grid flex-col gap-4 w-full"
      >
        <h3 className="text-xl font-bold mb-4">Give it a try: 👇</h3>
        <div className="flex flex-row gap-4">
          <label>Tv Show Title: </label>
          <input className="grow text-black" type="text" name="title" />
        </div>
        <div className="flex flex-row gap-4">
          <label>Season: </label>
          <input className="grow text-black" type="text" name="season" />
        </div>
        <button className="btn btn-blue" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
