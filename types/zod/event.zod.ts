import { z } from 'zod'

export const EventZodSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }).max(50, { message: 'Event name cannot be more than 50 characters' }),
  location: z.string().min(1, { message: 'Event location is required' }),
  description: z.string().max(200, { message: 'Event description cannot be more than 200 characters' }).optional(),
  date: z.date({ required_error: 'event date is required' }).default(new Date())
})
