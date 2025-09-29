
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

const PostTableComponent = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!session?.user) {
    // Redirect to login in real app
    return (
      <div className="p-4">You must be logged in to view your dashboard.</div>
    );
  }

  const posts = await getPosts(userId!);
  return (
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
              <Button>Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostTableComponent;
