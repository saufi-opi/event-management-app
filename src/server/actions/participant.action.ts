'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { type Participant } from '@prisma/client'
import { type ReturnOne } from 'types/response'
import { getErrorMessage } from '../error'

export const createParticipant = async (participant: Partial<Participant>): Promise<ReturnOne<Participant>> => {
  try {
    const dupEmail = await db.participant.findFirst({ where: { email: participant.email, eventId: participant.eventId } })
    if (dupEmail) throw `Email "${participant.email}" has been registered for this event`
    const dupPhone = await db.participant.findFirst({ where: { phone: participant.phone, eventId: participant.eventId } })
    if (dupPhone) throw `Phone number "${participant.phone}" has been registered for this event`

    const item = await db.participant.create({ data: participant as Participant })
    revalidatePath('/dashboard/participant')
    return {
      success: true,
      item
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error)
    }
  }
}

export const updateParticipant = async (id: string, participant: Partial<Participant>): Promise<ReturnOne<Participant>> => {
  try {
    const dupEmail = await db.participant.findFirst({ where: { email: participant.email, eventId: participant.eventId, id: { not: id } } })
    if (dupEmail) throw `Email "${participant.email}" has been registered for this event`
    const dupPhone = await db.participant.findFirst({ where: { phone: participant.phone, eventId: participant.eventId, id: { not: id } } })
    if (dupPhone) throw `Phone number "${participant.phone}" has been registered for this event`

    const item = await db.participant.update({ data: participant as Participant, where: { id } })
    revalidatePath('/dashboard/participant')

    return {
      success: true,
      item
    }
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error)
    }
  }
}

export const deleteParticipant = async (id: string): Promise<ReturnOne<Participant>> => {
  const item = await db.participant.delete({ where: { id } })
  revalidatePath('/dashboard/participant')

  return {
    success: true,
    item
  }
}
