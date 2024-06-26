import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SnapshotCreatetValidator } from "@/lib/validators/snapshot";
import { z } from "zod";

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
        createdAt: "asc",
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(snapshot));
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    console.log(err)
    return new Response("Could not get snapshot", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { cvId, title, contentMain, contentSide, settings } = SnapshotCreatetValidator.parse(body);

    await db.snapshot.create({
      data: {
        cvId,
        title,
        contentMain,
        contentSide,
        settings,
        isArchived: false,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    return new Response("Could not create snapshot", { status: 500 });
  }
}