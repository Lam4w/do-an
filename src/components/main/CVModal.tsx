"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { LucideIcon, Pencil } from "lucide-react";
import { CvCreateRequest, CvEditRequest } from "@/lib/validators/cv";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
  actionWithId?: (title: string, id: string) => void;
  actionWithoutId?: (title: string) => void;
}

const CVModal = ({
  id,
  title,
  label,
  initialValue = "Untitled",
  buttonLabel,
  ButtonIcon,
  variant = "default",
  size = "default",
  clasName,
  actionWithId,
  actionWithoutId,
}: CVModalProps) => {
  const [input, setInput] = useState<string>(initialValue);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={clasName}>
          {ButtonIcon ? (
            <ButtonIcon />
          ) : (
            <span>{buttonLabel}</span>
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
            disabled={input.length === 0}
            onClick={() => {
              if (id && actionWithId) actionWithId(input, id);
              else if (actionWithoutId) actionWithoutId(input);
            }}
          >
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVModal;
