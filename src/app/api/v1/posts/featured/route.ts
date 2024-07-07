import { type NextRequest, NextResponse } from 'next/server';
import connect from '@/utils/db';
import Post from '@/models/posts';

export const GET = async (req: NextRequest, res: NextResponse) => {
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
