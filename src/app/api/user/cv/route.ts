import { getAuthSession } from "@/lib/auth";
import { defaultContent } from "@/lib/const";
import { db } from "@/lib/db";
import {
  CvCreateValidator,
  CvEditValidator
} from "@/lib/validators/cv";
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
        isArchived: false,
      },
    });

    return new Response(JSON.stringify(cvs));
  } catch (err) {}
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title } = CvCreateValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const cv = await db.userCV.create({
      data: {
        title,
        ownerId: session.user.id,
        isArchived: false,
      },
    });

    await db.snapshot.create({
      data: {
        cvId: cv.id,
        title: "default",
        contentMain: defaultContent,
        contentSide: defaultContent,
        isArchived: false,
        settings: {}
      },
    });

    return new Response(cv.id);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    return new Response("Could not create cv", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { cvId, title } = CvEditValidator.parse(body);

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
        title,
      },
    });

    return new Response("OK");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update title", { status: 500 });
  }
}