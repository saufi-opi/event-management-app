import { type CommonQuery } from 'types/query'
import { db } from '../db'
import { type Event } from '@prisma/client'
import { type ReturnMany } from 'types/response'

export const getAllEvents = async (query: CommonQuery): Promise<ReturnMany<Event>> => {
  const page = query.page ?? 1
  const pageSize = query.pageSize
  const search = query.search ?? ''
  const skip = pageSize ? (page - 1) * pageSize : undefined

  const [count, items] = await Promise.all([
    db.event.count({
      where: {
        name: {
          contains: search
        }
      }
    }),
    db.event.findMany({
      take: pageSize,
      skip,
      where: {
        name: {
          contains: search
        }
      }
    })
  ])

  return {
    success: true,
    count,
    items
  }
}

export const getEventById = async () => {
  console.log('an event')
}
