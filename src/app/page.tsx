// create a simple page a form receiving show title and season number
// and redirect to the season page

export default async function HomePage() {
  // create a form with a title and season number

  return (
    <main className="flex flex-col mx-auto h-screen w-[400px] items-center justify-center text-white gap-20">
      <div>
        <h1 className="text-4xl font-bold">Search for a TV Show</h1>
        <p>
          This page is not formated since it wasn&apos;t part of the assignment.
          However its included for convenience of searching a show
        </p>
      </div>
      <form
        method="GET"
        action="/search"
        className="main-container relative grid flex-col gap-4 w-full"
      >
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
