import { z } from "zod";
import { Post, Comments } from "@/schema/posts";

export function createAPIClient() {
  async function _fetch<T extends z.ZodTypeAny>(
    input: RequestInfo,
    init: RequestInit,
    type: T
  ): Promise<z.infer<T>> {
    const headers = new Headers(init?.headers);

    const res = await fetch(input, { ...init, headers });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    const result = await type.safeParseAsync(data);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  return {
    posts: {
      get: (slug: string) => _fetch(`/api/posts/${slug}`, { method: "GET" }, Post),
      getAll: () => _fetch('/api/posts', { method: 'GET' }, z.array(Post)),
      getFeatured: () => _fetch('/api/v1/posts/featured', { method: 'GET' }, z.array(Post)),
      getLatest: () => _fetch('/api/v1/posts/latest', { method: 'GET' }, z.array(Post)),
      search: (query: string) => _fetch(`/api/v1/search?query=${query}`, { method: 'GET' }, z.array(Post)),
      getRelated: (postId: string) => _fetch(`/api/v1/posts/related/${postId}`, { method: 'GET' }, z.array(Post)),
      getComments: (postId: string) => _fetch(`/api/v1/posts/comments/${postId}`, { method: 'GET' }, z.array(Comments)),
    }
  };
}