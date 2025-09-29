import TableComponent from "@/components/blog/blog-table";
import PostForm from "@/components/blog/PostForm";
import { ModeToggle } from "@/components/toggle -button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import {WrenchIcon } from "lucide-react";
import { headers } from "next/headers";


const DashboardPage =  async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  if (!session?.user) {
    // Redirect to login in real app
    return (
      <div className="p-4">You must be logged in to view your dashboard.</div>
    );
  }



  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <div className="flex items-center justify-end pt-4 pr-2 gap-x-3">
        <pre className="text-sm text-gray-300">Current USER: {session?.user?.name}</pre>
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-between ">
        <h1 className="text-3xl  font-extralight p-4 ">Posts</h1>
        <div className="flex justify-end p-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"default"} size={"lg"}>
                Add Post <WrenchIcon className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new Post?</DialogTitle>
                <DialogDescription>
                  Add a new post to Database
                </DialogDescription>
              </DialogHeader>
              <PostForm />  
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TableComponent />
    </div>
  );
};

export default DashboardPage;

/*
 */
