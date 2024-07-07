import { prisma } from "@/lib";
import type { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const posts = await prisma.post.findMany({
    where: { title: { contains: query } },
  });
};