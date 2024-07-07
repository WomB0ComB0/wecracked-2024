import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connect from '@/utils/db';
import Post from '@/models/posts';
import env from '@/env';

export const GET = async (req: NextRequest, { params }: { params: { post_id: string } }) => {
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
	await connect();
  const post = await Post.findById(params.post_id);
  return NextResponse.json(post);
};