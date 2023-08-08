import { getShow } from "@/api/show";
import { redirect, notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const season = request.nextUrl.searchParams.get("season") ?? "1";

  if (!title) {
    return notFound();
  }

  const show = await getShow(title, true);
  redirect(`/${show.id}/${season}`);
}
