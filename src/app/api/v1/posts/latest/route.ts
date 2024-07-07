import { prisma } from '@/lib';
import type { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: 'desc' },
	});
};
