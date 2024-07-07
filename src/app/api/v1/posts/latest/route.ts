import connect from '@/utils/db';
import Post from '@/models/posts';
import type { NextRequest } from 'next/server';
import env from '@/env';
import { NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
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
	const posts = await Post.find({
		orderBy: { createdAt: 'desc' },
	});
	return NextResponse.json(posts);
};
