'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { type Event } from '@prisma/client'
import { type ReturnOne } from 'types/response'
import { getServerAuthSession } from '../auth'

export const createEvent = async (event: Partial<Event>): Promise<ReturnOne<Event>> => {
  const session = await getServerAuthSession()
  const createdBy = session?.user.id
  event.createdBy = createdBy

  const item = await db.event.create({ data: event as Event })

  revalidatePath('/dashboard/event')

  return {
    success: true,
    item
  }
}

export const updateEvent = async (id: string, event: Partial<Event>): Promise<ReturnOne<Event>> => {
  const item = await db.event.update({ data: event as Event, where: { id } })

  revalidatePath('/dashboard/event')

  return {
    success: true,
    item
  }
}

export const deleteEvent = async (id: string): Promise<ReturnOne<Event>> => {
  const item = await db.event.delete({ where: { id } })

  revalidatePath('/dashboard/event')

  return {
    success: true,
    item
  }
}
