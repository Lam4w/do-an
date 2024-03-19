"use server"

import { z } from "zod"
import { db } from "../db"
import { CreateMediaType, CreateWebsiteFormSchema, UpsertPage } from "../types"
import { revalidatePath } from "next/cache"

export const getWebsites = async (ownerId: string) => {
  const websites = await db.website.findMany({
    where: { ownerId: ownerId },
    include: { pages: true },
  })

  return websites
}

export const getWebsite = async (websiteId: string) => {
  const website = await db.website.findUnique({
    where: { 
      id: websiteId,
    },
    include: {
      pages: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  return website
}

export const upsertWebsite = async (
  ownerId: string,
  website:  z.infer<typeof CreateWebsiteFormSchema>,
  websiteId: string | undefined
) => {
  if (websiteId === undefined) {
    const response = await db.website.create({
      data: {
        ...website,
        ownerId: ownerId,
      }
    })

    return response
  }

  const response = await db.website.update({
    where: { id: websiteId },
    data: website,
  })

  return response
}

export const upsertPage = async (
  ownerId: string,
  page: UpsertPage,
  websiteId: string
) => {
  if (!ownerId || !websiteId) return
  if (page.id === undefined) {
    const response = await db.page.create({
      data: {
        ...page,
        content: page.content
          ? page.content
          : JSON.stringify([
              {
                content: [],
                id: '__body',
                name: 'Body',
                styles: { backgroundColor: 'white' },
                type: '__body',
              },
            ]),
        websiteId,
      }
    })

    revalidatePath(`/pages/${websiteId}`, 'page')
    return response 
  }

  let pageWithoutId = {...page}; 
  delete pageWithoutId.id;

  const response = await db.page.update({
    where: { id: page.id || '' },
    data: { ...pageWithoutId },
  })

  revalidatePath(`/pages/${websiteId}`, 'page')

  return response
}

export const deletePage = async (pageId: string) => {
  const response = await db.page.delete({ where: { id: pageId } })

  return response
}

export const getMedia = async (ownerId: string) => {
  const mediafiles = await db.user.findUnique({
    where: {
      id: ownerId,
    },
    include: { media: true },
  })

  return mediafiles
}

export const createMedia = async (
  ownerId: string,
  mediaFile: CreateMediaType
) => {
  const response = await db.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      ownerId: ownerId,
    },
  })

  return response
}

export const deleteMedia = async (mediaId: string) => {
  const response = await db.media.delete({
    where: {
      id: mediaId,
    },
  })

  return response
}

export const getPageDetails = async (pageId: string) => {
  const response = await db.page.findUnique({
    where: {
      id: pageId,
    },
  })

  return response
}