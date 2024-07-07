import { z } from "zod";
import { isValidObjectId } from "@/utils";

const AccountSchema = z.object({
  userId: z.string().refine(isValidObjectId, {
    message: "Invalid ObjectId",
  }),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional(),
  access_token: z.string().optional(),
  expires_at: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  session_state: z.string().optional(),
});

export { AccountSchema };