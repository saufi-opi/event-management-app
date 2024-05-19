import { z } from 'zod'

export const EventZodSchema = z.object({
  name: z
    .string({ required_error: 'Event name is required' })
    .min(1, { message: 'Event name is required' })
    .max(50, { message: 'Event name cannot be more than 50 characters' }),
  location: z.string({ required_error: 'Event location is required' }).min(1, { message: 'Event location is required' }),
  description: z
    .string({ required_error: 'Event description is required' })
    .min(1, { message: 'Event description is required' })
    .max(200, { message: 'Event description cannot be more than 200 characters' }),
  date: z.date({ required_error: 'Event date is required' })
})
