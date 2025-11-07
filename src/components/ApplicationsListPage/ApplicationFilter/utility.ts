import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { ContractType, WorkMode } from '@/types/schema';
import { z } from 'zod';

export const filterSchema = z.object({
	searchQuery: z.string().optional(),
	status: z.array(z.nativeEnum(ApplicationStatus)).optional(),
	contractType: z.array(z.nativeEnum(ContractType)).optional(),
	workMode: z.array(z.nativeEnum(WorkMode)).optional(),
});

export type FilterFormValues = z.infer<typeof filterSchema>;
