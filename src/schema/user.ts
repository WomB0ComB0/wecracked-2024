import { z } from "zod";
import { isValidObjectId } from "@/utils";
const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  isAdmin: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  password: z.string().optional(),
  updatedAt: z.date().default(() => new Date()),
  posts: z.array(z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  })).optional(),
  accounts: z.array(z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  })).optional(),
});

export default UserSchema;