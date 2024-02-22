import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
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