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
import env from "@/env";


const API_URL=env.API_URL
async function fetchPost(post_id: string): Promise<z.infer<typeof PostSchema>> {
  try {
    const response = await fetch(`${API_URL}/posts/${post_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
}

interface PostPageProps {
  params: {
    post_id: string;
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { post_id } = params;
  const post = await fetchPost(post_id);
  const router = useRouter();
  return (
    <Card className="mx-auto max-w-3xl p-4 bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed"></div>
        <div className="mt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="text-white border-white"
          >
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPage;
