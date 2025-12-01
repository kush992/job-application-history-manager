'use client';

import { X } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ApplicationStatus, ContractType, WorkMode } from '@/types/schema';
import {
	applicationStatusMapping,
	contractTypeMapping,
	getApplicationStatusColor,
	getWorkModeColor,
	workModeMapping,
} from '@/utils/utility';

import { FilterFormValues } from '../ApplicationFilter/utility';

type Props = {
	filterForm: UseFormReturn<FilterFormValues>;
	onFilterChange: () => void;
	onClearFilter: (type: 'status' | 'contractType' | 'workMode', value: string) => void;
	onClearAll: () => void;
};

const ApplicationFilters: React.FC<Props> = ({ filterForm, onFilterChange, onClearFilter, onClearAll }) => {
	const status = filterForm.watch('status') || [];
	const contractType = filterForm.watch('contractType') || [];
	const workMode = filterForm.watch('workMode') || [];

	const hasActiveFilters = status.length > 0 || contractType.length > 0 || workMode.length > 0;

	return (
		<div className="w-full space-y-3">
			{/* Active Filters Display */}
			{hasActiveFilters && (
				<div className="flex flex-wrap items-center gap-2">
					{status.map((s) => (
						<Badge
							key={s}
							variant={getApplicationStatusColor(s)}
							className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
						>
							<span>{applicationStatusMapping[s]}</span>
							<button
								type="button"
								onClick={() => onClearFilter('status', s)}
								className="ml-1 rounded-full hover:bg-black/20 p-0.5"
								aria-label={`Remove ${applicationStatusMapping[s]} filter`}
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					))}
					{contractType.map((ct) => (
						<Badge
							key={ct}
							variant="outline"
							className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
						>
							<span>{contractTypeMapping[ct]}</span>
							<button
								type="button"
								onClick={() => onClearFilter('contractType', ct)}
								className="ml-1 rounded-full hover:bg-black/20 p-0.5"
								aria-label={`Remove ${contractTypeMapping[ct]} filter`}
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					))}
					{workMode.map((wm) => (
						<Badge
							key={wm}
							variant={getWorkModeColor(wm)}
							className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
						>
							<span>{workModeMapping[wm]}</span>
							<button
								type="button"
								onClick={() => onClearFilter('workMode', wm)}
								className="ml-1 rounded-full hover:bg-black/20 p-0.5"
								aria-label={`Remove ${workModeMapping[wm]} filter`}
							>
								<X className="h-3 w-3" />
							</button>
						</Badge>
					))}
					{hasActiveFilters && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={onClearAll}
							className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
						>
							Clear all
						</Button>
					)}
				</div>
			)}

			{/* Filter Buttons - Flex Layout */}
			<div className="flex flex-wrap items-center gap-2 mb-3 w-full">
				{/* Status Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={status.length > 0 ? 'default' : 'outline'}
							// size="sm"
							className="w-full sm:w-auto"
						>
							Status
							{status.length > 0 && (
								<Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">
									{status.length}
								</Badge>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="sm:w-64 p-0" align="start">
						<div className="p-4 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
							<h3 className="font-semibold text-sm">Filter by Status</h3>
							<Form {...filterForm}>
								<div className="space-y-2">
									{Object.entries(applicationStatusMapping).map(([key, label]) => (
										<FormField
											key={key}
											control={filterForm.control}
											name="status"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={field.value?.includes(key as ApplicationStatus)}
															onCheckedChange={(checked) => {
																if (checked) {
																	field.onChange([...(field.value || []), key as ApplicationStatus]);
																} else {
																	field.onChange(field.value?.filter((v) => v !== key) || []);
																}
																onFilterChange();
															}}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal cursor-pointer">
														{label}
													</FormLabel>
												</FormItem>
											)}
										/>
									))}
								</div>
							</Form>
						</div>
					</PopoverContent>
				</Popover>

				{/* Contract Type Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={contractType.length > 0 ? 'default' : 'outline'}
							className="w-full sm:w-auto"
						>
							Contract Type
							{contractType.length > 0 && (
								<Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">
									{contractType.length}
								</Badge>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[calc(100vw-2rem)] sm:w-64 p-0" align="start">
						<div className="p-4 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
							<h3 className="font-semibold text-sm">Filter by Contract Type</h3>
							<Form {...filterForm}>
								<div className="space-y-2">
									{Object.entries(contractTypeMapping).map(([key, label]) => (
										<FormField
											key={key}
											control={filterForm.control}
											name="contractType"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={field.value?.includes(key as ContractType)}
															onCheckedChange={(checked) => {
																if (checked) {
																	field.onChange([...(field.value || []), key as ContractType]);
																} else {
																	field.onChange(field.value?.filter((v) => v !== key) || []);
																}
																onFilterChange();
															}}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal cursor-pointer">
														{label}
													</FormLabel>
												</FormItem>
											)}
										/>
									))}
								</div>
							</Form>
						</div>
					</PopoverContent>
				</Popover>

				{/* Work Mode Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={workMode.length > 0 ? 'default' : 'outline'}
							className="w-full sm:w-auto"
						>
							Work Mode
							{workMode.length > 0 && (
								<Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">
									{workMode.length}
								</Badge>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[calc(100vw-2rem)] sm:w-64 p-0" align="start">
						<div className="p-4 space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto">
							<h3 className="font-semibold text-sm">Filter by Work Mode</h3>
							<Form {...filterForm}>
								<div className="space-y-2">
									{Object.entries(workModeMapping).map(([key, label]) => (
										<FormField
											key={key}
											control={filterForm.control}
											name="workMode"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={field.value?.includes(key as WorkMode)}
															onCheckedChange={(checked) => {
																if (checked) {
																	field.onChange([...(field.value || []), key as WorkMode]);
																} else {
																	field.onChange(field.value?.filter((v) => v !== key) || []);
																}
																onFilterChange();
															}}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal cursor-pointer">
														{label}
													</FormLabel>
												</FormItem>
											)}
										/>
									))}
								</div>
							</Form>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default ApplicationFilters;

