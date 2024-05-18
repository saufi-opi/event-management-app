import { type CommonQuery } from 'types/query'
import { db } from '../db'
import { type Event } from '@prisma/client'
import { type ReturnOne, type ReturnMany } from 'types/response'

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

export const getEventById = async (id: number): Promise<ReturnOne<Event>> => {
  const item = await db.event.findFirst({ where: { id } })

  return {
    success: true,
    item
  }
}
