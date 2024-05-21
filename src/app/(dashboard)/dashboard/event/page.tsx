import { getAllEvents } from '@/server/data/event.data'
import { type CommonQuery } from 'types/query'
import React from 'react'
import EventTable from '@/components/table/event-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import TablePagination from '@/components/table/table-pagination'
import Search from '@/components/search'

interface Props {
  searchParams: CommonQuery
}

async function EventsPage({ searchParams }: Props) {
  searchParams ??= {}
  searchParams.page = !searchParams.page || searchParams.page < 1 ? 1 : parseInt(`${searchParams.page}`)
  searchParams.pageSize = 10

  const { items: events, count } = await getAllEvents(searchParams)
  const totalPages = Math.ceil(count! / searchParams.pageSize)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex w-2/3 items-center gap-5">
          <Search />
          <Link href="/dashboard/event/new">
            <Button>Add Event</Button>
          </Link>
        </div>
      </div>
      <EventTable events={events} />
      <div className="pt-5">
        <p className="text-sm text-gray-500">
          Showing {events.length} of {count} result(s)
        </p>
        <TablePagination page={searchParams.page} totalPages={totalPages} />
      </div>
    </>
  )
}

export default EventsPage
