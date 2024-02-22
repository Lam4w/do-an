import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CvDeleteValidator } from "@/lib/validators/cv";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const cvs = await db.userCV.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        ownerId: session.user.id,
        isArchived: true,
      },
    });

    return new Response(JSON.stringify(cvs));
  } catch (err) {}
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { cvId } = CvDeleteValidator.parse(body);

    const existingCv = await db.userCV.findFirst({
      where: {
        id: cvId,
        ownerId: session.user.id,
      },
    });

    if (!existingCv) {
      return new Response("CV not found", { status: 409 });
    }

    await db.userCV.update({
      where: {
        id: cvId,
        ownerId: session.user.id,
      },
      data: {
        isArchived: !existingCv.isArchived
      }
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update username", { status: 500 });
  }
}