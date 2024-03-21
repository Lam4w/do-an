"use client";

import {
  slashCommand,
  suggestionItems,
} from "@/components/textEditor/SlashCommand";
import { ColorSelector } from "@/components/textEditor/selectors/ColorSelector";
import { LinkSelector } from "@/components/textEditor/selectors/LinkSelector";
import { NodeSelector } from "@/components/textEditor/selectors/NodeSelector";
import { TextAlignButtons } from "@/components/textEditor/selectors/TextAlignButtons";
import { TextButtons } from "@/components/textEditor/selectors/TextButtons";
import { Separator } from "@/components/ui/Separator";
import { defaultEditorContent } from "@/lib/editor/content";
import { defaultExtensions } from "@/lib/editor/extensions";
import {
  Editor,
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
  defaultEditorProps,
  type JSONContent,
} from "novel";
import { ImageResizer } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const extensions = [...defaultExtensions, slashCommand];

interface NovelEditorProps {
  content: JSONContent;
  onChange: (value: JSONContent) => void;
}

function NovelEditor({ content, onChange } : NovelEditorProps) {
  const [initialContent, setInitialContent] = useState<JSONContent>(content);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    const json = editor.getJSON();
    // window.localStorage.setItem("novel-content", JSON.stringify(json));
    onChange(json)
    setSaveStatus("Saved");
  }, 2000);

  useEffect(() => {
    // const content = window.localStorage.getItem("novel-content");
    if (!!content) setInitialContent(content);
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full min-h-[80vh] overflow-auto">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
        {saveStatus}
      </div>

      <EditorRoot>
        {/* Editor Content Component */}
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-full w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg p-5"
          editorProps={{
            ...defaultEditorProps,
            attributes: {
              class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] bg-white w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)} // optional chaining (?.) operator to solve the error
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommand>

          {/* Editor Bubble Layout */}
          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-white shadow-xl"
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextAlignButtons />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}

export default NovelEditor;