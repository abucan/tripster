import { z } from 'zod';

export const tripSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  destination: z.string().min(1, 'Destination is required'),
  range: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  budget: z.number().min(1, 'Budget is required'),
  persons: z.number().min(1, 'Persons is required'),
});

export type TripFormData = z.infer<typeof tripSchema>;
