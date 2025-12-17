import { z } from 'zod';

import { ApplicationStatus, ContractType, WorkMode } from '@/types/schema';

export const filterSchema = z.object({
	searchQuery: z.string().optional(),
	status: z.array(z.nativeEnum(ApplicationStatus)).optional(),
	contractType: z.array(z.nativeEnum(ContractType)).optional(),
	workMode: z.array(z.nativeEnum(WorkMode)).optional(),
});

export type FilterFormValues = z.infer<typeof filterSchema>;
