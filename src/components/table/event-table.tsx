import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { type Event } from '@prisma/client'
import Link from 'next/link'
import DeleteButton from '../delete-button'
import { deleteEvent } from '@/server/actions/event.action'

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell>Format: date</TableCell>
              <TableCell>{e.location}</TableCell>
              <TableCell>
                <Link href={`/dashboard/event/${e.id}`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
                <DeleteButton id={e.id} action={deleteEvent} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EventTable
