import { type NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Post from '@/models/posts';
import env from '@/env';

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
	try {
		await connect();
		const posts = await Post.find({
			where: {
				type: "FEATURED",
			},
		});

		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
