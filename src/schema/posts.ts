import { z } from "zod";
import { isValidObjectId } from "@/utils";

const PostType = z.enum(["FEATURED", "LATEST", "RELATED"]);

const PostSchema = z.object({
  type: PostType.default("LATEST"),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  }),
  comments: z.array(z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  })).optional(),
});

export { PostSchema };
