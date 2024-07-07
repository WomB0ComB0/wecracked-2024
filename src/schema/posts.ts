import { z } from "zod";

const PostType = z.enum(["FEATURED", "LATEST", "RELATED"]);

const Comments = z.object({
  id: z.string().optional(), 
  comment: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  postId: z.string(),
});

const Post = z.object({
  id: z.string().optional(), 
  type: PostType.default("LATEST"),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string(),
  comments: z.array(Comments).optional(),
});

export { Post, Comments, PostType };