import { z } from "zod";

export const CvCreateValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(120, { message: "Title must be less than 120 characters" }),
});

export const CvEditValidator = z.object({
  cvId: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(120, { message: "Title must be less than 120 characters" }),
});

export const CvDeleteValidator = z.object({
  cvId: z.string(),
});

export type CvCreateRequest = z.infer<typeof CvCreateValidator>;
export type CvEditRequest = z.infer<typeof CvEditValidator>;
export type CvDeleteRequest = z.infer<typeof CvDeleteValidator>;
