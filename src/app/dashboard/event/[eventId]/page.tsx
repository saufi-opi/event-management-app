import EventForm from '@/components/forms/event-form'
import { getEventById } from '@/server/data/event.data'
import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

export interface EventParams extends Params {
  eventId: string
}

interface Props {
  params: EventParams
}

async function EventDetailsPage({ params }: Props) {
  const isCreate = params.eventId === 'new'
  let data
  if (!isCreate) {
    const { item } = await getEventById(parseInt(params.eventId))
    data = item
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create Event</h1>
      <EventForm isCreate={isCreate} data={data} />
    </div>
  )
}

export default EventDetailsPage
