import { getEpisode } from "@/services/episode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { episodeId: string } }
) {
  const episode = await getEpisode(params.episodeId);
  return NextResponse.json(episode);
}
