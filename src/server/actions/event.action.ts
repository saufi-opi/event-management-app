'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { type Event } from '@prisma/client'
import { type ReturnOne } from 'types/response'

export const createEvent = async (): Promise<ReturnOne<Event>> => {
  const item = await db.event.create({
    data: {
      name: 'Event Name',
      description: 'This is description',
      date: new Date(),
      location: 'Setapak, KL'
    }
  })

  revalidatePath('/dashboard/event')

  return {
    success: true,
    item
  }
}

export const deleteEvent = async (id: number): Promise<ReturnOne<Event>> => {
  const item = await db.event.delete({ where: { id } })

  revalidatePath('/dashboard/event')

  return {
    success: true,
    item
  }
}
