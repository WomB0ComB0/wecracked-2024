import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import env from '@/env';

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
    <div className="container mx-auto p-4 bg-[#133443] text-[#fdfefe]">
      <h1 className="text-4xl font-bold mb-8 text-[#e9f7f9]">Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 bg-[#406a7b]">
            <CardHeader>
              <CardTitle className="text-[#e9f7f9]">{post.title}</CardTitle>
              <CardDescription className="text-[#e9f7f9]">{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/posts/${post.id}`}>
                <a className="text-[#fdfefe] hover:underline">Read more</a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  const apiUrl = env.API_URL;

  try {
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts: Post[] = await response.json();

    return {
      props: {
        posts,
      },
      revalidate: 60, // Revalidate the data at most every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default PostsPage;
