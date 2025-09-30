import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPosts } from "@/server/posts";
import { Button } from "../ui/button";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PostForm from "./PostForm";
import DeletePostButton from "./DeleteUserButton";
import { getListUser } from "@/server/users";

const PostTableComponent = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!session?.user) {
    // Redirect to login in real app
    return (
      <div className="p-4">You must be logged in to view your dashboard.</div>
    );
  }

  const listUser = await getListUser()

  const { posts, isAdmin } = await getPosts(userId!, session.user.role);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin ? "All Posts (Admin View)" : "Your Posts"}
      </h1>
      <div>
        //filter tabel based on userId  we map list of posts and filter based on userId

      </div>
      <Table>
        <TableCaption>A list of your recent posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Updated At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>{post.createdAt.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {post.updatedAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">
                      <Pencil className="size-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Post</DialogTitle>
                      <PostForm post={post} />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <DeletePostButton postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostTableComponent;
