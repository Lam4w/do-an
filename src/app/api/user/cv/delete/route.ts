import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CvDeleteValidator } from "@/lib/validators/cv";
import { z } from "zod";

export async function POST(req: Request) {
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

    await db.userCV.delete({
      where: {
        id: cvId,
        ownerId: session.user.id,
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