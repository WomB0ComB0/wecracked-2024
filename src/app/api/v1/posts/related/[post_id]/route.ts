import connect from '@/utils/db';
import Post from '@/models/posts';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { post_id: string } }) => {
	await connect();
	const relatedPosts = await Post.find({
		where: {
			type: "RELATED",
			id: { not: params.post_id },
		},
	});
	return NextResponse.json(relatedPosts);
};