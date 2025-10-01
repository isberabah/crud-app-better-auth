// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth";

import { AdminPostView } from "@/components/client/AdminPostView";
import { PostTable } from "@/components/server/PostTable";
import { getListUser } from "@/server/users";
import { getPostsByUserId } from "@/server/posts";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <div className="p-4">You must be logged in to view your dashboard.</div>;
  }

  const userId = session.user.id; // string (from better-auth)
  const isAdmin = session.user.role === "admin";

  if (isAdmin) {
    const [users, initialPosts] = await Promise.all([
      getListUser(),
      getPostsByUserId(userId),
    ]);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <AdminPostView
          initialPosts={initialPosts}
          users={users}
          currentUserId={userId}
        />
      </div>
    );
  } else {
    const posts = await getPostsByUserId(userId);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Your Posts</h1>
        <PostTable posts={posts} />
      </div>
    );
  }
}