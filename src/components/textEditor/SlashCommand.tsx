import {
  Code,
  Columns2,
  Columns3,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  SplitSquareVerticalIcon,
  TableIcon,
  Text,
  TextQuote,
} from "lucide-react";
import { Command, createSuggestionItems, renderItems } from "novel/extensions";
import { uploadFn } from "./imageUpload";
import { uploadFiles } from "@/lib/uploadthing";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

export const suggestionItems = createSuggestionItems([
  // {
  //   title: "Send Feedback",
  //   description: "Let us know how we can improve.",
  //   icon: <MessageSquarePlus size={18} />,
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).run();
  //     window.open("/feedback", "_blank");
  //   },
  // },
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Insert Table",
    description: "Create two blocks.",
    icon: <TableIcon size={18} />,
    command: ({ editor, range }) => {
      // let row =prompt("Insert Row");
      // let col =prompt("Insert Col");
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({
          rows: Number() | 1,
          cols: Number() | 2,
          withHeaderRow: false,
        })
        .run();
    },
  },
  {
    title: "Two block",
    description: "Create two blocks.",
    icon: <Columns2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
        .run();
    },
  },
  {
    title: "Three block",
    description: "Create three blocks.",
    icon: <Columns3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 1, cols: 3, withHeaderRow: false })
        .run();
    },
  },
  // {
  //   title: "To-do List",
  //   description: "Track tasks with a to-do list.",
  //   searchTerms: ["todo", "task", "list", "check", "checkbox"],
  //   icon: <CheckSquare size={18} />,
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).toggleTaskList().run();
  //   },
  // },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Divider",
    description: "Create a simple horizontal divider.",
    searchTerms: ["hr", "separator", "line", "divider"],
    icon: <SplitSquareVerticalIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().setHorizontalRule().deleteRange(range).run();
    },
  },
  // {
  //   title: "Numbered List",
  //   description: "Create a list with numbering.",
  //   searchTerms: ["ordered"],
  //   icon: <ListOrdered size={18} />,
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).toggleOrderedList().run();
  //   },
  // },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Keywork",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock", "code", "keyword", "highlight"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleCode().run(),
  },
  {
    title: "Image",
    description: "Upload an image from your computer.",
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      // upload image
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          const pos = editor.view.state.selection.from;

          uploadFn(file, editor.view, pos)
        }
      };
      input.click();
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
