import { NextResponse } from 'next/server';
import Post from '@/models/posts';
import connect from '@/utils/db';
export const GET = async ({ params }: { params: { post_id: string } }) => {
	await connect();
	const comments = await Post.find({
		where: { postId: params.post_id },			
	});
	return NextResponse.json(comments);
};