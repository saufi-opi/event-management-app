'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ParticipantZodSchema } from 'types/zod/participant.zod'
import { type z } from 'zod'
import { createParticipant } from '@/server/actions/participant.action'
import { useState } from 'react'

interface Props {
  eventId: string
}

function GuestParticipantForm(props: Props) {
  const [success, setSuccess] = useState<boolean>(false)
  const form = useForm<z.infer<typeof ParticipantZodSchema>>({
    resolver: zodResolver(ParticipantZodSchema),
    defaultValues: {
      eventId: props.eventId
    }
  })

  async function onSubmit(values: z.infer<typeof ParticipantZodSchema>) {
    const response = await createParticipant(values)
    if (response.success) {
      setSuccess(true)
    } else {
      alert(JSON.stringify(response))
    }
  }

  return success ? (
    <div className="w-full space-y-8 py-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-8 w-8 text-green-500 dark:text-green-400"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </div>
        <p className="mt-6 text-center text-xl font-medium text-gray-500 dark:text-gray-400">Your participation has been recorded</p>
      </div>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default GuestParticipantForm
