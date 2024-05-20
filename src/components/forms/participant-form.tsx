'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import { ParticipantZodSchema } from 'types/zod/participant.zod'
import { type z } from 'zod'
import { type Participant } from '@prisma/client'
import { type ParticipantParams } from '@/app/(dashboard)/dashboard/participant/[participantId]/page'
import { createParticipant, updateParticipant } from '@/server/actions/participant.action'
import { SelectEvent } from '../form-items/select-event'

interface Props {
  isCreate: boolean
  data?: Participant | null
}

function ParticipantForm(props: Props) {
  const router = useRouter()
  const params = useParams<ParticipantParams>()

  const form = useForm<z.infer<typeof ParticipantZodSchema>>({
    resolver: zodResolver(ParticipantZodSchema),
    defaultValues: props.isCreate
      ? {}
      : {
          ...props.data
        }
  })

  async function onSubmit(values: z.infer<typeof ParticipantZodSchema>) {
    if (props.isCreate) {
      const response = await createParticipant(values)
      if (response.success) {
        router.replace(`/dashboard/participant/${response.item?.id}`)
      }
    } else {
      await updateParticipant(params.participantId, values)
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
              <FormItem className="col-span-2 lg:col-span-1">
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
              <FormItem className="col-span-2 lg:col-span-1">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventId"
            render={({ field }) => (
              <FormItem className="col-span-2 lg:col-span-1">
                <FormLabel>Event</FormLabel>
                <FormControl>
                  <SelectEvent value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {props.isCreate ? 'Submit' : 'Update'}
        </Button>
      </form>
    </Form>
  )
}

export default ParticipantForm
