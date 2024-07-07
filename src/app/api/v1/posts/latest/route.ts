import connect from '@/utils/db';
import Post from '@/models/posts';
import type { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
	await connect();
	const posts = await Post.find({
		orderBy: { createdAt: 'desc' },
	});
};
