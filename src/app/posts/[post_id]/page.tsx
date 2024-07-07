import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ParsedUrlQuery } from 'querystring';

interface Post {
  title: string;
  description: string;
  content: string;
}

interface PostPageProps {
  post: Post;
}

interface Params extends ParsedUrlQuery {
	post_id: string;
  }
  

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Card className="mx-auto max-w-3xl p-4">
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription className="text-gray-500">{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed">{post.content}</div>
        <div className="mt-4">
          <Button onClick={() => router.back()} variant="outline">Go Back</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { post_id } = context.params!;

  const apiUrl = process.env.API_URL;

  // Fetch post data from an API or database here
  const post: Post = await fetch(`${apiUrl}/posts/${post_id}`).then(res => res.json());

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
