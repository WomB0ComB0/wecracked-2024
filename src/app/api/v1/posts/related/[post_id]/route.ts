import connect from '@/utils/db';
import Post from '@/models/posts';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import env from '@/env';

export const GET = async (req: NextRequest, res: NextResponse, { params }: { params: { post_id: string } }) => {
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
	const relatedPosts = await Post.find({
		where: {
			type: "RELATED",
			id: { not: params.post_id },
		},
	});
	return NextResponse.json(relatedPosts);
};