import { z } from 'zod'

export const ParticipantZodSchema = z.object({
  name: z
    .string({ required_error: 'Participant name is required' })
    .min(1, { message: 'Participant name is required' })
    .max(50, { message: 'Participant name cannot be more than 50 characters' }),
  phone: z.string({ required_error: 'Participant phone is required' }).min(1, { message: 'Participant phone is required' }),
  email: z
    .string({ required_error: 'Participant email is required' })
    .min(1, { message: 'Participant email is required' })
    .email({ message: 'Invalid email' }),
  eventId: z.string({ required_error: 'Event is required' })
})
