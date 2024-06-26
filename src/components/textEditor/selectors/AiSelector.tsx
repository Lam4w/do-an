"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import { useCompletion } from "ai/react";
import { useEditor } from "novel";
import { getPrevText } from "novel/extensions";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const options = [
  {
    value: "improve",
    label: "Improve writing",
  },
  {
    value: "continue",
    label: "Continue writing",
  },
  {
    value: "fix",
    label: "Fix grammar",
  },
  {
    value: "sorter",
    label: "Make shorter",
  },
  {
    value: "longer",
    label: "Make longer",
  },
];

//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ open, onOpenChange }: AISelectorProps) {
  const [extraPrompt, setExtraPrompt] = useState("");

  const { completion, complete } = useCompletion({
    // id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast({
          title: "Too much requests today",
          description: "You have reached your request limit for the day.",
          variant: "destructive",
        });
        return;
      }
    },
    onError: (e) => {
      toast({
        title: "Something wen't wrong!",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const { editor } = useEditor();
  if (!editor) return null;

  return (
    <div
      className="w-full"
      onBlur={() => {
        editor!.chain().unsetHighlight().run();
      }}
    >
      <Command>
        {completion && (
          <p className="w-full whitespace-pre-wrap p-2 px-4 text-sm">
            {completion}
          </p>
        )}
        <CommandInput
          onFocus={() => {
            editor!.chain().setHighlight({ color: "#c1ecf970" }).run();
          }}
          value={extraPrompt}
          onValueChange={setExtraPrompt}
          autoFocus
          placeholder="Ask AI to edit or generate..."
          className="w-[400px]"
        />
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              className="px-4"
              key={option.value}
              value={option.value}
              onSelect={(option) => {
                if (option === "continue") {
                  getPrevText(editor!, {
                    chars: 5000,
                  });
                  complete(editor!.getText());
                }
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </div>
  );
}
