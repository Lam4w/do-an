"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { LucideIcon, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

interface DeleteModalProps {
  title: string;
  desc: string;
  id: string;
  buttonLabel: string;
  ButtonIcon?: LucideIcon;
  action: (id: string) => void;
  isPending: boolean;
}

export default function ConfirmationModal ({title, desc, id, buttonLabel, ButtonIcon, action, isPending }: DeleteModalProps) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full">
          {ButtonIcon ? (
            <ButtonIcon />
          ) : (
            <span>{buttonLabel}</span>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => action(id)}>
            {isPending ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                Yes
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};