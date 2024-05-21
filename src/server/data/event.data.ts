'use server'

import { type CommonQuery } from 'types/query'
import { db } from '../db'
import { type Event } from '@prisma/client'
import { type ReturnOne, type ReturnMany } from 'types/response'
import { buildAbilityFor } from '../permission/permission'
import { getServerAuthSession } from '../auth'
import { accessibleBy } from '@casl/prisma'

export const getAllEvents = async (query: CommonQuery): Promise<ReturnMany<Event>> => {
  const session = await getServerAuthSession()
  const ability = buildAbilityFor(session?.user.id)

  const page = query.page ?? 1
  const pageSize = query.pageSize
  const search = query.search ?? ''
  const skip = pageSize ? (page - 1) * pageSize : undefined

  const [count, items] = await Promise.all([
    db.event.count({
      where: {
        AND: [
          accessibleBy(ability).Event,
          {
            name: {
              contains: search
            }
          }
        ]
      }
    }),
    db.event.findMany({
      take: pageSize,
      skip,
      where: {
        AND: [
          accessibleBy(ability).Event,
          {
            name: {
              contains: search
            }
          }
        ]
      }
    })
  ])

  return {
    success: true,
    count,
    items
  }
}

export const getEventById = async (id: string): Promise<ReturnOne<Event>> => {
  const session = await getServerAuthSession()
  const ability = buildAbilityFor(session?.user.id)

  const item = await db.event.findFirst({
    where: {
      AND: [accessibleBy(ability).Event, { id }]
    }
  })

  return {
    success: true,
    item
  }
}
