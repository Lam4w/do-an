import { Prisma } from '@prisma/client'
import {
  getWebsites,
} from './server/queries'
import { z } from 'zod'

export const CreateWebsiteFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
})

export type WebsitesForUserAccount = Prisma.PromiseReturnType<
  typeof getWebsites
>[0]

export type UpsertPage = Prisma.PageCreateWithoutWebsiteInput

export const PageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
})