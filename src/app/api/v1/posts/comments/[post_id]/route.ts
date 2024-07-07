import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Post from '@/models/posts';
import connect from '@/utils/db';
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
	const comments = await Post.find({
		where: { postId: params.post_id },			
	});
	return NextResponse.json(comments);
};