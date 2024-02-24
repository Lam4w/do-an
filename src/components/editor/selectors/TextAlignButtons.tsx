"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./NodeSelector";
import TextAlign from "@tiptap/extension-text-align";

interface TextAlignButtonsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TextAlignButtons({
  open,
  onOpenChange,
}: TextAlignButtonsProps) {
  const { editor } = useEditor();
  if (!editor) return null;

  const items: SelectorItem[] = [
    {
      name: "left",
      isActive: (editor) => editor!.isActive("left"),
      command: (editor) => editor!.chain().focus().setTextAlign("left").run(),
      icon: AlignLeftIcon,
    },
    {
      name: "center",
      isActive: (editor) => editor!.isActive("center"),
      command: (editor) => editor!.chain().focus().setTextAlign("center").run(),
      icon: AlignCenterIcon,
    },
    {
      name: "right",
      isActive: (editor) => editor!.isActive("right"),
      command: (editor) => editor!.chain().focus().setTextAlign("right").run(),
      icon: AlignRightIcon,
    },
    // {
    //   name: "justify",
    //   isActive: (editor) => editor!.isActive("justify"),
    //   command: (editor) =>
    //     editor!.chain().focus().setTextAlign("justify").run(),
    //   icon: AlignJustifyIcon,
    // },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="icon" className="rounded-none" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
}
