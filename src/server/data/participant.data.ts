'use server'

import { type CommonQuery } from 'types/query'
import { db } from '../db'
import { type Event, type Participant } from '@prisma/client'
import { type ReturnOne, type ReturnMany } from 'types/response'

export interface ParticipantWithEvent extends Participant {
  event: Event
}

export const getAllParticipants = async (query: CommonQuery): Promise<ReturnMany<ParticipantWithEvent>> => {
  const page = query.page ?? 1
  const pageSize = query.pageSize
  const search = query.search ?? ''
  const skip = pageSize ? (page - 1) * pageSize : undefined

  const [count, items] = await Promise.all([
    db.participant.count({
      where: {
        name: {
          contains: search
        }
      }
    }),
    db.participant.findMany({
      take: pageSize,
      skip,
      where: {
        AND: [
          {
            name: {
              contains: search
            }
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            eventId: query.filter?.event
          }
        ]
      },
      include: { event: true }
    })
  ])

  return {
    success: true,
    count,
    items
  }
}

export const getParticipantById = async (id: string): Promise<ReturnOne<Participant>> => {
  const item = await db.participant.findFirst({ where: { id } })

  return {
    success: true,
    item
  }
}
