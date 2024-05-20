import { type EventParams } from '@/app/(dashboard)/dashboard/event/[eventId]/page'
import GuestParticipantForm from '@/components/forms/guest-participant-form'
import { getEventById } from '@/server/data/event.data'
import { notFound } from 'next/navigation'

interface Props {
  params: EventParams
}

async function GuestParticipatePage({ params }: Props) {
  const { eventId } = params
  const { item: event } = await getEventById(eventId)

  if (!event) {
    return notFound()
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{event.name}</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">{event.description}</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            <span className="text-gray-800">Location:</span> {event.location}
          </p>
        </div>

        <GuestParticipantForm eventId={eventId} />
      </div>
    </div>
  )
}

export default GuestParticipatePage
