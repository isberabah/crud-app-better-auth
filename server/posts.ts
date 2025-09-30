"use server";

import { db } from "@/db/drizzle";
import { posts, Post } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPosts(userId: string, userRole: string) {
  try {
    if (userRole === "admin") {
      const allPosts = await db.select().from(posts);

      return { posts: allPosts, isAdmin: true };
    } else {
      const userPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.userId, userId));
      return { posts: userPosts, isAdmin: false };
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to load posts");
  }
}



export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "updatedAt">
) {
  try {
    await db.insert(posts).values({ ...post, userId: post.userId! });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePost(post: Omit<Post, "createdAt" | "updatedAt">) {
  try {
    await db
      .update(posts)
      .set({ ...post, userId: post.userId! })
      .where(eq(posts.id, post.id!));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePost(id: string) {
  try {
    await db.delete(posts).where(eq(posts.id, id!));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
