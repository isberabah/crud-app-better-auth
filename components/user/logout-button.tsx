"use client";

import { Button } from "../ui/button";
import { SignOut } from "@/server/users";
import { toast } from "sonner";
//import { useRouter } from "next/navigation";
import {  LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LogoutButton = () => {
  //const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  //setIsLoading(true);
  const handelLogOut = async () => {
    await SignOut();
    toast.success("Logout Successful");
    router.push('/login')
  };
  return (
  /*   <Button onClick={handelLogOut} variant={"ghost"} disabled={isLoading}>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
    </Button>
 */
    <Button onClick={handelLogOut} variant={"ghost"} >
        <LogOut className="w-4 h-4" />
    </Button>
  );
};

export default LogoutButton;
