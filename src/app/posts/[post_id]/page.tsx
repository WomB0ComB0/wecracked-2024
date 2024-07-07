"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostSchema } from "@/schema/posts";
import { z } from "zod";

async function fetchPost(post_id: string): Promise<z.infer<typeof PostSchema>> {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${post_id}`);
  const post = await response.json();
  return post;
}

interface PostPageProps {
  params: {
    post_id: string;
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { post_id } = params;
  //Dummy data
//   const posts = [
//     {
//       type: "FEATURED",
//       title: "First Post",
//       description: "This is the first post",
//       image: "https://example.com/image1.jpg",
//       content: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//     Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//   `,
//       userId: 1,
//     },
//     {
//       type: "LATEST",
//       title: "Second Post",
//       description: "This is the second post",
//       image: "https://example.com/image2.jpg",
//       content: `
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//     Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//     Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//   `,
//       userId: 2,
//     },
//   ];
  const post = await fetchPost(post_id);
//   const post = posts[parseInt(post_id)];
  const router = useRouter();
  return (
    <Card className="mx-auto max-w-3xl p-4 bg-[#e9f7f9]">
      <CardHeader>
        <CardTitle className="text-3xl text-[#133443]">{post.title}</CardTitle>
        <CardDescription className="text-[#406a7b]">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed">{post.comments}</div>
        <div className="mt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-[#133443] border-[#133443]"
          >
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPage;
