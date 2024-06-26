"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/Button";

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm ({ className, ...props } : UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (err) {
      // toast notification
      toast({
          title: 'There was an error',
          description: 'There was an error logging in with Google',
          variant: "destructive"
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <Button
        onClick={loginWithGoogle}
        // isLoading={isLoading}
        disabled={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};