import { prisma } from '@/lib';
import { NextResponse } from 'next/server';

export const GET = async ({ params }: { params: { post_id: string } }) => {
	const comments = await prisma.comments.findMany({
		where: { postId: params.post_id },			
	});
	return NextResponse.json(comments);
};