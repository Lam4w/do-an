import { z } from "zod";

export const SnapshotCreatetValidator = z.object({
  cvId: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(50, { message: "Title must be less than 120 characters" }),
  content: z.any(),
});

export const SnapshotUpdateValidator = z.object({
  cvId: z.string(),
  snapshotId: z.string().optional(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(50, { message: "Title must be less than 120 characters" }),
  content: z.any(),
});

export type SnapshotCreateRequest = z.infer<typeof SnapshotCreatetValidator>;
export type SnapshotUpdateRequest = z.infer<typeof SnapshotUpdateValidator>;
