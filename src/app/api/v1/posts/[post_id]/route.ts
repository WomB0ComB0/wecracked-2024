import { prisma } from '@/lib';
import { NextResponse } from 'next/server';
export const GET = async ({ params }: { params: { post_id: string } }) => {
	const post = await prisma.post.findUnique({
		where: { id: params.post_id },
	});
	return NextResponse.json(post);
};