import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import DeleteButton from '../delete-button'
import { format } from 'date-fns'
import { deleteParticipant } from '@/server/actions/participant.action'
import { type ParticipantWithEvent } from '@/server/data/participant.data'

interface Props {
  participants: ParticipantWithEvent[]
}

function ParticipantTable(props: Props) {
  const { participants } = props

  return (
    <div className="overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Check In Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.phone}</TableCell>
              <TableCell>{p.email}</TableCell>
              <TableCell>{p.event.name}</TableCell>
              <TableCell>{format(p.createdAt, 'dd/MM/yyyy hh:mm:ss')}</TableCell>
              <TableCell>
                <Link href={`/dashboard/participant/${p.id}?event=${p.eventId}`}>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </Link>
                <DeleteButton id={p.id} action={deleteParticipant} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {participants.length === 0 && <p className="py-2 text-center text-gray-400">No results</p>}
    </div>
  )
}

export default ParticipantTable
