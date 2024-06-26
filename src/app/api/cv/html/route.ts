import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import markdownit from "markdown-it";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateHTML } from '@tiptap/html'
import Bold from '@tiptap/extension-bold'
import Italic from "@tiptap/extension-italic";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image"
import TextStyle from '@tiptap/extension-text-style'
import {
  mergeAttributes,
} from '@tiptap/core'


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { cvId, snapshotId } = z
      .object({
        cvId: z.string(),
        snapshotId: z.string().nullish().optional(),
      })
      .parse({
        cvId: url.searchParams.get("cv"),
        snapshotId: url.searchParams.get("snapshot"),
      });

    let whereClause = {};

    if (snapshotId) {
      whereClause = {
        id: snapshotId,
        cvId,
      };
    } else {
      whereClause = {
        cvId,
      };
    }

    const existingCv = await db.userCV.findFirst({
      where: {
        id: cvId,
        ownerId: session.user.id,
        isArchived: false,
      },
    });

    if (!existingCv) {
      return new Response("CV not found", { status: 409 });
    }

    const snapshot = await db.snapshot.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: whereClause,
    });

    let res;

    const CustomImage = Image.extend({
      renderHTML({ HTMLAttributes }) {
        // Original:
        // return ['img', HTMLAttributes, 0]
        return ['p', ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]]
      },
    })

    if (snapshot?.contentMain) {
      // res = md.render(snapshot?.content);
      const contentMain = generateHTML(JSON.parse(snapshot.contentMain), [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Heading,
        Blockquote,
        BulletList,
        ListItem,
        CodeBlock,
        HardBreak,
        HorizontalRule,
        OrderedList,
        Table,
        TableCell,
        TableRow,
        TableHeader,
        Code,
        TextStyle,
        Link,
        CustomImage,
      ])

      if (snapshot?.contentSide && snapshot.settings.isSplit) {
        const contentSide = generateHTML(JSON.parse(snapshot.contentSide), [
          Document,
          Paragraph,
          Text,
          Bold,
          Italic,
          Heading,
          Blockquote,
          BulletList,
          ListItem,
          CodeBlock,
          HardBreak,
          HorizontalRule,
          OrderedList,
          Table,
          TableCell,
          TableRow,
          TableHeader,
          Code,
          TextStyle,
          Link,
          CustomImage,
        ])

        res = `
          <div class='container'>
            <div 
              class='${snapshot.settings.template.toLowerCase()} ${snapshot.settings.layout} ${snapshot.settings.fontSize} ${snapshot.settings.spacing} ${snapshot.settings.titleAlignment} ${snapshot.settings.titleAlignment} ${snapshot.settings.color}'
            >
              <div>${contentSide}</div>
              <div>${contentMain}</div>
            </div>
          </div>
        `;
      } else {
        res = `
            <div class='container'>
              <div 
                class='${snapshot.settings.template.toLowerCase()} ${snapshot.settings.fontSize} ${snapshot.settings.spacing} ${snapshot.settings.titleAlignment} ${snapshot.settings.titleAlignment} ${snapshot.settings.color}'
              >
                ${contentMain}
              </div>
            </div>
          `;
      }
    }

    const response = new NextResponse(res);

    response.headers.set("Content-Type", "text/html; charset=utf-8");

    return response;
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch cv", { status: 500 });
  }
}