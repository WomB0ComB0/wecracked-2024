import { z } from "zod";
import { isValidObjectId } from "@/utils";

const CommentsSchema = z.object({
  comment: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  postId: z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  }),
});

export { CommentsSchema };
