import { Post } from "@/db/schema";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditButton({ post }: { post?: Post }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button disabled={isLoading} type="submit">
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        `${post ? "Update" : "Add"} Post`
      )}
    </Button>
  );
}
