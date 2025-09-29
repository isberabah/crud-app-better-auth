"use server";
import { db } from "@/db/drizzle";
import { posts, Post } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getPosts(userId: string) {
  try {
    const allPosts = await db.select().from(posts).where(eq(posts.userId, userId));
    return allPosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "updatedAt">
) {
  try {
    await db.insert(posts).values({ ...post,  userId: post.userId! });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
