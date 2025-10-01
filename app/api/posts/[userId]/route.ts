// app/api/posts/[userId]/route.ts
import { auth } from "@/lib/auth";
import { getPostsByUserId } from "@/server/posts";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const posts = await getPostsByUserId(params.userId);
  return NextResponse.json({ posts });
}
