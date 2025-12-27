import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { FilterFormValues } from './utility';

type Props = {
	title: string;
	entries: [string, string][];
	name: 'status' | 'contractType' | 'workMode';
	filterForm: UseFormReturn<FilterFormValues>;
	onFilterChange: () => void;
};

const FilterList: React.FC<Props> = ({ title, entries, name, filterForm, onFilterChange }) => {
	return (
		<div className="space-y-2">
			<h4 className="font-medium text-sm">{title}</h4>
			<Form {...filterForm}>
				<div className="space-y-2">
					{entries.map(([key, label]) => (
						<FormField
							key={key}
							control={filterForm.control}
							name={name}
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0">
									<FormControl>
										<Checkbox
											checked={(field.value as string[] | undefined)?.includes(key)}
											onCheckedChange={(checked) => {
												const current = (field.value as string[] | undefined) || [];
												if (checked) {
													field.onChange([...(current || []), key]);
												} else {
													field.onChange(current.filter((v) => v !== key) || []);
												}
												onFilterChange();
											}}
										/>
									</FormControl>
									<FormLabel className="text-sm font-normal cursor-pointer">{label}</FormLabel>
								</FormItem>
							)}
						/>
					))}
				</div>
			</Form>
		</div>
	);
};

export default FilterList;
