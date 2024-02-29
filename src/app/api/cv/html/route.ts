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

export async function GET(req: Request) {
  try {
    const md = markdownit();

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

    if (snapshot?.contentMain) {
      // res = md.render(snapshot?.content);
      res = generateHTML(JSON.parse(snapshot.contentMain), [
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
        Link,
      ])
    }

    const response = new NextResponse(res);

    response.headers.set("Content-Type", "text/html; charset=utf-8");

    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch cv", { status: 500 });
  }
}