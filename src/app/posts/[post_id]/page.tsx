import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ParsedUrlQuery } from 'querystring';
import { PostSchema } from '@/schema';
import { z } from 'zod';
import env from '@/env';
interface PostPageProps {
  post: z.infer<typeof PostSchema>;
}

interface Params extends ParsedUrlQuery {
  post_id: string;
}

export const generateMetadata = async ({ params }: { params: { post_id: string } }) => {
  const post = await fetch(`${env.API_URL}/posts/${params.post_id}`).then(res => res.json());
  return {
    title: post.title,
    description: post.description,
  };
};

export default async function PostPage( { params }: { params: Params }) {
  const router = useRouter();
  const { post_id } = params;
  const post = await fetch(`${env.API_URL}/posts/${post_id}`).then(res => res.json());
  return (
    <Card className="mx-auto max-w-3xl p-4">
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription className="text-gray-500">{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed">{post.comments}</div>
        <div className="mt-4">
          <Button onClick={() => router.back()} variant="outline">Go Back</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { post_id } = context.params!;

  const apiUrl = env.API_URL;

  // Fetch post data from an API or database here
  const post = await fetch(`${apiUrl}/posts/${post_id}`).then(res => res.json());

  return {
    props: {
      post,
    },
  };
};