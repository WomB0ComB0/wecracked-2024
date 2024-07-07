import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  id: string;
  title: string;
  description: string;
}

interface PostsPageProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/posts/${post.id}`}>
                <a className="text-blue-500 hover:underline">Read more</a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostsPageProps> = async () => {
  const apiUrl = process.env.API_URL;

  const response = await fetch(`${apiUrl}/posts`);
  const posts: Post[] = await response.json();

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
