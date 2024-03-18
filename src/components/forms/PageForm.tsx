'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/Input'

import { Button } from '../ui/Button'
import Loading from '../global/Loading'
import { useToast } from '../../hooks/use-toast'
import { Page } from '@prisma/client'
import { PageSchema } from '@/lib/types'
import {
  deletePage,
  getWebsites,
  upsertPage,
} from '@/lib/server/queries'
import { useRouter } from 'next/navigation'
import { CopyPlusIcon, Trash } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip'

interface PageFormProps {
  defaultData?: Page
  websiteId: string
  order: number
  ownerId: string
}

const CreateFunnelPage: React.FC<PageFormProps> = ({
  defaultData,
  websiteId,
  order,
  ownerId,
}) => {
  const { toast } = useToast()
  const router = useRouter()
  //ch
  const form = useForm<z.infer<typeof PageSchema>>({
    resolver: zodResolver(PageSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      pathName: '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({ name: defaultData.name, pathName: defaultData.pathName })
    }
  }, [defaultData])

  const onSubmit = async (values: z.infer<typeof PageSchema>) => {
    if (order !== 0 && !values.pathName)
      return form.setError('pathName', {
        message:
          "Pages other than the first page in the page require a path name example 'secondstep'.",
      })
    try {
      const response = await upsertPage(
        ownerId,
        {
          ...values,
          id: defaultData?.id || undefined,
          order: defaultData?.order || order,
          pathName: values.pathName || '',
        },
        websiteId
      )

      toast({
        title: 'Success',
        description: 'Saves Funnel Page Details',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'Could Save Funnel Page Details',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting || order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Path for the page"
                      {...field}
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                className="w-22 self-end"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? <Loading /> : 'Save Page'}
              </Button>

              {defaultData?.id && (
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'outline'}
                      className="w-22 self-end border-destructive text-destructive hover:bg-destructive"
                      disabled={form.formState.isSubmitting}
                      type="button"
                      onClick={async () => {
                        const response = await deletePage(defaultData.id)
                        router.refresh()
                      }}
                    >
                      {form.formState.isSubmitting ? <Loading /> : <Trash />}
                    </Button>
                  </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete page</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {defaultData?.id && (
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      disabled={form.formState.isSubmitting}
                      type="button"
                      onClick={async () => {
                        const response = await getWebsites(ownerId)
                        const lastPage = response.find(
                          (website) => website.id === websiteId
                        )?.pages.length

                        await upsertPage(
                          ownerId,
                          {
                            ...defaultData,
                            id: undefined,
                            order: lastPage ? lastPage : 0,
                            visits: 0,
                            name: `${defaultData.name} Copy`,
                            pathName: `${defaultData.pathName}copy`,
                            content: defaultData.content,
                          },
                          websiteId
                        )
                        toast({
                          title: 'Success',
                          description: 'Saves Funnel Page Details',
                        })
                        router.refresh()
                      }}
                    >
                      {form.formState.isSubmitting ? <Loading /> : <CopyPlusIcon />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duplicate page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateFunnelPage