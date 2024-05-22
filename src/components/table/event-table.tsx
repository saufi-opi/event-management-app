import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { type Event } from '@prisma/client'
import Link from 'next/link'
import DeleteButton from '../delete-button'
import { deleteEvent } from '@/server/actions/event.action'
import { format } from 'date-fns'
import { CornerDownRight } from 'lucide-react'

interface Props {
  events: Event[]
}

function EventTable(props: Props) {
  const { events } = props

  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Guest Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell>{format(e.date, 'dd/MM/yyyy')}</TableCell>
              <TableCell>{e.location}</TableCell>
              <TableCell>
                <Link href={`/dashboard/participant?event=${e.id}`}>
                  <Button variant="ghost">
                    <p className="text-primary">Participants</p>
                  </Button>
                </Link>
                <Link href={`/dashboard/event/${e.id}`}>
                  <Button variant="ghost">Edit</Button>
                </Link>
                <DeleteButton id={e.id} action={deleteEvent} />
              </TableCell>
              <TableCell>
                <Link href={`/participate/${e.id}`} target="_blank">
                  <Button variant="ghost">
                    <CornerDownRight className="h-5 w-5" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {events.length === 0 && <p className="py-2 text-center text-gray-400">No results</p>}
    </div>
  )
}

export default EventTable
