'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { EventZodSchema } from 'types/zod/event.zod'
import { type z } from 'zod'
import { type Event } from '@prisma/client'
import { createEvent, updateEvent } from '@/server/actions/event.action'
import { Textarea } from '../ui/textarea'
import { type EventParams } from '@/app/dashboard/event/[eventId]/page'

interface Props {
  isCreate: boolean
  data?: Event | null
}

function EventForm(props: Props) {
  const router = useRouter()
  const params = useParams<EventParams>()

  const form = useForm<z.infer<typeof EventZodSchema>>({
    resolver: zodResolver(EventZodSchema),
    defaultValues: props.isCreate
      ? {}
      : {
          ...props.data
        }
  })

  async function onSubmit(values: z.infer<typeof EventZodSchema>) {
    if (props.isCreate) {
      const response = await createEvent(values)
      if (response.success) {
        router.replace(`/dashboard/event/${response.item?.id}`)
      }
    } else {
      await updateEvent(params.eventId, values)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid gap-5 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 lg:col-span-1">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col gap-1 lg:col-span-1">
                <FormLabel className="mt-[6px]">Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        disabled={form.formState.isSubmitting}
                      >
                        {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <Input {...field} disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="sm" disabled={form.formState.isSubmitting}>
          {props.isCreate ? 'Submit' : 'Update'}
        </Button>
      </form>
    </Form>
  )
}

export default EventForm
