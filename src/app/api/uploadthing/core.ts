import { getAuthSession } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(({ req }) => {
      const session = auth(req)
      // If you throw, the user will not be able to upload
      if (!session) throw new Error('Unauthorized')
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return session
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;