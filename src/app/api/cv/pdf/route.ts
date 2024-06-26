import { generatePdf } from "@/lib/pdf/pdfGenerate";
import { pdfTemplate } from "@/lib/pdf/pdfTemplate";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  mergeAttributes,
} from '@tiptap/core';
import Blockquote from "@tiptap/extension-blockquote";
import Bold from '@tiptap/extension-bold';
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Document from '@tiptap/extension-document';
import HardBreak from "@tiptap/extension-hard-break";
import Heading from '@tiptap/extension-heading';
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from '@tiptap/extension-paragraph';
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from '@tiptap/extension-text';
import TextStyle from "@tiptap/extension-text-style";
import { generateHTML } from '@tiptap/html';
import { z } from "zod";

export async function POST(req: Request) {
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

    let result = "";

    const CustomImage = Image.extend({
      renderHTML({ HTMLAttributes }) {
        return ['p', ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]]
      },
    })

    if (snapshot?.contentMain) {
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

        result = `
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
        result = `
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

    const cvPdf = await generatePdf(
      pdfTemplate(result)
    );

    const response = new NextResponse(cvPdf);

    response.headers.set("Content-Type", "application/pdf");

    return response;

    // return new Response(cvPdf);

    // Create a Blob from the ArrayBuffer
    // const blob = new Blob([myPdf], { type: "application/pdf" });

    // Create a File from the Blob (you can specify the desired filename here)
    // const file = new File([blob], firstName + "_" + lastName + ".pdf", {
    //   type: "application/pdf",
    // });

    // const response = await utapi.uploadFiles(file);

    // Update in DB
  } catch (err) {
    console.log(err)
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch cv", { status: 500 });
  } 
}