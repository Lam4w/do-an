import { Prisma } from '@prisma/client'
import {
  getPages,
} from './server/queries'
import { z } from 'zod'

export const CreatePageFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
})

export type PagesForUserAccount = Prisma.PromiseReturnType<
  typeof getPages
>[0]

export type UpsertSubPage = Prisma.SubPageCreateWithoutPageInput

export const SubPageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
})