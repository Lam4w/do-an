"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./NodeSelector";
import TextAlign from "@tiptap/extension-text-align";
import React from "react";

const items: SelectorItem[] = [
  {
    name: "left",
    isActive: (editor) => editor!.isActive({ textAlign: "left" }),
    command: (editor) => editor!.chain().focus().setTextAlign("left").run(),
    icon: AlignLeftIcon,
  },
  {
    name: "center",
    isActive: (editor) => editor!.isActive({ textAlign: "center" }),
    command: (editor) => editor!.chain().focus().setTextAlign("center").run(),
    icon: AlignCenterIcon,
  },
  {
    name: "right",
    isActive: (editor) => editor!.isActive({ textAlign: "right" }),
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

export function TextAlignButtons() {
  const { editor } = useEditor();
  if (!editor) return null;

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
