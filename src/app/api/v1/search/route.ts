import connect from '@/utils/db';
import Post from '@/models/posts';
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  await connect();
  const posts = await Post.find({
    where: { title: { contains: query } },
  });
  return NextResponse.json(posts);
};