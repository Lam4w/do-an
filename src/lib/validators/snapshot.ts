import { z } from "zod";

export const SnapshotCreatetValidator = z.object({
  cvId: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(120, { message: "Title must be less than 120 characters" }),
  contentMain: z.any(),
  contentSide: z.any(),
  settings: z.object({
      isSplit: z.boolean(),
      layout: z.string(),
      template: z.string(),
      spacing: z.string(),
      fontSize: z.string(),
      color: z.string(),
      titleAlignment: z.string(),
    })
});

export const SnapshotUpdateValidator = z.object({
  cvId: z.string(),
  snapshotId: z.string().optional(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(120, { message: "Title must be less than 120 characters" })
    .optional(),
  contentMain: z.any().optional(),
  contentSide: z.any().optional(),
  settings: z.object({
      isSplit: z.boolean(),
      layout: z.string(),
      template: z.string(),
      spacing: z.string(),
      fontSize: z.string(),
      color: z.string(),
      titleAlignment: z.string(),
    }).
    optional(),
});

export const SnapshotDeleteValidator = z.object({
  snapshotId: z.string(),
});

export type SnapshotCreateRequest = z.infer<typeof SnapshotCreatetValidator>;
export type SnapshotUpdateRequest = z.infer<typeof SnapshotUpdateValidator>;
export type SnapshotDeleteRequest = z.infer<typeof SnapshotDeleteValidator>;