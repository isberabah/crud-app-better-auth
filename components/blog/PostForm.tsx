"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string(),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//import { createPost, updatePost } from "@/server/users";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { createPost } from "@/server/posts";

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    
    const session = await authClient.getSession()
  const userId = session.data?.user.id
    setIsLoading(true);

    try {
      const postData = {
        ...values,
        userId: userId!,
      };

     /*  if (post) {
        await updatePost({
          ...postData,
          id: post.id,
        });
      } else { */
        await createPost ({
          ...postData,
          userId: userId!,
        });
     /*  } */

      form.reset();

      toast.success(`Post ${post ? "updated" : "added"} successfully`);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${post ? "update" : "add"} post`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="bruce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="I love Wayne!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            `${post ? "Update" : "Add"} Post`
          )}
        </Button>
      </form>
    </Form>
  );
}
