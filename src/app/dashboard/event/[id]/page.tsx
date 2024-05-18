import EventForm from '@/components/forms/event-form'
import { getEventById } from '@/server/data/event.data'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

async function EventDetailsPage({ params }: Props) {
  const isCreate = params.id === 'new'
  let data
  if (!isCreate) {
    const { item } = await getEventById(parseInt(params.id))
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
