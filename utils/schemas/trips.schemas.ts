import { z } from 'zod';

export const tripSchema = z.object({
  title: z.string().min(1, 'Fill in the title'),
  description: z.string().min(1, 'Fill in the description'),
  destination: z.string().min(1, 'Fill in the destination'),
  range: z.object({
    startDate: z.date({ message: 'Select the start date' }),
    endDate: z.date({ message: 'Select the end date' }),
  }),
  budget: z.number().min(1, 'Fill in the budget'),
  persons: z.number().min(1, 'Fill in the number of persons'),
  categories: z.array(z.number()).optional(),
});

export type TripFormData = z.infer<typeof tripSchema>;
