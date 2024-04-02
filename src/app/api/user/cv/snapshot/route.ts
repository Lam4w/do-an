import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SnapshotDeleteValidator } from "@/lib/validators/snapshot";
import { z } from "zod";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { cvId } = z
      .object({
        cvId: z.string(),
      })
      .parse({
        cvId: url.searchParams.get("cv"),
      });

    // return new Response(cvId)

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

    const snapshots = await db.snapshot.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        cvId
      },
    });

    return new Response(JSON.stringify(snapshots));
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch snapshot", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { snapshotId } = SnapshotDeleteValidator.parse(body);

    const existingSnapshot = await db.snapshot.findFirst({
      where: {
        id: snapshotId,
      },
    });

    if (!existingSnapshot) {
      return new Response("snapshot not found", { status: 409 });
    }

    const totalSnapshot = await db.snapshot.findMany({
      where: {
        cvId: existingSnapshot?.cvId,
      },
    });

    if (totalSnapshot.length <= 1) {
      return new Response("Could not delete snapshot", { status: 405 });
    }

    await db.snapshot.delete({
      where: {
        id: snapshotId,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update username", { status: 500 });
  }
}