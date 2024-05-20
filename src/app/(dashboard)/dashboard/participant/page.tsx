import { type CommonQuery } from 'types/query'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TablePagination from '@/components/table/table-pagination'
import { getAllParticipants } from '@/server/data/participant.data'
import ParticipantTable from '@/components/table/participant-table'

interface SearchParams extends CommonQuery {
  event?: string
}

interface Props {
  searchParams: SearchParams
}

// TODO: Fix when use pagination, the event query gone
async function ParticipantsPage({ searchParams }: Props) {
  searchParams ??= {}
  searchParams.filter = { event: searchParams.event }
  searchParams.page = !searchParams.page || searchParams.page < 1 ? 1 : parseInt(`${searchParams.page}`)
  searchParams.pageSize = 10

  const { items: participants, count } = await getAllParticipants(searchParams)
  const totalPages = Math.ceil(count! / searchParams.pageSize)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Participants</h1>
        <Link href="/dashboard/participant/new">
          <Button>Add Participant</Button>
        </Link>
      </div>
      <ParticipantTable participants={participants} />
      <div className="pt-5">
        <p className="text-sm text-gray-500">
          Showing {participants.length} of {count} result(s)
        </p>
        <TablePagination page={searchParams.page} totalPages={totalPages} />
      </div>
    </>
  )
}

export default ParticipantsPage
