import type { Event, Participant } from '@prisma/client'
import { type PureAbility, AbilityBuilder } from '@casl/ability'
import { createPrismaAbility, type PrismaQuery, type Subjects } from '@casl/prisma'

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      Event: Event
      Participant: Participant
    }>
  ],
  PrismaQuery
>

export const buildAbilityFor = (userId: string | undefined) => {
  userId ??= ''
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility)

  if (!userId) {
    can('read', 'Event')
    return build()
  }

  can('manage', 'Event', { createdBy: userId })
  can('manage', 'Participant', { event: { createdBy: userId } })

  return build()
}
