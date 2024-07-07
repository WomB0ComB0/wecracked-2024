import connect from '@/utils/db';
import Post from '@/models/posts';
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import env from '@/env';

export const GET = async (req: NextRequest) => {
  if (req.headers.get('NEXT_PUBLIC_API_KEY') !== env.NEXT_PUBLIC_API_KEY) {
		return NextResponse.json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			}
		);
	}
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  await connect();
  const posts = await Post.find({
    where: { title: { contains: query } },
  });
  return NextResponse.json(posts);
};