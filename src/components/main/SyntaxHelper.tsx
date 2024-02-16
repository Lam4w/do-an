"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { Textarea } from "@/components/ui/Textarea";
import { markdownSyntax } from "@/const";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
var getCaretCoordinates = require("textarea-caret");

interface SyntaxHelperProps {
  value: string;
  onChange: (value: string) => void;
}

const SyntaxHelper = ({ value, onChange }: SyntaxHelperProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isHidden, SetIsHidden] = useState<boolean>(true);
  const [caretTop, setCaretTop] = useState<number>(0);
  const [caretLeft, setCaretLeft] = useState<number>(0);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  }, [value]);

  const insertText = (
    textarea: HTMLTextAreaElement,
    text: string,
    caretPosition: number,
  ) => {
    // Get the current cursor position
    const position = textarea.selectionStart;

    // Get the text before and after the cursor position
    const before = textarea.value.substring(0, position - 1);
    const after = textarea.value.substring(position, textarea.value.length);

    // Insert the new text at the cursor position
    textarea.value = before + text + after;

    // Set the cursor position to after the newly inserted text
    textarea.selectionStart = textarea.selectionEnd = position + caretPosition;

    // Set the focus at the cursor position

    console.log(position)
    textarea.focus();

    SetIsHidden(true);
  };

  const textHelper = (textarea: HTMLTextAreaElement, key: string) => {
    if (key === "/" && textarea) {
      const caret = getCaretCoordinates(textarea, textarea.selectionEnd);
      console.log(caret.top, caret.left)
      setCaretTop(caret.top);
      setCaretLeft(caret.left);
      SetIsHidden(false);
    } else SetIsHidden(true);
  };

  return (
    <div className="relative">
      <Textarea
        className="p-5 text-lg resize-y min-h-[80vh] overflow-auto outline-offset-0 !outline-none border-transparent focus:border-transparent focus:ring-0 focus:outline-none focus:ring-offset-0"
        onKeyDown={(e) => {
          if (textareaRef.current) {
            textHelper(textareaRef.current, e.key);
          }
        }}
        ref={textareaRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <div
        className={cn("absolute border", isHidden ? "hidden" : `block`)}
        style={{ top: caretTop + 30, left: caretLeft }}
      >
        <Command>
          <CommandInput placeholder="Styles..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {markdownSyntax.map((m) => (
              <CommandItem
                key={m.ele}
                onClickCapture={() => {
                  if (textareaRef.current) {
                    insertText(textareaRef.current, m.syntax, m.caret);
                  }
                }}
              >
                {m.ele}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default SyntaxHelper;