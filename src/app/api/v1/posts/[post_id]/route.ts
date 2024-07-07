import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import Post from '@/models/posts';

export const GET = async ({ params }: { params: { post_id: string } }) => {
  await connect();
  const post = await Post.findById(params.post_id);
  return NextResponse.json(post);
};