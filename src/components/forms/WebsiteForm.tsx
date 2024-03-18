'use client'
import React, { useEffect } from 'react'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { useForm } from 'react-hook-form'
import { Website } from '@prisma/client'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import Loading from '../global/Loading'
import { CreateWebsiteFormSchema } from '@/lib/types'
import { upsertWebsite } from '@/lib/server/queries'
import { toast } from '../../hooks/use-toast'
import { useModal } from '../../providers/ModalProvider'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import FileUpload from '../global/FIleUpload'

interface WebsiteFormProps {
  defaultData?: Website
  ownerId: string
}

//todo: Use favicons

const WebsiteForm: React.FC<WebsiteFormProps> = ({
  defaultData,
  ownerId,
}) => {
  const { setClose } = useModal()
  const router = useRouter()
  const form = useForm<z.infer<typeof CreateWebsiteFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(CreateWebsiteFormSchema),
    defaultValues: {
      name: defaultData?.name || '',
      description: defaultData?.description || '',
      favicon: defaultData?.favicon || '',
      subDomainName: defaultData?.subDomainName || '',
    },
  })

  useEffect(() => {
    if (defaultData) {
      form.reset({
        description: defaultData.description || '',
        favicon: defaultData.favicon || '',
        name: defaultData.name || '',
        subDomainName: defaultData.subDomainName || '',
      })
    }
  }, [defaultData])

  const isLoading = form.formState.isLoading

  const onSubmit = async (values: z.infer<typeof CreateWebsiteFormSchema>) => {
    if (!ownerId) return
    const response = await upsertWebsite(
      ownerId,
      values,
      defaultData?.id || undefined
    )
    if (response)
      toast({
        title: 'Success',
        description: 'Saved page details',
      })
    else
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'Could not save page details',
      })
    setClose()
    router.refresh()
  }
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Page Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit more about this funnel."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="subDomainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub domain</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sub domain for funnel"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              disabled={isLoading}
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="userLogo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button
              className="w-20 mt-4"
              disabled={isLoading}
              type="submit"
            >
              {form.formState.isSubmitting ? <Loading /> : 'Save'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default WebsiteForm