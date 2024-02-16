import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SnapshotUpdateValidator } from "@/lib/validators/snapshot";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { cvId, snapshotId, title, content } = SnapshotUpdateValidator.parse(body);

    const existingCv = await db.userCV.findFirst({
      where: {
        id: cvId,
        ownerId: session.user.id,
      },
    });

    if (!existingCv) {
      return new Response("CV not found", { status: 409 });
    }

    const existingSnapshot = await db.snapshot.findFirst({
      where: {
        id: snapshotId,
        cvId: cvId,
      },
    });

    if (!existingSnapshot) {
      return new Response("Snapshot not found", { status: 409 });
    }

    await db.snapshot.update({
      where: {
        id: snapshotId,
        cvId: cvId,
      },
      data: {
        title,
        content,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update snapshot", { status: 500 });
  }
}
