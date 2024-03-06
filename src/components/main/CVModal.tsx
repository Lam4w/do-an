"use client";

import { LucideIcon, RotateCw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface CVModalProps {
  id?: string;
  title: string;
  label?: string;
  initialValue?: string;
  buttonLabel: string;
  ButtonIcon?: LucideIcon;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  clasName?: string;
  isPending: boolean
  actionWithId?: (title: string, id: string) => void;
  actionWithoutId?: (title: string) => void;
}

export default function CVModal ({
  id,
  title,
  label,
  initialValue = "Untitled",
  buttonLabel,
  ButtonIcon,
  variant = "default",
  size = "default",
  clasName,
  isPending,
  actionWithId,
  actionWithoutId,
}: CVModalProps) {
  const [input, setInput] = useState<string>(initialValue);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={clasName}>
          {ButtonIcon ? (
            <ButtonIcon />
          ) : (
            <span>{title}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{label}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={input.length === 0 || isPending}
            onClick={() => {
              if (id && actionWithId) actionWithId(input, id);
              else if (actionWithoutId) actionWithoutId(input);
            }}
          >
            {isPending ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                {buttonLabel}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};