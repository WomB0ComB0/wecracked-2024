import { prisma } from '@/lib';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { post_id: string } }) => {
	const post = await prisma.post.findUnique({
		where: { id: params.post_id },
	});
	const relatedPosts = await prisma.post.findMany({
		where: {
			type: "RELATED",
			id: { not: params.post_id },
		},
	});
	return NextResponse.json(relatedPosts);
};