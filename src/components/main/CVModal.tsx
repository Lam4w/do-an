import React from "react";
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
import { LucideIcon } from "lucide-react";

interface CVModalProps {
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
  clasName?: string
  action?: (id: string) => void;
}

const CVModal = ({
  title,
  label,
  initialValue,
  buttonLabel,
  ButtonIcon,
  variant = "default",
  size = "default",
  clasName,
  action,
}: CVModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={clasName}>
          {ButtonIcon ? (
            <ButtonIcon className="h-4 w-4" />
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
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value="Untitled" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{buttonLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVModal;
