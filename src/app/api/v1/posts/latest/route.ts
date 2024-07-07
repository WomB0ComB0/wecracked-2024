import connect from '@/utils/db';
import Post from '@/models/posts';
import { NextResponse } from 'next/server';

export const GET = async () => {
	await connect();
	const posts = await Post.find({
		orderBy: { createdAt: 'desc' },
	});
	return NextResponse.json(posts);
};
