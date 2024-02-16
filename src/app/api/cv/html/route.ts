import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import markdownit from "markdown-it";
import { NextResponse } from "next/server";

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

    if (snapshot?.content) {
      res = md.render(snapshot?.content);
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
