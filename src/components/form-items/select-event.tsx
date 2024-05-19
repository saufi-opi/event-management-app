'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllEvents } from '@/server/data/event.data'
import { type Event } from '@prisma/client'
import { useEffect, useState } from 'react'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export function SelectEvent(props: Props) {
  const { value, onChange } = props

  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    const getData = async () => {
      const { items } = await getAllEvents({})
      setEvents(items)
    }
    void getData()
  }, [])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an event" />
      </SelectTrigger>
      <SelectContent>
        {events.map((e) => (
          <SelectItem key={e.id} value={e.id}>
            {e.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
