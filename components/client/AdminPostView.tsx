// src/components/client/AdminPostView.tsx
"use client";

import { useState, useEffect } from "react";
import { Post } from "@/db/schema";
import { User } from "@/db/schema";
import { AdminUserSelector } from "./AdminUserSelector";
import { PostTable } from "../server/PostTable";

interface AdminPostViewProps {
  initialPosts: Post[];
  users: User[];
  currentUserId: string;
}

export function AdminPostView({
  initialPosts,
  users,
  currentUserId,
}: AdminPostViewProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const handleUserSelect = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      } else {
        alert("Failed to load posts");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminUserSelector
        users={users}
        initialUserId={currentUserId}
        onUserSelect={handleUserSelect}
      />
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <PostTable posts={posts} />
      )}
    </div>
  );
}
