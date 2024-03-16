"use server"

import { z } from "zod"
import { db } from "../db"
import { CreatePageFormSchema, UpsertSubPage } from "../types"
import { revalidatePath } from "next/cache"

export const getPages = async (subacountId: string) => {
  const pages = await db.page.findMany({
    where: { ownerId: subacountId },
    include: { subPages: true },
  })

  return pages
}

export const getPage = async (pageId: string) => {
  const page = await db.page.findUnique({
    where: { 
      id: pageId,
    },
    include: {
      subPages: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  return page
}

export const upsertPage = async (
  ownerId: string,
  page:  z.infer<typeof CreatePageFormSchema>,
  pageId: string | undefined
) => {
  if (pageId === undefined) {
    const response = await db.page.create({
      data: {
        ...page,
        ownerId: ownerId,
      }
    })

    return response
  }

  const response = await db.page.update({
    where: { id: pageId },
    data: page,
  })

  return response
}

export const upsertSubPage = async (
  ownerId: string,
  subPage: UpsertSubPage,
  pageId: string
) => {
  if (!ownerId || !pageId) return
  if (subPage.id === undefined) {
    const response = await db.subPage.create({
      data: {
        ...subPage,
        content: subPage.content
          ? subPage.content
          : JSON.stringify([
              {
                content: [],
                id: '__body',
                name: 'Body',
                styles: { backgroundColor: 'white' },
                type: '__body',
              },
            ]),
        pageId,
      }
    })

    revalidatePath(`/pages/${pageId}`, 'page')
    return response 
  }

  let subPageWithoutId = {...subPage}; 
  delete subPageWithoutId.id;

  const response = await db.subPage.update({
    where: { id: subPage.id || '' },
    data: { ...subPageWithoutId },
  })

  revalidatePath(`/pages/${pageId}`, 'page')
  return response
}

export const deleteSubPage = async (subPageId: string) => {
  const response = await db.subPage.delete({ where: { id: subPageId } })

  return response
}