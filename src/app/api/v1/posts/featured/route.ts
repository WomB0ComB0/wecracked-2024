import { prisma } from '@/lib';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				type: "FEATURED",
			},
		});

		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
